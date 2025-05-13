import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  content: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
  rating: number;
  index: number;
}

export function TestimonialCard({ content, author, rating, index }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-700 fill-current" />
        ))}
      </div>
      <p className="text-blue-600 mb-6 italic">{content}</p>
      <div className="flex items-center">
        <img 
          src={author.imageUrl} 
          alt={author.name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-semibold text-blue-600">{author.name}</h4>
          <p className="text-sm text-blue-600">{author.role}</p>
        </div>
      </div>
    </motion.div>
  );
} 