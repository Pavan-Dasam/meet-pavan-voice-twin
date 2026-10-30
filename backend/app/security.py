import re
import time
import secrets
from typing import Dict, List, Optional
from fastapi import Header, HTTPException, Request, status
from app.config import settings


def verify_admin_key(
    x_admin_key: Optional[str] = Header(None, alias="X-Admin-Key"),
    authorization: Optional[str] = Header(None)
) -> bool:
    """
    Validate admin authorization via X-Admin-Key or Bearer token
    using constant-time comparison to prevent timing attacks.
    """
    token = None
    if x_admin_key:
        token = x_admin_key.strip()
    elif authorization and authorization.startswith("Bearer "):
        token = authorization.split("Bearer ", 1)[1].strip()

    expected = settings.ADMIN_API_KEY
    if not token or not expected or not secrets.compare_digest(token, expected):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Valid admin API key required to access administrative endpoints.",
            headers={"WWW-Authenticate": "ApiKey"}
        )
    return True


# Prompt Injection Defense
_INJECTION_PATTERNS = [
    re.compile(r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions?", re.IGNORECASE),
    re.compile(r"system\s*prompt\s*:", re.IGNORECASE),
    re.compile(r"you\s+are\s+now\s+(a\s+)?(dan|jailbreak|unrestricted)", re.IGNORECASE),
    re.compile(r"disregard\s+(all\s+)?(system|safety)\s+rules?", re.IGNORECASE),
    re.compile(r"forget\s+who\s+you\s+are", re.IGNORECASE),
    re.compile(r"reveal\s+(your\s+)?(api[_\s]?key|secret|system\s+prompt)", re.IGNORECASE)
]


def sanitize_retrieved_text(text: str) -> str:
    """
    Sanitizes retrieved text chunks before injecting them into the LLM prompt.
    Disarms prompt injection attempts while preserving factual content.
    """
    if not text:
        return ""

    sanitized = text
    for pattern in _INJECTION_PATTERNS:
        sanitized = pattern.sub("[REDACTED_POTENTIAL_INJECTION]", sanitized)

    # Escape raw XML tags that could interfere with our prompt structure
    sanitized = sanitized.replace("<context>", "&lt;context&gt;").replace("</context>", "&lt;/context&gt;")
    sanitized = sanitized.replace("<instructions>", "&lt;instructions&gt;").replace("</instructions>", "&lt;/instructions&gt;")
    return sanitized


class SimpleRateLimiter:
    """Sliding window per-IP rate limiter."""

    def __init__(self, requests_per_minute: int = 30):
        self.rpm = requests_per_minute
        self.clients: Dict[str, List[float]] = {}

    def check_rate_limit(self, request: Request) -> None:
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        window_start = now - 60.0

        if client_ip not in self.clients:
            self.clients[client_ip] = []

        # Filter out timestamps older than 60 seconds
        self.clients[client_ip] = [ts for ts in self.clients[client_ip] if ts > window_start]

        if len(self.clients[client_ip]) >= self.rpm:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Rate limit exceeded ({self.rpm} requests/minute). Please slow down and try again in a few moments."
            )

        self.clients[client_ip].append(now)


rate_limiter = SimpleRateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)
