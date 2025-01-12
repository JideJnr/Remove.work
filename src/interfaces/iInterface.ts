interface ToastContextType {
    showToast: (message: string, isSuccess: boolean) => void;
    clearToast: () => void;
    toastMessage: string | null;
    isSuccessful: boolean | null;
}

interface DarkModeContextProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }

  interface CustomToastProps {
    status: "success" | "error";
    message?: string;
    onClose: () => void;
  }
  
  