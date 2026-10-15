import jwt from "jsonwebtoken";

export const SESSION_TTL_SECONDS = 60 * 60;

const JWT_ISSUER = "stockpilot";
const JWT_AUDIENCE = "stockpilot-web";

export interface SessionClaims {
  userId: string;
  sessionVersion: number;
}

export function isSessionVersionValid(
  claimVersion: number,
  userVersion: number | null | undefined,
): boolean {
  return (userVersion ?? 0) === claimVersion;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();

  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  if (
    secret.length < 32 ||
    /your[_-]?|change[_-]?|replace[_-]?|placeholder/i.test(secret)
  ) {
    throw new Error("JWT_SECRET is not valid");
  }

  return secret;
}

export function generateSessionToken(
  userId: string,
  sessionVersion = 0,
): string {
  if (!userId) {
    throw new Error("A user id is required");
  }

  return jwt.sign(
    {
      userId,
      sessionVersion,
      type: "session",
    },
    getJwtSecret(),
    {
      algorithm: "HS256",
      audience: JWT_AUDIENCE,
      expiresIn: SESSION_TTL_SECONDS,
      issuer: JWT_ISSUER,
    },
  );
}

export function verifySessionToken(token: string): SessionClaims | null {
  if (!token || token === "null" || token === "undefined") {
    return null;
  }

  const secret = getJwtSecret();

  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
      audience: JWT_AUDIENCE,
      issuer: JWT_ISSUER,
    });

    if (!decoded || typeof decoded === "string") {
      return null;
    }

    const { userId, sessionVersion, type } = decoded as jwt.JwtPayload;
    if (
      type !== "session" ||
      typeof userId !== "string" ||
      !Number.isSafeInteger(sessionVersion) ||
      sessionVersion < 0
    ) {
      return null;
    }

    return { userId, sessionVersion };
  } catch {
    return null;
  }
}
