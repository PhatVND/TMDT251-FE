import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { LoginResponse, User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  login: (data: LoginResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Khi F5 trang, kiểm tra xem có lưu user trong localStorage không
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Lỗi parse user data", e);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (data: LoginResponse) => {
    // 1. Lưu vào State
    setUser(data.user);
    // 2. Lưu vào LocalStorage để F5 không mất
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    // Có thể thêm điều hướng về login ở đây hoặc xử lý ở App.tsx
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để các component khác gọi dùng
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
