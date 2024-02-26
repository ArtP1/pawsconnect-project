import { Link } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md"; // Accessible icons here: https://react-icons.github.io/react-icons/search/#q=pets
import { FaHome } from "react-icons/fa";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import "./css/navmenu.css";
import { useNavigate } from 'react-router-dom';
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

export const NavMenu = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  const logout = () => {
    signOut();
    navigate("/login");
  }

  const authenticatedLinks = (
    <>
      <Link to="/" className="flex items-center space-x-2">
        <FaHome />
        <span>Home</span>
      </Link>

      <Link to="/pets" className="flex items-center space-x-2">
        <MdOutlinePets />
        <span>Pets</span>
      </Link>

      <Link to="/petsView" className="flex items-center space-x-2">
        <MdOutlinePets />
        <span>Pets View</span>
      </Link>

      <Link to="/profiles" className="flex items-center space-x-2">
        <MdOutlinePets />
        <span>Profiles</span>
      </Link>

      <Link to="/login" className="flex items-center space-x-2" onClick={logout}>
        <MdOutlinePets />
        <span>Logout</span>
      </Link>
    </>
  );

  // Navigation links for public (unauthenticated) users
  const publicLinks = (
    <>
      <Link to="/login" className="flex items-center space-x-2">
        <MdOutlinePets />
        <span>Login</span>
      </Link>

      <Link to="/signup" className="flex items-center space-x-2">
        <MdOutlinePets />
        <span>Sign Up</span>
      </Link>
    </>
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex space-x-4"> 
          {/* This allows us to hide routes that only authenticated users have access to */}
          {isAuthenticated() ? authenticatedLinks : publicLinks}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
