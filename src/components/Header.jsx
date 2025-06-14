import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Profil Desa', path: '/profil' },
  { name: 'Statistik', path: '/statistik' },
  { name: 'Berita', path: '/berita' },
  { name: 'Bumdes', path: '/bumdes' },
  { name: 'Galeri', path: '/galeri' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#2E7D32] text-white px-6 md:px-8 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="flex items-center space-x-4 hover:opacity-90 transition-opacity">
        <img
          src="/src/assets/logo.png"
          alt="Logo Desa"
          className="w-14 h-14 object-contain"
        />
        <div>
          <h1 className="font-bold text-xl leading-tight">Desa Cikupa</h1>
          <p className="text-xl text-gray-200">Kabupaten Tasikmalaya</p>
        </div>
      </Link>

      {/* Tombol hamburger untuk mobile */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <HiOutlineX className="text-3xl" />
          ) : (
            <HiOutlineMenu className="text-3xl" />
          )}
        </button>
      </div>

      {/* Menu utama untuk desktop */}
      <nav className="hidden md:flex items-center space-x-6 font-semibold text-xl">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `relative transition-colors duration-200 ${
                isActive ? 'text-white' : 'hover:text-yellow-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute bottom-[-4px] left-0 right-0 h-[3px] bg-yellow-400 rounded-sm" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-[#2E7D32] text-white px-6 py-4 md:hidden space-y-4 font-semibold text-lg shadow-md">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block transition-colors duration-200 ${
                  isActive ? 'text-yellow-400' : 'hover:text-yellow-300'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
