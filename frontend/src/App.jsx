import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/signin"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
      path="/Workspace"
      element={
      <ProtectedRoute>
            <Workspace />
        </ProtectedRoute>
      }/>
    </Routes>
  );
}

export default App;