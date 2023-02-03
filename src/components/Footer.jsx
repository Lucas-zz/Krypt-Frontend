import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="w-full flex md:justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="w-32"
          />
        </div>
        <div className="flex flex-1 sm:flex-row flex-col justify-evenly items-center flex-wrap sm:mt-0 mt-6 w-full gap-5">
          <a href="#" className="text-white text-base text-center mx-2">Market</a>
          <a href="#" className="text-white text-base text-center mx-2">Exchange</a>
          <a href="#" className="text-white text-base text-center mx-2">Tutorials</a>
          <a href="#" className="text-white text-base text-center mx-2">Wallets</a>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col">
        <p className="text-white text-xs text-center">Come join us</p>
        <a
          href="mailto:lucasazzollinivieira@gmail.com?subject=KryptoApp"
          className="text-white text-xs text-center"
        >
          lucasazzollinivieira@gmail.com
        </a>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 sm:mt-2" />
      <div className="sm:w-[90%] flex sm:flex-row flex-col justify-between items-center mt-3 sm:gap-0 gap-1">
        <p className="text-white text-xs text-center">@kryptomastery 2023</p>
        <p className="text-white text-xs text-center">All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;