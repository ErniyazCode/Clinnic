import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.5,
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
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directionOffset[direction]
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            viewport={{ once: once, margin: "-50px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.25, 0.25, 0, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
