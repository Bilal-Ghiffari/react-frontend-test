import * as React from "react";

export interface IAuthContextProps {
  token: string | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = React.createContext<IAuthContextProps | undefined>(
  undefined
);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialToken = localStorage.getItem("authToken");
  const [authToken, setAuthToken] = React.useState(initialToken);

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const login = () => {
    const token = generateToken();
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{ token: authToken, isAuthenticated: !!authToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
