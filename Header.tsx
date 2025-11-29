
import React from 'react';
import { UserIcon, BriefcaseIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="bg-brand-secondary/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-800">
      <div className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BriefcaseIcon />
          <h1 className="text-2xl font-bold text-white tracking-tight">Legal History AI</h1>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/50 px-3 py-1.5 rounded-full text-sm">
          <UserIcon />
          <span className="text-brand-subtle hidden sm:inline">abogadomauricio.26@gmail.com</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
