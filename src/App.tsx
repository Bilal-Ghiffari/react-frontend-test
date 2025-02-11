import { BrowserRouter, Route, Routes } from "react-router";
import ProtectedRoutes from "./components/protected-routes";
import { AuthProvider } from "./context/AuthContext";
import "./main.css";
import LogInPage from "./pages/LogIn";
import Recipe from "./pages/Recipe";
import InventoryManagement from "./pages/InventoryManagement";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoutes>
                <LogInPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <InventoryManagement />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/recipe"
            element={
              <ProtectedRoutes>
                <Recipe />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
