import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/icons/logo.svg"
          width={52}
          height={52}
          alt="Economic Radar logo"
          className="max-sm:w-11"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Economic Radar
        </p>
      </Link>

      <div className="flex-between gap-5">
        <SignedOut>
          <SignInButton>
            <button className="bg-blue-1 text-white px-6 py-2 rounded-full shadow-md transition-transform transform hover:scale-105">
              LOGIN
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
