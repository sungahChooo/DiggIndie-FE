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
  width,
  value,
  onChange,
}: InputSectionProps) {
  return (
    <div
      className={`bg-gray-900 border-gray-700 rounded-sm border ${width} px-4 py-3 flex items-center`}
    >
      <input
        placeholder={placeholder}
        className="focus:outline-none selection:bg-gray-600 bg-gray-900 text-white text-sm placeholder-gray-600 w-full self-center"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
