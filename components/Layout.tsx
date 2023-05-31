import React, { FC, ReactNode } from 'react';
import Navbar from './Navbar';

interface MyProps {
  children?: ReactNode;
}

const Layout: FC<MyProps> = props => {
  return (
    <main>
      <Navbar />
      {props.children}
    </main>
  );
};

export default Layout;
