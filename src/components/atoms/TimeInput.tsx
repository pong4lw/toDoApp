interface TimeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TimeInput({ value, onChange }: TimeInputProps) {
  return (
    <input
      type="time"
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
