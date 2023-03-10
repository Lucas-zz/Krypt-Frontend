import { HiMenu, HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../src/assets/logo.png';
import { useState } from 'react';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <nav className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {NavbarItens.map((item, index) => (
          <NavbarItem title={item} key={item + index} />
        ))}
        <li className="bg-[#2952E3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546BD]">
          Login
        </li>
      </nav>
      <nav className="flex relative">
        <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-tl-md rounded-bl-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2 mr-3.5 flex justify-end">
              <AiOutlineClose fontSize={24} className="cursor-pointer" onClick={() => setToggleMenu(false)} />
            </li>
            {NavbarItens.map((item, index) => (
              <NavbarItem title={item} key={item + index} classProps="my-6 text-lg" />
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

const NavbarItem = ({ title, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  )
}

const NavbarItens = ["Market", "Exchange", "Tutorials", "Wallets"];

export default Navbar;