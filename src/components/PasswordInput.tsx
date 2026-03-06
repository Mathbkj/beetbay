import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, label, placeholder }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-medium text-white/80">
          {label}
        </label>
        <div className="relative flex items-center">
          <input
            id={id}
            name={id}
            type={isVisible ? "text" : "password"}
            placeholder={placeholder}
            ref={ref}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-4 py-3 pr-12 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-white/30"
          />
          <button
            type="button"
            className={`absolute right-3 bg-transparent border-none cursor-pointer p-0 flex items-center justify-center transition-colors ${isVisible ? "text-primary" : "text-white/40 hover:text-white/70"}`}
            aria-label="Toggle password visibility"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
