interface DateInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DateInput({ value, onChange }: DateInputProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
