import React, { FC, ReactNode, useEffect, useState } from 'react';
import { NavBar, DropDown } from './index';

interface MyProps {
  children?: ReactNode;
}

export const Layout: FC<MyProps> = props => {
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
      <NavBar toggle={toggle} isOpen={isOpen} />
      <DropDown isOpen={isOpen} toggle={toggle} />
      {props.children}
    </main>
  );
};
