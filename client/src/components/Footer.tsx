import { Link } from "react-router-dom";

export const Footer = () => {

    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center md:px-6 border-t bg-gray-800 text-white">
            <p className="text-xs text-white dark:text-gray-400">© 2024 PawsConnect. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link className="text-xs hover:underline underline-offset-4" to="#">
                    About Us
                </Link>
                <Link className="text-xs hover:underline underline-offset-4" to="#">
                    Contact
                </Link>
                <Link className="text-xs hover:underline underline-offset-4" to="#">
                    Terms of Service
                </Link>
            </nav>
        </footer>
    );
}