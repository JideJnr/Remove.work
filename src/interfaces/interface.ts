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


interface ButtonProps {
    text: string;
    loadingText?: string;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
  }
  
  interface Task {
    id: number|string; 
    title: string;
    description: string;
    category?: string;
    priority: string,
    targetDate: any,
    like: boolean,
    archived?: boolean,
  }


  
  interface TaskListProps {
    tasks: Task[];
  }

  interface EmailProviderProps {
    children: any;
  }


  interface EmailContextType {
    email: string;
    setEmail: (email: string) => void;
  }
  

  interface InputFieldProps {
    label?: string;
    placeholder?: string;
    value: string|null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "email" | "password" | "number";
    name?: string;
    id?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
  }
  
  
 
  
  interface Selection {
    value: string[]|string;
    label?: string;
  }
  
  interface MainContainerProps {
    selection: Selection;
  }
  
  
  interface TaskContextType {
    docData: Task[];
    reload: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
  }
  
interface Group {
  id: any;
  name: string;
  summary: string;
  email: string;

}

interface GroupContextType {
  groups: Group[] | null;
  fetchGroups: (email: string) => Promise<void>;
  reload: () => void;
  loading: boolean;
  error: string | null;
}
