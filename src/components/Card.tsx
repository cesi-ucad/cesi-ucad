"use client";

import { motion } from "framer-motion";
import ImageWithFallback from "./ImageWithFallback";

interface CardProps {
  title: string;
  description: string | React.ReactNode;
  subtitle?: string;
  footer?: string;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  subtitle,
  footer,
  image,
  imageAlt,
  imageClassName,
  children,
  className = "",
}) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}
      whileHover={{
        y: -5,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {image && (
        <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-4 flex items-center justify-center">
          <ImageWithFallback
            src={image}
            alt={imageAlt ?? title}
            className={`object-cover w-full h-full ${imageClassName ?? ""}`}
            fallbackSrc="/images/membres/fallback.svg"
            width={500}
            height={500}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        {subtitle && (
          <p className="text-primary-600 font-medium mt-1 mb-3">{subtitle}</p>
        )}
        <div className="text-gray-600 mb-4">
          {typeof description === "string" ? <p>{description}</p> : description}
        </div>

        {children && <div className="mt-2">{children}</div>}
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
