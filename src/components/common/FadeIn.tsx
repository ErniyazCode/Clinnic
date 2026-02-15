import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.6,
    once = true,
    style = {}
}: {
    children: React.ReactNode,
    className?: string,
    direction?: 'up' | 'down' | 'left' | 'right',
    delay?: number,
    duration?: number,
    once?: boolean,
    style?: React.CSSProperties
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 15 : direction === 'down' ? -15 : 0,
            x: direction === 'left' ? 15 : direction === 'right' ? -15 : 0,
            translateZ: 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            translateZ: 0,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.21, 1, 0.36, 1] as any
            }
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: once, margin: "-20px" }}
            style={{
                willChange: "opacity, transform",
                opacity: 0,
                ...style
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
