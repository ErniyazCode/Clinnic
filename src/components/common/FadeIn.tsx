import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.6,
    once = true,
    style = {},
    onClick
}: {
    children: any,
    className?: string,
    direction?: 'up' | 'down' | 'left' | 'right',
    delay?: number,
    duration?: number,
    once?: boolean,
    style?: any,
    onClick?: () => void
}) => {
    // Definining variants as an object with 'any' cast to avoid interface mismatches in production build
    const hidden: any = {
        opacity: 0,
        y: direction === 'up' ? 15 : direction === 'down' ? -15 : 0,
        x: direction === 'left' ? 15 : direction === 'right' ? -15 : 0,
    };

    const visible: any = {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: duration,
            delay: delay,
            ease: [0.21, 1, 0.36, 1]
        }
    };

    return (
        <motion.div
            initial={hidden}
            whileInView={visible}
            viewport={{ once: once, margin: "-20px" }}
            style={{
                willChange: "opacity, transform",
                ...style
            }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
