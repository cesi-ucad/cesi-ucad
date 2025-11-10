'use client';

import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  footer?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  description, 
  footer, 
  children 
}) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col p-6 hover:shadow-lg transition-shadow duration-300"
      whileHover={{ 
        y: -5, 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        
        {children && (
          <div className="mt-2">
            {children}
          </div>
        )}
      </div>

      {footer && (
        <motion.div 
          className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          {footer}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;
