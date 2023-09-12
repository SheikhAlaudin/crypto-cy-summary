import React from 'react';
import './Footer.css'
export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-center text-lg-start">
      <div className="text-center p-3">
        © 2023 Copyright:&nbsp;
        <a className="text-dark" href="#" data-testid="footer_crypto">cryptocy.com</a>
      </div>
    </footer>
  );
};
