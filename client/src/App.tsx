import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PetsPage } from '@/pages/PetsPage';
import { HomePage } from '@/pages/HomePage';
import { NavMenu } from '@/components/navmenu';
import './App.css'


// React Router Github reference: Tutorial [https://reactrouter.com/en/main/start/tutorial]
function App() {

  return (
    <Router>
      <NavMenu />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
      </Routes>
    </Router>
  );
}

export default App
