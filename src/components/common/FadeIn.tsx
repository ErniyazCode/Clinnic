import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    className?: string;
    fullWidth?: boolean;
}

const FadeIn = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.5,
    className = "",
    fullWidth = false
}: FadeInProps) => {

    const getInitial = () => {
        switch (direction) {
            case 'up': return { opacity: 0, y: 40 };
            case 'down': return { opacity: 0, y: -40 };
            case 'left': return { opacity: 0, x: 40 };
            case 'right': return { opacity: 0, x: -40 };
            case 'none': return { opacity: 0 };
            default: return { opacity: 0, y: 40 };
        }
    };

    return (
        <motion.div
            initial={getInitial()}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.25, 0.4, 0.55, 1] // Custom cubic-bezier for smoother feel
            }}
            className={`${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
