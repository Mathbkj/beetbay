import { useRef, useState } from "react";
import { User } from "lucide-react";

interface InputFileProps {
  onChange?: (filePath: string | null) => void;
}

export function InputFile({ onChange }: InputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange?.(result);
      };
      reader.readAsDataURL(file);
    } else {
      onChange?.(null);
    }
  };

  return (
    <div
      className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center cursor-pointer overflow-hidden hover:bg-zinc-700 transition-colors"
      onClick={() => inputRef.current?.click()}
    >
      {preview ? (
        <img
          src={preview}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="w-12 h-12 text-zinc-500" />
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
