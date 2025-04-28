import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface PaymentResultCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  infoContent?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PaymentResultCard({
  icon,
  title,
  description,
  infoContent,
  actions,
  className = "",
}: PaymentResultCardProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <Card className={`max-w-lg w-full text-center ${className}`}>
        <div className="flex flex-col items-center justify-center mt-8">
          {icon}
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <div className="text-gray-700 mb-2">{description}</div>
        </CardHeader>
        {infoContent && (
          <CardContent>
            {infoContent}
          </CardContent>
        )}
        {actions && (
          <CardFooter className="flex gap-3 justify-center mt-2">
            {actions}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
