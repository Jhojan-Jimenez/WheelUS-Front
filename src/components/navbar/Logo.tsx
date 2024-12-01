import React from 'react';
import Link from '@/components/ui/Link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex mr-4">
      <img src="/logo.png" className=" h-8" alt="WheelUS Logo" />
      <span
        className="self-center text-2xl font-semibold whitespace-nowrap green-text 
                relative group hidden sm:inline"
      >
        WheelUS
        <span className="absolute left-0 bottom-0 w-full h-1 bg-[var(--verde)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
      </span>
      <span
        className="self-center text-2xl font-semibold whitespace-nowrap green-text inline sm:hidden 
                relative group"
      >
        WUS
        <span className="absolute left-0 bottom-0 w-full h-1 bg-[var(--verde)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
      </span>
    </Link>
  );
};

export default Logo;
