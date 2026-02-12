import { motion } from 'framer-motion';

const NotebookCard = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`paper-texture bg-[#FDFBF7] rounded-xl shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col ${className}`}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-multiply"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default NotebookCard;