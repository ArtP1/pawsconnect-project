import { Link } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md"; // Accessible icons here: https://react-icons.github.io/react-icons/search/#q=pets
import { FaHome } from "react-icons/fa";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import "./css/navmenu.css";

// Assuming navmenu.css has appropriate styles for horizontal layout

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Updated NavigationMenuItem for horizontal layout */}
        <NavigationMenuItem className="flex space-x-4"> {/* Adjust space-x-4 as needed for spacing between items */}
          <Link to="/" className="flex items-center space-x-2">
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to="/pets" className="flex items-center space-x-2">
            <MdOutlinePets />
            <span>Pets</span>
          </Link>

          <Link to="/login" className="flex items-center space-x-2">
            <MdOutlinePets />
            <span>Login</span>
          </Link>

          <Link to="/signup" className="flex items-center space-x-2">
            <MdOutlinePets />
            <span>Sign Up</span>
          </Link>

          <Link to="/petsView" className="flex items-center space-x-2">
            <MdOutlinePets />
            <span>Pets View</span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
