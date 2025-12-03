import { StatItemProps } from "@/interfaces/products/statItemProps";


export default function StatItem({ label, value, highlight = false }: StatItemProps) {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold text-gray-900">{label}</h3>
      <p className={`text-2xl font-black ${highlight ? 'text-orange-500' : 'text-gray-400'}`}>
        {value}
      </p>
    </div>
  );
}