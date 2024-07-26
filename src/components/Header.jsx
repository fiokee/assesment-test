import React, { Fragment } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoWalletOutline, IoSettingsOutline } from 'react-icons/io5';
import Logo from '../assets/logo2.png';
import { GoQuestion } from 'react-icons/go';
import Profile from '../assets/profile.jfif';
import Sidebar from './SideBar';
import DashBoard from './Dashboard';
const Header = () => {
  return (
    <Fragment>

    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white text-gray-800">
      {/* Left side: Logo and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <img src={Logo} alt="Logo" className="h-10" />
        <div className="relative flex items-center w-full sm:w-[629px]">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right side: Icons */}
      <div className="flex items-center space-x-4 sm:space-x-6 mt-2 sm:mt-0">
        {[
          { icon: IoMdNotificationsOutline, name: 'Notifications' },
          { icon: IoWalletOutline, name: 'Wallet' },
          { icon: GoQuestion, name: 'Inquiries' },
          { icon: IoSettingsOutline, name: 'Settings' },
        ].map(({ icon: Icon, name }) => (
          <div key={name} className="flex flex-col items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-800 hover:text-blue-500 hover:border-blue-500">
              <Icon className="text-lg" />
            </div>
            <span className="mt-1 text-xs sm:text-sm text-gray-800 hover:text-blue-500">{name}</span>
          </div>
        ))}
        <div className="relative flex items-center space-x-2">
          <img 
            src={Profile} 
            alt="Profile" 
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover cursor-pointer border border-gray-300"
          />
          <FaChevronDown className="text-gray-800 cursor-pointer hover:text-blue-500" />
        </div>
      </div>
    </header>
    <div>
      <Sidebar/>
    </div>
    <DashBoard/>
    </Fragment>
  );
};

export default Header;
