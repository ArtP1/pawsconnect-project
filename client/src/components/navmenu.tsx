import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MdOutlinePets } from "react-icons/md"; // Accessible icons here: https://react-icons.github.io/react-icons/search/#q=pets
import { FaHome } from "react-icons/fa";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import "./css/navmenu.css";

// ShadCN/UI API Reference: https://www.radix-ui.com/primitives/docs/components/navigation-menu#api-reference 
export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Simple Link for Pets in the Navigation Menu */}
        <NavigationMenuItem>
        <Link to="/" className="flex items-center space-x-2">
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to="/pets" className="flex items-center space-x-2">
            <MdOutlinePets />
            <span>Pets</span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}