import { LucideIcon } from "lucide-react";

interface RecommendBenefitCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function RecommendBenefitCard({
  title,
  description,
  icon: Icon,
}: RecommendBenefitCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <Icon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
