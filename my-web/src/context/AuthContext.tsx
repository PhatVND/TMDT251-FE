import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; // Thư viện giải mã token

// Định nghĩa interface User đầy đủ
export interface User {
  id: number; 
  email: string;
  role: 'TRAINEE' | 'TRAINER' | 'BUSINESS' | 'ADMIN';
  fullName?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  isLoading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Khởi tạo lại trạng thái từ localStorage khi load trang
  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Lỗi khôi phục session:', e);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: any) => {
    try {
      // 1. Giải mã token để lấy ID thực tế
      const decoded: any = jwtDecode(newToken);
      console.log("Dữ liệu giải mã từ Token:", decoded);

      // 2. Trích xuất ID (Thường nằm ở trường id, userId hoặc sub tùy Backend)
      const userIdFromToken = decoded.id || decoded.userId || decoded.sub;

      if (!userIdFromToken) {
        console.warn("Cảnh báo: Token không chứa ID người dùng.");
      }

      // 3. Gộp ID vào object User
      const updatedUser: User = {
        ...userData,
        id: userIdFromToken ? Number(userIdFromToken) : userData.id
      };

      // 4. Lưu vào State và LocalStorage
      setToken(newToken);
      setUser(updatedUser);
      localStorage.setItem('accessToken', newToken);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Lỗi giải mã token khi login:", error);
      // Fallback nếu giải mã lỗi
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('accessToken', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      login,
      logout,
      isAuthenticated: !!token && !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};