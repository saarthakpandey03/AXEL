import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/SignIn";
import Signup from "./pages/SignUp";

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

    </Routes>
  );
}

export default App;