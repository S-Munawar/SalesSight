import React from "react";

export type TrendDirection = "up" | "down" | "neutral";

interface InsightCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    direction: TrendDirection;
    value: string;
    label?: string;
  };
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variantStyles = {
  default: {
    bg: "bg-white dark:bg-gray-800",
    value: "text-blue-600 dark:text-blue-400",
    icon: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
  },
  success: {
    bg: "bg-white dark:bg-gray-800",
    value: "text-green-600 dark:text-green-400",
    icon: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
  },
  warning: {
    bg: "bg-white dark:bg-gray-800",
    value: "text-amber-600 dark:text-amber-400",
    icon: "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400",
  },
  danger: {
    bg: "bg-white dark:bg-gray-800",
    value: "text-red-600 dark:text-red-400",
    icon: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
  },
  info: {
    bg: "bg-white dark:bg-gray-800",
    value: "text-purple-600 dark:text-purple-400",
    icon: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
  },
};

const TrendIndicator = ({
  direction,
  value,
  label,
}: {
  direction: TrendDirection;
  value: string;
  label?: string;
}) => {
  const colors = {
    up: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30",
    down: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
    neutral: "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700",
  };

  const icons = {
    up: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
    down: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    neutral: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
      </svg>
    ),
  };

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[direction]}`}>
      {icons[direction]}
      <span>{value}</span>
      {label && <span className="text-gray-500 dark:text-gray-400 ml-1">{label}</span>}
    </div>
  );
};

export default function InsightCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = "default",
}: InsightCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl hover:scale-[1.02]`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </h3>
          <p className={`text-3xl font-bold mt-2 ${styles.value}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="mt-3">
              <TrendIndicator
                direction={trend.direction}
                value={trend.value}
                label={trend.label}
              />
            </div>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${styles.icon}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
