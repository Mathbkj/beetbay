import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Discover from "./pages/Discover";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { ProtectedComponent } from "./components/ProtectedComponent";

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/discover" element={<Discover />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedComponent user={user}>
              <Dashboard />
            </ProtectedComponent>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
