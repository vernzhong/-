import { EmptyState } from '@/components/ui/empty-state';

export default function EmptyState({ message, subtitle }) {
  return (
    <EmptyState
      message={message}
      subtitle={subtitle}
      actionLabel="添加"
      actionLink="/tasks"
    />
  );
}