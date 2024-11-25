import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  const navigate = useNavigate();

  const isExternalLink = href.startsWith('http') || href.startsWith('//');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isExternalLink) {
      return;
    }

    e.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

export default Link;
