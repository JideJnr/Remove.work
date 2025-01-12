import React, {
    Fragment,
    createContext,
    useState,
    useContext,
    ReactNode,
  } from "react";
import CustomToast from "../layout/toast/CustomToast.tsx";
 
  
  interface ToastContextType {
    showToast: (message: string, isSuccess: boolean) => void;
    clearToast: () => void;
    toastMessage: string | null;
    isSuccessful: boolean | null;
  }
  
  const ToastContext = createContext<ToastContextType | undefined>(undefined);
  
  export const ToastProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);
  
    const showToast = (message: string, isSuccess: boolean) => {
      setToastMessage(message);
      setIsSuccessful(isSuccess);
    };
  
    const clearToast = () => {
      setToastMessage(null);
      setIsSuccessful(null);
    };
  
    return (
      <ToastContext.Provider
        value={{ showToast, clearToast, toastMessage, isSuccessful }}
      >
        <Fragment>
          {toastMessage && isSuccessful !== null && (
            <CustomToast
            status={isSuccessful ? "success" : "error"}
            message={toastMessage}
            onClose={clearToast}
          />
          
          )}
          {children}
        </Fragment>
      </ToastContext.Provider>
    );
  };
  
  export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (context === undefined) {
      throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
  };
  