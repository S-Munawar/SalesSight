import Heading from "../atoms/Heading";

interface ChartTitleProps {
  title: string;
  subtitle?: string;
}

export default function ChartTitle({ title, subtitle }: ChartTitleProps) {
  return (
    <div className="mb-4">
      <Heading level={2} className="text-gray-800 dark:text-gray-100">
        {title}
      </Heading>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
