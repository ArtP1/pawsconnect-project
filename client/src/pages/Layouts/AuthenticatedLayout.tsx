// In AuthenticatedLayout.tsx
import React from 'react';
import { NavMenu } from '@/components/navmenu';
import { IoIosGitNetwork } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Footer } from '@/components/Footer';

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

export const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => (
    <>
        <NavMenu />

        <div className='container flex flex-col md:flex-row px-0 min-h-screen'>
            <div className="flex flex-col border-r w-full md:w-56 sticky top-0">
                <div className="flex h-[90px] justify-center items-center border-b">
                    <span className="h-fit">Feed</span>
                </div>

                <nav className="flex-grow p-4 space-y-7 overflow-auto">
                    <Input className="w-full h-25 rounded-md text-black" placeholder="Search for users..." type="search" />

                    <Link
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                        to="/friends">
                        <FaUserFriends className="h-5 w-5" />
                        <span>Friends</span>
                    </Link>

                    <Link
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                        to="#">
                        <FiMessageSquare className="h-5 w-5" />
                        <span>Messages</span>
                    </Link>

                    <Link
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                        to="#">
                        <IoIosNotifications className="h-5 w-5" />
                        <span>Notifications</span>
                    </Link>

                    <Link
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                        to="/connections">
                        <IoIosGitNetwork className="h-5 w-5" />
                        <span>Network</span>
                    </Link>

                    <Link
                        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                        to="#">
                        <IoIosAddCircle className="h-5 w-5" />
                        <span>Add Post</span>
                    </Link>
                </nav>
            </div>

            {children}
        </div>

        <Footer />
    </>
);