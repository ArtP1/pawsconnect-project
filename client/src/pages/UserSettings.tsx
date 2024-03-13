import { ManageProfiles } from "./ManageProfiles";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { FaLock } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettings } from "react-icons/io5";


export const UserSettings = () => {
  return (
    <main className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-800">

      <aside className="w-full md:w-64 bg-white dark:bg-gray-900 md:h-screen md:sticky md:top-0">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Settings</h2>
          <nav className="mt-6">
            <div>
              <Link 
                className="flex items-center p-2 text-gray-600 rounded-md dark:text-gray-200" 
                to="/"> 
                <FaHome className="w-5 h-5" />
                <span className="mx-4 font-medium">Home</span>
              </Link>
              <Link
                className="flex items-center p-2 text-gray-600 rounded-md dark:text-gray-200 dark:bg-gray-700"
                to="/accounts/edit">
                <VscAccount className="w-5 h-5" />
                <span className="mx-4 font-medium">Accounts</span>
              </Link>
              <Link 
                className="flex items-center p-2 text-gray-600 rounded-md dark:text-gray-200" 
                to="#"> 
                <FaLock className="w-5 h-5" />
                <span className="mx-4 font-medium">Privacy</span>
              </Link>
              <Link 
                className="flex items-center p-2 text-gray-600 rounded-md dark:text-gray-200" 
                to="#"> 
                <IoMdNotificationsOutline className="w-5 h-5" />
                <span className="mx-4 font-medium">Notifications</span>
              </Link>
              <Link 
                className="flex items-center p-2 text-gray-600 rounded-md dark:text-gray-200"
                to="#"> 
                <IoSettings className="w-5 h-5" />
                <span className="mx-4 font-medium">Preferences</span>
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      <div className="flex flex-col w-full md:pl-10">
        <ManageProfiles />
      </div>
    </main>
  )
};