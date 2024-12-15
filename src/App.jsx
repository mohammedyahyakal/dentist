import { Route, Routes } from "react-router-dom";
import Patients from "./pge/Uzerz";
import UzerDetil from "./pge/UzerDetil";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Patients />}>
          <Route path="patients" element={<Patients />} />
        </Route>
        <Route path="patient/edit/:id" element={<UzerDetil />} />
      </Routes>
    </>
  );
}

export default App;
