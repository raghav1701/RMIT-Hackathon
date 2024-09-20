import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PdfUploader from "./components/PdfUploader";
import Home from "./components/Home";
import Subjects from "./components/Subjects";
import SubjectAssignments from "./components/SubjectAssignments";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:id" element={<SubjectAssignments />} />
          <Route path="/choose-how-often" element={<PdfUploader />} />
          <Route path="/fast-deliveries" element={<PdfUploader />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
