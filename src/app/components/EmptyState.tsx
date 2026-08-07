"use client";

interface EmptyStateProps {
  message?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  message = "暂无数据", 
  subtitle = "开始添加你的第一条内容吧", 
  icon 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && (
        <div className="text-gray-300 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900">{message}</h3>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}