import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, login as loginService } from "@/services/authService";
import { UserDto, User } from "@/types/api";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (data: UserDto) => Promise<void>;
  logout: () => void;
  validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateStoredToken = async () => {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        try {
          const userData = await getAuth();
          setToken(storedToken);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          sessionStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    validateStoredToken();
  }, []);

  useEffect(() => {
    if (isAuthenticated && (location.pathname === "/" || location.pathname === "/login")) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, location, navigate]);

  const login = async (data: UserDto) => {
    const response = await loginService(data);
    if (response.accessToken && response.user) {
      sessionStorage.setItem("token", response.accessToken);
      setToken(response.accessToken);
      setUser(response.user);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  const validateToken = async (): Promise<boolean> => {
    const currentToken = sessionStorage.getItem("token");
    if (!currentToken) return false;

    try {
      const userData = await getAuth();
      setUser(userData);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, isLoading, user, login, logout, validateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
