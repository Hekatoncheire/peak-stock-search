import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default function Card({ title, children, className }: CardProps) {
    return (
        <div className={`flex flex-col py-4 px-4 rounded-xl shadow-xl ${className}`}>
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            {children}
        </div>
    );
}
