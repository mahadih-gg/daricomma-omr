import { initializeStores } from "@/store";
import React, { useEffect } from "react";

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  useEffect(() => {
    initializeStores();
  }, []);

  return <>{children}</>;
}
