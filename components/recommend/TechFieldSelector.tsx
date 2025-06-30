import { Code, Rocket, BrainCircuit, Users, Mic } from 'lucide-react';

const techFields = [
  { name: 'Web Development', icon: Code },
  { name: 'AI / Machine Learning', icon: BrainCircuit },
  { name: 'Mobile App Dev', icon: Users },
  { name: 'DevOps / Infra', icon: Rocket },
  { name: 'Meetup / Community', icon: Mic },
];

interface TechFieldSelectorProps {
  onFieldSelect: (field: string) => void;
}

export function TechFieldSelector({ onFieldSelect }: TechFieldSelectorProps) {
  return (
    <div className="mb-8">
      <p className="text-lg text-gray-600 mb-4">興味のある技術分野を選択してください:</p>
      <div className="flex flex-wrap justify-center gap-3">
        {techFields.map((field) => (
          <button
            key={field.name}
            onClick={() => onFieldSelect(field.name)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 hover:border-indigo-500 hover:text-indigo-600 transition-all duration-200 transform hover:scale-105"
          >
            <field.icon className="h-5 w-5" />
            <span className="font-medium">{field.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
