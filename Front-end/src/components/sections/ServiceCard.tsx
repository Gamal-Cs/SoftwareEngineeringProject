import React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  imageUrl: string;
  index: number;
}

export function ServiceCard({ title, imageUrl, index }: ServiceCardProps) {
  return (
    <motion.div
      className="p-4 bg-white rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-16 h-16 mx-auto mb-2 object-cover"
      />
      <p className="font-medium text-blue-600">{title}</p>
    </motion.div>
  );
} 