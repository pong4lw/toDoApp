// components/DatePicker.tsx
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

export default function DatePicker({ selected, onSelect }: Props) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      footer={
        selected ? (
          <p>選択日: {selected.toLocaleDateString()}</p>
        ) : (
          <p>日付を選んでください</p>
        )
      }
    />
  );
}
