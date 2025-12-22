import React from "react";
import type {
  ChangeEvent,
  FormEvent,
  FocusEvent,
  ReactNode
} from "react";

type TextInputProps = {
  id: string;
  label: string;
  value: string;
  hint?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  optional?: boolean;
  required?: boolean;
  invalidMessage?: string;
  validMessage?: string;
  type?: string;
  tabIndex?: number;
  placeholder?: string;
  displayLabel?: boolean;
  width?: string | number;
  inputClassName?: string;
};

export const Input: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  onInput,
  hint,
  optional = false,
  required = false,
  invalidMessage = "This field is required",
  validMessage = "Success",
  type = "text",
  tabIndex = 0,
  placeholder = "",
  displayLabel = true,
  inputClassName = "",
}) => {
  const describedBy = hint ? `${id}-hint` : undefined;

  return (
    <div>
      {displayLabel && (
        <label
          className={`qld-text-input-label ${required ? "field-required" : ""}`}
          htmlFor={id}
        >
          {label}
          {optional && <span className="label-text-optional">(optional)</span>}
        </label>
      )}

      {hint && (
        <span className="qld-hint-text" id={describedBy}>
          {hint}
        </span>
      )}

      <input
        id={id}
        className={`form-control ${inputClassName}`.trim()}
        type={type}
        placeholder={placeholder}
        tabIndex={tabIndex}
        required={required}
        aria-describedby={describedBy}
        value={value}
        onChange={onChange}
        onInput={onInput}
      />

      <div className="valid-feedback">{validMessage}</div>
      <div className="invalid-feedback">{invalidMessage}</div>
    </div>
  );
};
