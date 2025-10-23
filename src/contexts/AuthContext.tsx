import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  validateToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateStoredToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Auth`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          if (response.ok) {
            setToken(storedToken);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token validation failed", error);
          localStorage.removeItem("token");
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

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  const validateToken = async (): Promise<boolean> => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) return false;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Auth`, {
        method: "GET",
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      return response.ok;
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, isLoading, login, logout, validateToken }}
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
