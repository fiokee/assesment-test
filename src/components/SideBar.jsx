import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaList, FaBars, FaTimes, FaLock, FaBell, FaDollarSign, FaChartBar, FaDatabase, FaArrowLeft } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar for larger screens */}
      <div className={`fixed inset-y-0 left-0 top-32 w-64 bg-white text-gray-800 shadow-lg ${isOpen ? 'block' : 'hidden'} sm:block overflow-y-auto`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Settings</h2>
          <FaTimes 
            className="text-2xl cursor-pointer sm:hidden" 
            onClick={() => setIsOpen(false)} 
          />
        </div>
        <nav className="mt-4 flex flex-col space-y-4">
          {/* <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
            <FaHome className="mr-4 text-xl" /> Home
          </a> */}
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
            <FaUser className="mr-4 text-xl" /> Account
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
            <FaLock className="mr-4 text-xl" /> Security
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
            <FaBell className="mr-4 text-xl" /> Notification
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
            <FaDollarSign className="mr-4 text-xl" /> Pricing
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
            <FaChartBar className="mr-4 text-xl" /> Sales
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
            <FaList className="mr-4 text-xl" /> Users & Sales
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
            <FaDatabase className="mr-4 text-xl" /> Backups
          </a>
          {/* Bottom link */}
          <div className='mt-auto top-32 border-gray-50'>

          <a href="#" className="flex items-center border-gray-50 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md mt-auto">
            <FaArrowLeft className="mr-3 text-xl" /> Back to Dashboard
          </a>
          </div>
        </nav>
      </div>

      {/* Mobile menu button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <FaBars 
          className="text-2xl cursor-pointer text-gray-800" 
          onClick={() => setIsOpen(true)} 
        />
      </div>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 top-12 bg-gray-800 bg-opacity-75 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
        <div className="relative w-64 bg-white text-gray-800 h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Settings</h2>
            <FaTimes 
              className="text-2xl cursor-pointer" 
              onClick={() => setIsOpen(false)} 
            />
          </div>
          <nav className="mt-4 flex flex-col flex-grow overflow-y-auto">
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <FaHome className="mr-4 text-xl" /> Home
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <FaUser className="mr-4 text-xl" /> Account
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <FaLock className="mr-4 text-xl" /> Security
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <FaBell className="mr-4 text-xl" /> Notification
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <FaDollarSign className="mr-4 text-xl" /> Pricing
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <FaChartBar className="mr-4 text-xl" /> Sales
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <FaList className="mr-4 text-xl" /> Users & Sales
            </a>
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md">
              <FaDatabase className="mr-4 text-xl" /> Backups
            </a>
            {/* Bottom link */}
            <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-md mt-auto">
              <FaArrowLeft className="mr-3 text-xl" /> Back to Dashboard
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
