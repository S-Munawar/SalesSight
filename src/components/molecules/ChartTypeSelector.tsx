import Button from "../atoms/Button";

type ChartType = "bar" | "line" | "pie";

interface ChartTypeSelectorProps {
  selectedType: ChartType;
  onTypeChange: (type: ChartType) => void;
}

export default function ChartTypeSelector({
  selectedType,
  onTypeChange,
}: ChartTypeSelectorProps) {
  const chartTypes: { type: ChartType; label: string }[] = [
    { type: "bar", label: "Bar Chart" },
    { type: "line", label: "Line Chart" },
    { type: "pie", label: "Pie Chart" },
  ];

  return (
    <div className="flex gap-2">
      {chartTypes.map(({ type, label }) => (
        <Button
          key={type}
          variant={selectedType === type ? "primary" : "outline"}
          size="sm"
          active={selectedType === type}
          onClick={() => onTypeChange(type)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
