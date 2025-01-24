"use client";

import React, { createContext, useState } from "react";

import { DarkModeProvider } from "./DarkMode.tsx";
import { ToastProvider } from "./ToastContext.tsx";
import { EmailProvider, useEmailContext } from "./EmailContext.tsx";
import { GroupProvider } from "./GroupContext.tsx";
import { TaskProvider } from "./TaskContext.tsx";

export const AppContext = createContext<any>(null);

const AppProvider = ({ children }: any) => {
  const [pageloading, setpageloading] = useState(false);


  return (
    <AppContext.Provider value={{ pageloading, setpageloading }}>
      <ToastProvider>
        <EmailProvider>
          <GroupProvider>
            <TaskProvider >
              <DarkModeProvider>{children}</DarkModeProvider>
          </TaskProvider>
          </GroupProvider>
        </EmailProvider>
      </ToastProvider>
    </AppContext.Provider>
  );
};

export default AppProvider;
