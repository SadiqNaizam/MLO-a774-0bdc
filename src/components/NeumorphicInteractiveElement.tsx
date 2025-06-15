import React from 'react';
import { cn } from '@/lib/utils';

interface NeumorphicInteractiveElementProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'button' | 'div';
  children: React.ReactNode;
  pressed?: boolean; // To simulate a pressed state
  className?: string;
}

const NeumorphicInteractiveElement: React.FC<NeumorphicInteractiveElementProps> = ({
  as: Component = 'button',
  children,
  pressed = false,
  className,
  ...props
}) => {
  console.log(`Rendering NeumorphicInteractiveElement as ${Component}`);
  const baseStyle = "p-4 rounded-xl transition-all duration-200 ease-in-out focus:outline-none";
  const neumorphicStyle = pressed
    ? "bg-gray-200 shadow-neumorphic-inset text-gray-700" // Inset shadow when pressed
    : "bg-gray-200 shadow-neumorphic hover:shadow-neumorphic-hover active:shadow-neumorphic-inset text-gray-800";

  // Note: 'shadow-neumorphic-*' classes would need to be defined in tailwind.config.js
  // Example (add to tailwind.config.js theme.extend.boxShadow):
  // 'neumorphic': '5px 5px 10px #bcbcbc, -5px -5px 10px #ffffff',
  // 'neumorphic-inset': 'inset 5px 5px 10px #bcbcbc, inset -5px -5px 10px #ffffff',
  // 'neumorphic-hover': '3px 3px 6px #bcbcbc, -3px -3px 6px #ffffff',

  return (
    <Component className={cn(baseStyle, neumorphicStyle, className)} {...props}>
      {children}
    </Component>
  );
};

export default NeumorphicInteractiveElement;