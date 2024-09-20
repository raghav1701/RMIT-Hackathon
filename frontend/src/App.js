import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PdfUploader from "./components/PdfUploader";
import Home from "./components/Home";
import Assignments from "./components/Assignments";
import SubjectDetails from "./components/SubjectDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pick-meals" element={<Assignments />} />
        <Route path="/assignments/:id" element={<SubjectDetails />} />
        <Route path="/choose-how-often" element={<PdfUploader />} />
        <Route path="/fast-deliveries" element={<PdfUploader />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
