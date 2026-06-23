import React from 'react';

const FloatingButton: React.FC = ({onClick,className}:ButtonProps) => {


  return (
    <button
      onClick={onClick}
      className={`fixed bottom-12 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${className}`}
    >
      +
    </button>
  );
};

export default FloatingButton;
