interface InputSectionProps {
  placeholder?: string;
  type?: string;
  width?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputSection({
  placeholder,
  type,
  width = 'w-[335px]',
  value,
  onChange,
}: InputSectionProps) {
  return (
    <div className={`px-4 bg-gray-900 border-gray-700 rounded-sm border ${width}`}>
      <input
        placeholder={placeholder}
        className="focus:outline-none selection:bg-gray-600 w-full h-full"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
