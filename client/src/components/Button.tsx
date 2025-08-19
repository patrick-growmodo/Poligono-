import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-roboto inline-flex items-center justify-center font-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2'
  
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800 rounded-full',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-full',
    outline: 'relative bg-transparent text-gray-800 hover:bg-pink-50 rounded-full border-0'
  }
  
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  if (variant === 'outline') {
    return (
      <button 
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        style={{
          background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #DA46F8, #6940E4) border-box',
          border: '2px solid transparent'
        }}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
} 