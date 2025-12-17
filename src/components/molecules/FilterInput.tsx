import Input from "../atoms/Input";

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function FilterInput({
  value,
  onChange,
  placeholder = "Enter threshold...",
}: FilterInputProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        label="Sales Threshold"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-48"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
        Bars exceeding this value will be highlighted
      </p>
    </div>
  );
}
