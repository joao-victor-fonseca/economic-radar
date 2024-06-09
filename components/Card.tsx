import React from "react";

interface CardProps {
  title: string;
  value: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  wide?: boolean;
}

const Card = ({ title, value, Icon, wide = false }: CardProps) => (
  <div
    className={`bg-dark-3 p-4 rounded-lg shadow-md ${wide ? "col-span-2" : ""}`}
  >
    <div className="flex items-center mb-2">
      <Icon className="h-6 w-6 text-blue-500 mr-2" />
      <h2 className="font-bold">{title}</h2>
    </div>
    <p>{value}</p>
  </div>
);

export default Card;
