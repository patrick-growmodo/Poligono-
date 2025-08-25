"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";


interface HeaderClientProps {
  user: {
    name?: string;
    email?: string;
    picture?: string;
  } | null;
}

export default function HeaderClient({ user }: HeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-[76px] pt-[14px] pb-[14px] flex items-center w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1260px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo/logo-light.svg"
            alt="Poligono"
            width={154}
            height={33}
            className="h-auto block"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
        <nav className="flex items-center space-x-6">
              {/* <Link 
                href="/about" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link> */}
              <Link 
                href="#services-section" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors hover:text-[#DA46F8]"
              >
                Services
              </Link>
              <Link 
                href="#features-section" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors hover:text-[#DA46F8]"
              >
                Features
              </Link>
              <Link 
                href="#pricing-section" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors hover:text-[#DA46F8]"
              >
                Pricing
              </Link>
              <Link 
                href="#contact-section" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors hover:text-[#DA46F8]"
              >
                Contact
              </Link>
            </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Talk to Sales
            </Button>
             {/* <Button variant="primary" size="sm">
              Request a Trial
            </Button>  */}

            {/* Auth button */}
            {user ? (
              <Link
                href="/dashboard"
                className="font-roboto inline-flex items-center justify-center font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2 bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 text-sm "
                style={{ background: 'linear-gradient(90deg, #DA46F8, #6940E4)' }}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="font-roboto inline-flex items-center justify-center font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2 bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 text-sm "
              >
                Log in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out sm:w-[320px]">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 pt-[18px] pb-[18px] border-b border-gray-200">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 ml-auto"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="px-4 py-6 space-y-4">
                {/* <Link 
                  href="#services-section" 
                  onClick={closeMobileMenu}
                  className="block text-black hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors border-b border-gray-100 pb-4"
                >
                  About
                </Link> */}
                <Link 
                  href="#services-section" 
                  onClick={closeMobileMenu}
                  className="block text-black hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors border-b border-gray-100 pb-4"
                >
                  Services
                </Link>
                <Link 
                  href="#features-section" 
                  onClick={closeMobileMenu}
                  className="block text-black hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors border-b border-gray-100 pb-4"
                >
                  Features
                </Link>
                <Link 
                    href="#pricing-section" 
                  onClick={closeMobileMenu}
                  className="block text-black hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors border-b border-gray-100 pb-4"
                >
                  Pricing
                </Link>
                <Link 
                  href="#contact-section" 
                  onClick={closeMobileMenu}
                  className="block text-black hover:text-gray-900 px-3 py-2 text-base font-medium transition-colors border-b border-gray-100 pb-4"
                >
                  Contact
                </Link>
              </nav>

              {/* Actions */}
              <div className="px-4 pb-6 space-y-4">
                <Button variant="outline" size="sm" className="w-full" onClick={closeMobileMenu}>
                  Talk to Sales
                </Button>
                {/* <Button variant="primary" size="sm" className="w-full" onClick={closeMobileMenu}>
                  Request a Trial
                </Button> */}
                {user ? (
              <Link
                href="/dashboard"
                className="w-full font-roboto inline-flex items-center justify-center font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2 bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 text-sm "
                style={{ background: 'linear-gradient(90deg, #DA46F8, #6940E4)' }}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="font-roboto inline-flex items-center justify-center font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2 bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3 text-sm "
              >
                Log in
              </Link>
            )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
