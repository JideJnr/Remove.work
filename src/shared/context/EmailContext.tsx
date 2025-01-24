import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";


// Create the context
const EmailContext = createContext<EmailContextType | undefined>(undefined);


export const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {


  const [email, setEmail] = useState<string>(() => {
    
    const storedEmail = localStorage.getItem("email");
    return storedEmail || "";
  });

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  const logout = () => {
    setEmail(''); 
    localStorage.setItem("email", "");
    localStorage.clear()
    toast.success('Logged Out Successfully');
  
  };

  return (
    <EmailContext.Provider value={{ email, setEmail , logout }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useEmailContext must be used within an EmailProvider");
  }
  return context;
};
