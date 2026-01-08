import { Input } from "./Input";
import { Textarea } from "./Textarea";

export interface InputConfig {
  inputKey: string;
  type?: "text" | "number" | "email" | "tel" | "url";
  placeholder?: string;
  suffix?: string;
  width?: string;
  textAreaInput?: boolean;
  invalidMessage?: string;
}

export interface CheckboxConfig {
  key: string;
  label: string;
  hint?: React.ReactNode;
  inputConfig?: InputConfig;
  renderChildren?: (
    data?: FormData,
    handleChange?: (field: keyof FormData, value: string) => void
  ) => React.ReactNode;
  requiredFields?: (keyof FormData)[];
}

interface CheckboxWithInputProps {
  label: string;
  checked: boolean;
  hint?:React.ReactNode;
  onChange: (checked: boolean) => void;
  inputConfig?: InputConfig | null;
  inputValue?: string;
  onInputChange?: ((value: string) => void) | null;
  children?: React.ReactNode;
}

export const CheckboxWithInput: React.FC<CheckboxWithInputProps> = ({
  label,
  checked,
  onChange,
  hint = null,
  inputConfig = null,
  inputValue = "",
  onInputChange = null,
  children = null,
}) => {
  const id = label.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  const invalidMessage = inputConfig?.invalidMessage ?? "This field is required";

  const toggleInvalidState = (el: HTMLInputElement | HTMLTextAreaElement) => {
    if (el.value.trim()) {
      el.classList.remove("is-invalid");
    } else {
      el.classList.add("is-invalid");
    }
  };

  return (
    <div className="mb-3">
      <div className="form-check">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="form-check-input"
          id={id}
        />
        <label htmlFor={id} className="form-check-label">
          {label}
        </label>
      </div>

      {hint && <small style={{color:"#6f777b"}}>{hint}</small>}

      {checked && (inputConfig || children) && (
        <div style={{ display: "flex", gap: "20px", marginTop:"5px" }}>
          {inputConfig && !inputConfig.textAreaInput && (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Input
                id={inputConfig.inputKey}
                type={inputConfig.type || "text"}
                value={inputValue}
                onChange={(e) => onInputChange && onInputChange(e.target.value)}
                onInput={(e) => toggleInvalidState(e.currentTarget)}
                onBlur={(e) => toggleInvalidState(e.currentTarget)}
                placeholder={inputConfig.placeholder}
                width={inputConfig.width || "420px"}
                suffix={inputConfig.suffix}
                required
                invalidMessage={invalidMessage}
              />
            </div>
          )}

          {inputConfig && inputConfig.textAreaInput && (
            <Textarea
              id={inputConfig.inputKey}
              label={undefined}
              value={inputValue}
              onChange={(e) => onInputChange && onInputChange(e.target.value)}
              onInput={(e) => toggleInvalidState(e.currentTarget)}
              onBlur={(e) => toggleInvalidState(e.currentTarget)}
              placeholder={inputConfig.placeholder}
              width={inputConfig.width || "420px"}
              required
              invalidMessage={invalidMessage}
            />
          )}

          {children && <div>{children}</div>}
        </div>
      )}
    </div>
  );
};
