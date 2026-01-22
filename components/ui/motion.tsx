'use client';

import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { ReactNode } from 'react';

// FADE UP - Standard entry animation
const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Custom easing for Material feel
    }
};

export function FadeIn({ children, className, delay = 0, ...props }: { children: ReactNode, className?: string, delay?: number } & HTMLMotionProps<"div">) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpVariants}
            transition={{ delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// STAGGER CONTAINER - Use for lists/grids
const staggerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

export function StaggerContainer({ children, className, ...props }: { children: ReactNode, className?: string } & HTMLMotionProps<"div">) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerVariants}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// STAGGER ITEM - Child of StaggerContainer
const staggerItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export function StaggerItem({ children, className, ...props }: { children: ReactNode, className?: string } & HTMLMotionProps<"div">) {
    return (
        <motion.div variants={staggerItemVariants} className={className} {...props}>
            {children}
        </motion.div>
    );
}

// SCALE IN - For images/icons
const scaleInVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

export function ScaleIn({ children, className, delay = 0, ...props }: { children: ReactNode, className?: string, delay?: number } & HTMLMotionProps<"div">) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleInVariants}
            transition={{ delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// HOVER CARD - Material interaction
export function HoverCard({ children, className, ...props }: { children: ReactNode, className?: string } & HTMLMotionProps<"div">) {
    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
            transition={{ duration: 0.2 }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}
