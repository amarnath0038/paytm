import { useState } from "react";

export const InputBox = ({ label, type = "text", placeholder, onChange, value }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const actualType = isPasswordField ? (!isPasswordVisible ? "password" : "text") : type;

  return (
    <div className="mb-4">
      <div className="text-md font-medium text-black mb-1">
        {label}
      </div>
      <div className="relative">
        <input
        type={actualType}
        placeholder={placeholder || label}
        onChange={onChange}
        value={value} //binding input value to value prop
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />
       {isPasswordField && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 cursor-pointer" 
          onClick={() => setIsPasswordVisible((x) => !x)}>
          {isPasswordVisible ? "Hide" : "Show"}
        </div>
       )}
      </div>
    </div>
  );
};
