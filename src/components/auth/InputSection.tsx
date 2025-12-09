interface InputSectionProps {
  placeholder?: string;
  type?: string;
}
export default function InputSection({ placeholder, type }: InputSectionProps) {
  return (
    <div className="p-4 w-[335px] bg-gray-900 border-gray-700 rounded-sm border">
      <input
        placeholder={placeholder}
        className="focus:outline-none selection:bg-gray-600"
        type={type}
      />
    </div>
  );
}
