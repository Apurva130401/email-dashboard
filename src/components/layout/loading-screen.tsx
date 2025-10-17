'use client';

import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
      <div className="aurora-background">
        <div className="aurora-shape1"></div>
        <div className="aurora-shape2"></div>
        <div className="aurora-shape3"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Animated Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 1.5,
          }}
          className="relative"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-2xl border border-accent/20"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            SyncFlo
          </h1>
          <p className="text-muted-foreground text-lg">
            Loading your dashboard...
          </p>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Initializing...</span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '200px' }}
          transition={{ delay: 1.2, duration: 2, ease: 'easeInOut' }}
          className="h-1 bg-gradient-to-r from-primary to-accent rounded-full"
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
};
