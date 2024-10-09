import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-5 px-20 shadow-md">
      <div>
        <h1 className="font-bold text-xl text-primary">
          R E S<span className="text-black"> B A N K</span>
          
        </h1>
      </div>
      <div>
        <ul>
          <li className="font-bold hover:text-primary"><Link href="/">Home</Link></li>
        </ul>
      </div>
      {/* TODO: add authentication div */}
    </header>
  );
};

export default Header;
