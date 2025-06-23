import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './Button'

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-[76px] pt-[14px] pb-[14px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between w-full">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 ">
            <Image src="/images/logo/logo.svg" alt="Poligono" width={154} height={33.437} />
          </div>

          {/* Navigation Menu and Action Buttons - Grouped Together */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Menu */}
            <nav className="flex items-center space-x-6">
              <Link 
                href="/about" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                href="/services" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Services
              </Link>
              <Link 
                href="/features" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </Link>
              <Link 
                href="/pricing" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link 
                href="/contact" 
                className="text-black hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Talk to Sales
              </Button>
              <Button variant="primary" size="sm">
                Request a Trial
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
