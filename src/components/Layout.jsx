import React from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? "pt-0 px-0" : "pt-28 px-4"}>
      {children}
    </div>
  );
};

export default Layout;
