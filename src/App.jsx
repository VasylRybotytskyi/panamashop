import "slick-carousel/slick/slick.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";

function App() {
  return (
    <div className="App">
      <Router basename="/panamashop/">
        <Routes>
          <Route path="/*" element={<Layout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
