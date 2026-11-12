const isBrowser = typeof window !== "undefined";

export function getAppParams() {
  return {
    appId: "griffin-cms",
    token: isBrowser ? localStorage.getItem("griffin_auth_token") : null,
    functionsVersion: "1.0",
    appBaseUrl: isBrowser ? window.location.origin : "",
  };
}
