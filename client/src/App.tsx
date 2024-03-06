import { Routes, Route } from "react-router-dom";
import { PetsPage } from '@/pages/PetsPage';
import { LoginPage } from '@/pages/LoginPage';
import { NavMenu } from '@/components/navmenu';
import { SignUpPage } from "./pages/SignUp";
import { PetsViewPage } from "./pages/petsView";
import { ManageProfiles } from "./pages/ManageProfiles";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { HomePage } from "./pages/HomePage";
import './App.css'


// React Router Github reference: Tutorial [https://reactrouter.com/en/main/start/tutorial]
function App() {
  return (
    <>
      <NavMenu />
      <Routes>
        {/* This Route encapsulates all routes which require authentication */}
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/profiles" element={<ManageProfiles />}></Route>
        </Route>

        {/* All public routes */}
        <Route path="/pets" element={<PetsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/petsView" element={<PetsViewPage />} />
      </Routes>
    </>
  );
}

export default App
