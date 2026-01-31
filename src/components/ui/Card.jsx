import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, hover = true, ...props }) => {
    return (
        <div
            className={twMerge(
                "bg-white rounded-xl border border-gray-100 shadow-sm p-6 overflow-hidden",
                hover && "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
