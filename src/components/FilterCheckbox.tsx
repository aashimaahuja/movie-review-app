"use client";

interface FilterCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
  name?: string;
  color?: "blue" | "green" | "purple";
}

const FilterCheckbox = ({
  id,
  label,
  checked,
  onChange,
  type = "checkbox",
  name,
  color = "blue",
}: FilterCheckboxProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "text-blue-600 focus:ring-blue-500";
      case "green":
        return "text-green-600 focus:ring-green-500";
      case "purple":
        return "text-purple-600 focus:ring-purple-500";
      default:
        return "text-blue-600 focus:ring-blue-500";
    }
  };

  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors duration-200"
    >
      <input
        id={id}
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className={`w-4 h-4 rounded border-gray-300 focus:ring-2 ${getColorClasses()}`}
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
};

export default FilterCheckbox;
