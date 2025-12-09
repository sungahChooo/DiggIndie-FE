interface InputSectionProps {
  placeholder?: string;
  type?: string;
  width?: string;
}
export default function InputSection({
  placeholder,
  type,
  width = 'w-[335px]',
}: InputSectionProps) {
  return (
    <div className={`p-4 bg-gray-900 border-gray-700 rounded-sm border ${width}`}>
      <input
        placeholder={placeholder}
        className="focus:outline-none selection:bg-gray-600 w-full"
        type={type}
      />
    </div>
  );
}
