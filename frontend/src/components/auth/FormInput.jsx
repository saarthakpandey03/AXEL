import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const FormInput = ({
  label,
  type = "text",
  id,
  placeholder,
  icon: Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div>

      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="group flex h-14 items-center rounded-2xl border border-slate-200 bg-white/80 px-5 transition-all duration-300 hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

        {Icon && <Icon size={18} className="text-slate-400 transition group-focus-within:text-blue-600" />}

        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className="ml-3 w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 transition hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

      </div>

    </div>
  );
};

export default FormInput;