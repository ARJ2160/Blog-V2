import React, { FC, ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import DropDown from './DropDown';

interface MyProps {
  children?: ReactNode;
}

const Layout: FC<MyProps> = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', hideMenu);
    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });
  return (
    <main>
      <Navbar toggle={toggle} />
      <DropDown isOpen={isOpen} toggle={toggle} />
      {props.children}
    </main>
  );
};

export default Layout;
