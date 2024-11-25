import React from 'react';
import Link from '@/components/ui/Link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex mr-4">
      <img src="/logo.png" className="mr-3 h-8 " alt="WheelUS Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap green-text">
        WheelUS
      </span>
    </Link>
  );
};

export default Logo;
