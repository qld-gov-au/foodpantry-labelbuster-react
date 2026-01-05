import React from "react";
import type { ChangeEvent, FormEvent, FocusEvent, ReactNode } from "react";

type TextareaProps = {
  id: string;
  label?: string;
  value: string;
  hint?: ReactNode;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: (event: FormEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  optional?: boolean;
  required?: boolean;
  invalidMessage?: string;
  validMessage?: string;
  placeholder?: string;
  rows?: number;
  width?: string | number;
  inputClassName?: string;
};

export const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  value,
  onChange,
  onInput,
  onBlur,
  hint,
  optional = false,
  required = false,
  invalidMessage = "This field is required",
  validMessage = "Success",
  placeholder,
  rows = 3,
  width,
}) => {
  const describedBy = hint ? `${id}-hint` : undefined;
  const containerStyle = width ? { maxWidth: width } : undefined;

  return (
    <div style={containerStyle}>
      {label && (
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

      <textarea
        id={id}
        className="form-control"
        placeholder={placeholder}
        required={required}
        aria-describedby={describedBy}
        rows={rows}
        value={value}
        onChange={onChange}
        onInput={onInput}
        onBlur={onBlur}
      />

      <div className="valid-feedback">{validMessage}</div>
      <div className="invalid-feedback">{invalidMessage}</div>
    </div>
  );
};
