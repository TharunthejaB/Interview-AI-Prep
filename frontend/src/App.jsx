import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/landing";
import Dashboard from "./pages/home/dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import InterviewPrep from "./pages/interviewprep/InterviewPrep";
import UserProvider from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
          </Routes>
        </Router>
        <Toaster
          toastOptions={{ className: "", style: { fontSize: "13px" } }}
        />
      </div>
    </UserProvider>
  );
}

export default App;
