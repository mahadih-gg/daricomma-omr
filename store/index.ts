import { initializeAuth } from "./authStore";
export * from "./authStore";

export function initializeStores() {
  initializeAuth();
}
