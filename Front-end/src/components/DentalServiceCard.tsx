import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface blueServiceCardProps {
  title: string;
  imageUrl: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  duration: string;
  priceRange: string;
  index?: number;
}

const blueServiceCard = ({ title, imageUrl, description, icon, features, duration, priceRange, index = 0 }: blueServiceCardProps) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <div className="p-3 bg-blue-600 rounded-full w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
    <p className="text-blue-600 text-sm mb-4">{description}</p>
    <ul className="text-left w-full mb-4">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center text-sm text-blue-600 mb-2">
          <Check className="h-4 w-4 text-blue-600 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <div className="mt-auto w-full">
      <p className="text-sm text-blue-600 mb-2">Duration: {duration}</p>
      <p className="text-sm font-medium text-blue-600">Price: {priceRange}</p>
    </div>
  </motion.div>
);

export default blueServiceCard; 