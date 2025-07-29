interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
    />
  );
}
