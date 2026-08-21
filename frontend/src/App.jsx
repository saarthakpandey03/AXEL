import { useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/SignIn.jsx";
import Signup from "./pages/SignUp.jsx";
import Workspace from "./pages/Workspace.jsx";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/workspace" replace />;
  }

  return children;
}

function App() {
  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      true
    );

    document.documentElement.classList.toggle(
      "light",
      false
    );

    document.documentElement.style.colorScheme =
      "dark";
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/signin"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <Workspace />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;
