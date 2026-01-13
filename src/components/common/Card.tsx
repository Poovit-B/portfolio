import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-card rounded-xl p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

