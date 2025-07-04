import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Intro() {
  useEffect(() => {
    
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-4xl font-bold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      Hoşgeldiniz
    </motion.div>
  );
} 