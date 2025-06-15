import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Assuming you have a utility for classnames

interface ModularDashboardWidgetProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ElementType; // Optional icon component
}

const ModularDashboardWidget: React.FC<ModularDashboardWidgetProps> = ({
  title,
  description,
  children,
  className,
  icon: Icon,
}) => {
  console.log(`Rendering ModularDashboardWidget: ${title}`);
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent className="flex-grow">
        {description && <CardDescription className="mb-2">{description}</CardDescription>}
        {children}
      </CardContent>
    </Card>
  );
};

export default ModularDashboardWidget;