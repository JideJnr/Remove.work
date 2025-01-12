"use client";

import React, { createContext, useState } from "react";

import { DarkModeProvider } from "./DarkMode.tsx";
import { ToastProvider } from "./ToastContext.tsx";

export const AppContext = createContext<any>(null);

const AppProvider = ({ children }: any) => {
  const [pageloading, setpageloading] = useState(false);

  return (
    <AppContext.Provider value={{ pageloading, setpageloading }}>
      <ToastProvider>
        <DarkModeProvider>{children}</DarkModeProvider>
      </ToastProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
