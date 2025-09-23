import React, { forwardRef, useState, useImperativeHandle } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import isEmpty from "lodash/isEmpty";

export interface InputProps  {
  name: string;
  register?: UseFormRegister<any>;
  errors?: FieldError;
  required?: boolean;
  placeholder?: string | number;
  labelName?: string;
  errorMessage?: string;
  customLabelText?: string;
  customText?: string;
  customErrorText?: string;
  emptyCheck?: any;
  availableValueCheck?: any;
  checkValue?: boolean;
  defaultValues?: any;
  validateHandle?: (value: any) => boolean | string;
  disabled?: boolean;
  pattern?: string;
  onChangeFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: string;
  valueAsNumber?: boolean;
  minNumber?: number;
  step?: number;
  id?: string;
  customRequired?: boolean;
  rightContentEnable?: boolean;
  rightContent?: string;
  enableRightTitle?: boolean;
  rightTitle?: string;
  customRightLabelText?: string;
  rightContentClick?: () => void;
}

export interface HandleValidation {
  checkCustomRequired: (data: any) => void;
}

export const InputText = forwardRef<HandleValidation, InputProps>(
  (
    {
      name,
      register,
      errors,
      required = false,
      placeholder,
      labelName,
      errorMessage = "This field is required",
      customLabelText = "",
      customText = "",
      customErrorText = "",
      emptyCheck,
      availableValueCheck,
      checkValue = false,
      defaultValues,
      validateHandle,
      disabled = false,
      pattern,
      onChangeFunction,
      onFocus,
      onBlur,
      type = "text",
      valueAsNumber = false,
      minNumber = -1000,
      step,
      id,
      customRequired = false,
      rightContentEnable = false,
      rightContent = "",
      enableRightTitle = false,
      rightTitle = "",
      customRightLabelText = "",
      rightContentClick
    },
    ref
  ) => {
    const [customValidation, setCustomValidation] = useState(false);

    useImperativeHandle(ref, () => ({
      checkCustomRequired(data: any) {
        setCustomValidation(isEmpty(data) && customRequired);
      }
    }));

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        valueAsNumber &&
        e.target.value.charAt(0) === "0" &&
        e.target.value.length > 1 &&
        e.target.value[1] !== "."
      ) {
        e.target.value = e.target.value.slice(1);
      }
      onChangeFunction?.(e);
    };

    const hasError = Boolean(errors) || customValidation;
    const errorMessageText =
      customValidation && customRequired ? errorMessage : errors?.message || errorMessage;

    return (
      <div className="w-full">
        {(labelName || enableRightTitle) && (
          <div className="flex items-center justify-between mb-1">
            {labelName && (
              <label
                htmlFor={id}
                className={`text-sm font-medium text-white-700 ${customLabelText}`}
              >
                {labelName}
              </label>
            )}
            {enableRightTitle && (
              <span
                onClick={rightContentClick}
                className={`cursor-pointer text-xs text-indigo-600 hover:underline ${customRightLabelText}`}
              >
                {rightTitle}
              </span>
            )}
          </div>
        )}

        <div className="relative">
          {(checkValue ? availableValueCheck || isEmpty(emptyCheck) : true) && (
            <input
              id={id}
              className={`w-full rounded-sm border px-3 py-2 text-sm focus:outline-none 
                ${hasError
                  ? "border-red-500 text-red-700 placeholder-red-300 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-indigo-500"
                } ${customText} ${rightContentEnable ? "pr-12" : ""}`}
              autoComplete="off"
              placeholder={String(placeholder ?? "")}
              defaultValue={defaultValues}
              disabled={disabled}
              {...(register &&
                register(name, {
                  onChange: handleOnChange,
                  required,
                  validate: validateHandle,
                  valueAsNumber
                }))}
              onFocus={onFocus}
              onBlur={onBlur}
              pattern={pattern}
              type={type}
              min={minNumber}
              step={step}
            />
          )}

          {rightContentEnable && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-500 text-sm">{rightContent}</span>
            </div>
          )}
        </div>

        {hasError && (
          <p className={`mt-1 text-xs text-red-600 ${customErrorText}`}>{errorMessageText}</p>
        )}
      </div>
    );
  }
);
