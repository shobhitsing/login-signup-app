import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'rounded-md font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-500',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-500',
    outline: 'border border-teal-700 text-teal-700 hover:bg-teal-50 focus:ring-teal-500',
  };
  
  const sizeStyles = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const buttonClasses = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;