import { loginWithSocial } from "@/lib/authMfa";
import { base44 } from "@/api/base44Client";

export class MfaError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
  get mustSignInAgain() {
    return this.status === 401;
  }
}

export function mfaSession() {
  return {
    factors: [],
    challenge: null,
    verifyFactor: async () => ({ access_token: "mock-mfa-token" }),
    sendChallenge: async () => ({}),
  };
}

export async function finishSignIn({ access_token }) {
  if (access_token) {
    base44.auth.setToken(access_token);
  }
  return { user: await base44.auth.me() };
}

export async function loadSignInOptions() {
  return {
    google: true,
    password: true,
    mfa_policy: "optional",
  };
}

export async function resumeMfa() {
  return null;
}

export async function signInToManageMfa() {
  return { success: true };
}

export async function signInWithProvider(provider, returnTo) {
  await loginWithSocial(provider, returnTo);
}
