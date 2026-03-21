import React from 'react';
import assets, { userDummyData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: real logout (clear token, reset context, redirect)
    navigate('/login');
  };

  return (
    <div
      className={`
        bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-auto
        text-white scrollbar-thin scrollbar-thumb-gray-600
        ${selectedUser ? 'max-md:hidden' : ''}
      `}
    >
      {/* Header with logo + menu */}
      <div className="flex items-center justify-between gap-4 pb-6">
        <img
          src={assets.logo}
          alt="Application logo"
          className="max-w-40"
        />

        <div className="relative group">
          <button type="button" className="focus:outline-none">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="h-6 w-6 cursor-pointer"
            />
          </button>

          {/* Dropdown menu */}
          <div
            className="
              absolute top-full right-0 z-30 
              w-40 rounded-lg border border-gray-600
              bg-[#282142] py-2 text-gray-100 shadow-xl
              hidden group-hover:block
            "
          >
            <div
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-700/70 active:bg-gray-600"
              onClick={() => navigate('/profile')}
            >
              Edit Profile
            </div>
            <hr className="my-1 border-t border-gray-600/70" />
            <div
              className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-700/70 active:bg-gray-600"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
      </div>

      {/* Search bar – full width, separated from header */}
      <div className="mb-6">
        <div
          className="
            bg-[#282142] rounded-full flex items-center gap-3
            px-4 py-3 border border-gray-700/60
            focus-within:border-indigo-500/50 transition-colors
          "
        >
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4 h-4 opacity-80"
          />
          <input
            type="text"
            className="
              bg-transparent border-none outline-none
              text-white text-sm placeholder-gray-400
              flex-1
            "
            placeholder="Search Users..."
            spellCheck={false}
          />
        </div>
      </div>

      <div className='flex flex-col'>
         {userDummyData.map((user, index)=>(
            <div onClick={()=> {setSelectedUser(user)}}
             key={index} className={`relative flex items-center gap-2 p-2 pl-2 rounded
            cursor-pointer max-sm:text-sm ${selectedUser?._id===user._id && 'bg-[#282142]/50'}`}>
                <img src={user?.profilePic || assets.avatar_icon} alt=""
                className='w-8.75 aspect-square rounded-full' />
                <div className='flex flex-col leading-5'>
                    <p>{user.fullName}</p>
                    {
                        index < 3
                        ? <span className='text-green-400 text-xs'>Online</span>
                        : <span className='text-neutral-400 text-xs'>Offline</span>
                    }
                </div>
                {index > 2 && <p className='absolute top-4 right-4 text-xs h-5 -m-5
                flex justify-center items-center rounded-full bg-violet-500/50'>
                {index}</p>}
            </div>
         ))}
      </div>

    </div>
  );
};

export default Sidebar;