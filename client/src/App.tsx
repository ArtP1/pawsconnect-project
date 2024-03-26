import { Routes, Route } from "react-router-dom";
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from "./pages/SignUp";
import { FeedPage } from "./pages/FeedPage";
import { FriendsPage } from "./pages/FriendsPage";
import { GuestPage } from "./pages/GuestPage";
import { UserSettings } from "./pages/UserSettings";
import { GuestsExplorePage } from "./pages/GuestsExplorePage";
import { AuthenticatedLayout } from "./pages/Layouts/AuthenticatedLayout";
import { NetworkGraph } from "./pages/NetworkGraph";
import { MessagesPage } from "./pages/MessagesPage";
import { Notifications } from "./pages/Notifications";
import './App.css'
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";


// React Router Github reference: Tutorial [https://reactrouter.com/en/main/start/tutorial]
function App() {

  return (
    <>
      <Routes>

        {/* This Route encapsulates all routes which require authentication */}
        <Route element={<AuthOutlet fallbackPath="/guests" />}>
          <Route path="/" element={<AuthenticatedLayout><FeedPage/></AuthenticatedLayout>}></Route>
          <Route path="/friends" element={<AuthenticatedLayout><FriendsPage/></AuthenticatedLayout>}></Route>
          <Route path="/accounts/edit" element={<UserSettings />}></Route>
          <Route path="/connections" element={<AuthenticatedLayout><NetworkGraph/></AuthenticatedLayout>}></Route>
          <Route path="/messages" element={<AuthenticatedLayout><MessagesPage/></AuthenticatedLayout>}></Route>
          <Route path="/notifications" element={<AuthenticatedLayout><Notifications/></AuthenticatedLayout>}></Route>
        </Route>

        {/* All public routes */}
        <Route path="/guests" element={<GuestPage />}></Route>
        <Route path="/explore" element={<GuestsExplorePage />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App
