import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 bg-clip-text text-transparent dark:from-purple-400 dark:via-indigo-400 dark:to-pink-400">
        Forget Me Request Generator
      </h1>
      <p className="mt-2 text-lg text-slate-700 dark:text-slate-300">
        Easily create and send requests to have your personal data deleted.
      </p>
    </header>
  );
};

export default Header;