import { Link } from "react-router-dom";
import "./css/navmenu.css";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { SVGProps } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

export const NavMenu = () => {
  const signOut = useSignOut();
  const isAuthenticated = useIsAuthenticated();

  const logout = () => {
    signOut();
  };

  const authenticatedContent = (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="rounded-full w-10 h-10 cursor-pointer" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-45">
          <DropdownMenuLabel className="text-center">@shadcn</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
            <Link to="/accounts/edit">
              Settings
            </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/guests" onClick={logout}>
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  // Navigation links for public (unauthenticated) users
  const publicContent = (
    <>
      <Link
        className="flex items-center text-md font-medium hover:underline underline-offset-4"
        to="/explore">
        Explore
      </Link>

      <Link to="/login" >
        <Button variant="secondary" className="h-15 text-black">Login</Button>
      </Link>
    </>
  );

  return (
    <header className="mx-auto max-w-12x1 px-4 lg:px-8 h-14 flex bg-gray-800 text-white">
      <div className="container flex justify-between items-center px-4">
        <Link className="flex items-center" to="/">
          <PawPrintIcon className="h-8 w-8" />
          <span className="ml-3 text-xl font-medium text-center">PawsConnect</span>
        </Link>

        <nav className="flex items-center gap-4 sm:gap-11">
          {/* This allows us to hide routes that only authenticated users have access to */}
          {isAuthenticated() ? authenticatedContent : publicContent}
        </nav>
      </div>
    </header>
  );
};

function PawPrintIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="4" r="2" />
      <circle cx="18" cy="8" r="2" />
      <circle cx="20" cy="16" r="2" />
      <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
    </svg>
  );
}
