export const GOOGLE_OAUTH_SCOPE = "openid email profile";

export function isGoogleOAuthConfigured(): boolean {
  return Boolean(
    (process.env.GOOGLE_CLIENT_ID?.trim() ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim()) &&
      process.env.GOOGLE_CLIENT_SECRET?.trim(),
  );
}

export function getGoogleClientId(): string | undefined {
  return (
    process.env.GOOGLE_CLIENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
    undefined
  );
}

export function getGoogleClientSecret(): string | undefined {
  return process.env.GOOGLE_CLIENT_SECRET?.trim() || undefined;
}

export interface GoogleOAuthConfig {
  clientId: string;
  redirectUri: string;
  scope: string;
}

export function getGoogleOAuthConfig(
  redirectUri: string,
): GoogleOAuthConfig | null {
  const clientId = getGoogleClientId();
  if (!clientId) {
    return null;
  }

  return {
    clientId,
    redirectUri,
    scope: GOOGLE_OAUTH_SCOPE,
  };
}

export function getGoogleOAuthUrl(
  redirectUri: string,
  state: string,
): string | null {
  const config = getGoogleOAuthConfig(redirectUri);
  if (!config) {
    return null;
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: config.scope,
    state,
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}
