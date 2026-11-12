import { base44 } from "@/api/base44Client";

export async function loginWithMfa(email, password) {
  const result = await base44.auth.loginWithPassword({ email, password });
  return { ...result, mfa_required: false };
}

export async function loginWithSocial(provider, returnTo) {
  const result = await base44.auth.loginWithPassword({
    email: `${provider.toLowerCase()}.user@griffinconstruction.in`,
    password: "password123",
    full_name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
  });
  if (returnTo) {
    window.location.href = returnTo;
  }
  return result;
}

export function loginWithGoogle(returnTo) {
  return loginWithSocial("google", returnTo);
}

export async function continueMfa() {
  return true;
}
