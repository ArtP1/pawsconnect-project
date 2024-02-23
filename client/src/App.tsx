import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PetsPage } from '@/pages/PetsPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { NavMenu } from '@/components/navmenu';
import './App.css'
import { SignUpPage } from "./pages/SignUp";
import { PetsViewPage } from "./pages/petsView";
import { ManageProfiles } from "./pages/ManageProfiles";


// React Router Github reference: Tutorial [https://reactrouter.com/en/main/start/tutorial]
function App() {

  return (
    <Router>
      <NavMenu />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/petsView" element={<PetsViewPage/>}/>
        <Route path="/profiles" element={<ManageProfiles/>}/>
      </Routes>
    </Router>
  );
}

export default App
