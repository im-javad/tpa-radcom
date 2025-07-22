import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DimensionsForm } from "./features/matrix/components/DimensionsForm";
import { MatrixInput } from "./features/matrix/components/MatrixInput";
import { MatrixResult } from "./features/result/components/MatrixResult";
import "./styles/global.scss";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<DimensionsForm />} />
          <Route path="/matrix-input" element={<MatrixInput />} />
          <Route path="/result" element={<MatrixResult />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
