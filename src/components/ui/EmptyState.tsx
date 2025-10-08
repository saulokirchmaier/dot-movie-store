import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Icon size={80} className="text-neutral-600 mb-4" />
      <h3 className="text-lg font-medium text-neutral-300 mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm">{description}</p>
    </div>
  );
}
