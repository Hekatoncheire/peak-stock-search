import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default function Card({ title, children, className }: CardProps) {
    return (
        <div className={`bg-white p-4 rounded shadow ${className}`}>
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            {children}
        </div>
    );
}
