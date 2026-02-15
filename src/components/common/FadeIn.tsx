import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.6,
    once = true
}: {
    children: React.ReactNode,
    className?: string,
    direction?: 'up' | 'down' | 'left' | 'right',
    delay?: number,
    duration?: number,
    once?: boolean
}) => {
    const directionOffset = {
        up: { y: 15, x: 0 },
        down: { y: -15, x: 0 },
        left: { x: 15, y: 0 },
        right: { x: -15, y: 0 }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: directionOffset[direction].y,
                x: directionOffset[direction].x,
                translateZ: 0
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                translateZ: 0
            }}
            viewport={{ once: once, margin: "-20px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 1, 0.36, 1]
            }}
            style={{ willChange: "opacity, transform" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
