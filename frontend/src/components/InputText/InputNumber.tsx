import React, { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import _ from "lodash";
import { checkYearValidation } from "@/helpers/date";

interface OtherProps extends React.ComponentPropsWithoutRef<"input"> {
  name?: any;
  errors?: any;
  control?: any;
  transform?: any;
  defaultValue?: any;
  customLabelText?: string;
  labelName?: string;
  errorMessage?: string;
  customErrorText?: string;
  customText?: string;
  required?: boolean;
  otherValidation?: any;
  checkValidation?: boolean;
  enableMinus?: boolean;
  placeholder?: string;
  valueAsNumber?: boolean;
  customRequired?: boolean;
  removeDecimal?: boolean;
  rightContentEnable?: boolean;
  rightContent?: string;
  enableDecimalWithMinus?: boolean;
  isYearInput?: boolean;
  disabled?: boolean;
  onChangeFunction?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputNumber = forwardRef<any, OtherProps>((props, ref) => {
  const {
    name,
    errors,
    control,
    transform,
    defaultValue,
    customLabelText = "",
    labelName,
    errorMessage,
    customErrorText,
    customText,
    required = false,
    otherValidation,
    checkValidation = false,
    enableMinus = false,
    placeholder = "",
    customRequired,
    removeDecimal = false,
    rightContentEnable = false,
    rightContent = "",
    enableDecimalWithMinus = false,
    isYearInput = false,
    disabled = false,
    onChangeFunction = () => {}
  } = props;

  const [customValidation, setCustomValidation] = useState(false);

  useImperativeHandle(ref, () => ({
    checkCustomRequired(data: any) {
      if ((_.isEmpty(data?.toString()) || data == 0) && customRequired) {
        setCustomValidation(true);
      } else {
        setCustomValidation(false);
      }
    }
  }));

  const checkErrorMessage = (errors: any) => {
    switch (errors.type) {
      case "required":
        return errorMessage;
      default:
        return errors.message;
    }
  };

  const hasError = (errors: any) => {
    return Boolean(errors) || customValidation;
  };

  const formatWithCommas = (value: string) => {
    if (value === null || value === undefined) return "";
    const strValue = String(value);
    const isNegative = strValue.startsWith("-");
    const cleanValue = strValue.replace(/[^0-9.]/g, "");
    const [integerPart, decimalPart] = cleanValue.split(".");
    const int = parseInt(integerPart);
    const formattedInt = isNaN(int) ? "" : integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const formattedValue =
      decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;

    return isNegative ? `-${formattedValue}` : formattedValue;
  };

  const checkNumber = () => {
    if (checkValidation) {
      return transform;
    } else {
      return {
        input: (value: any) => {
          value = String(value ?? "");
          if (isYearInput) {
            value = value.replace(/[^\d]/g, "");
            return value.slice(0, 4);
          }
          if (enableMinus) {
            value = enableDecimalWithMinus
              ? value.replace(/[^0-9.-]/g, "")
              : value.replace(/[^0-9-]/g, "");

            if (value.includes("-")) {
              const minusCount = (value.match(/-/g) || []).length;
              if (minusCount > 1) {
                value = value.replace(/-/g, (match: any, offset: any) => (offset === 0 ? "-" : ""));
              }
              if (value.indexOf("-") > 0) {
                value = value.replace("-", "");
                value = "-" + value;
              }
            }
            if (enableDecimalWithMinus) {
              const dotCount = (value.match(/\./g) || []).length;
              if (dotCount > 1) {
                const firstDotIndex = value.indexOf(".");
                value = value.replace(/\./g, (match: any, offset: any) =>
                  offset === firstDotIndex ? "." : ""
                );
              }
            }
            return value;
          } else {
            value = removeDecimal ? value.replace(/[^0-9]/g, "") : value.replace(/[^0-9.]/g, "");

            if (!removeDecimal) {
              const dotCount = (value.match(/\./g) || []).length;
              if (dotCount > 1) {
                const firstDotIndex = value.indexOf(".");
                value = value.replace(/\./g, (match: any, offset: any) =>
                  offset === firstDotIndex ? "." : ""
                );
              }
            }
            return value;
          }
        },
        output: (e: any) => {
          const value = e.target.value || "";
          if (enableMinus) {
            return value;
          } else {
            const cleanedNumber = value.replace(/[^0-9.]/g, "");
            return isNaN(parseFloat(cleanedNumber)) ? "" : cleanedNumber;
          }
        }
      };
    }
  };

  const inputOnchangeValue = (e: any, field: any) => {
    const raw = e.target.value.replace(/,/g, "");
    const value = checkValidation
      ? transform.output({ target: { value: raw } })
      : checkNumber().output({ target: { value: raw } });

    field.onChange(value);
    onChangeFunction(e);
  };

  const returnValue = (field: any) => {
    const value = field?.value ?? defaultValue ?? "";
    const rawValue = checkValidation ? transform.input(value) : checkNumber().input(value);

    return isYearInput ? rawValue : formatWithCommas(rawValue);
  };

  const isYearRequired = useMemo(() => {
    return isYearInput && required;
  }, [isYearInput, required]);

  return (
    <div className="w-full">
      {labelName && (
        <label className={`block mb-1 text-sm font-medium text-gray-700 ${customLabelText}`}>
          {labelName}
        </label>
      )}

      <div className="relative w-full">
        <Controller
          defaultValue={defaultValue}
          control={control}
          rules={{
            required: {
              value: required,
              message: errorMessage
            },
            ...(isYearRequired && {
              validate: {
                yearValid: (v: any) => {
                  const year = parseInt(v);
                  return checkYearValidation(year) || "Please enter a valid year";
                }
              }
            }),
            ...otherValidation
          }}
          name={name}
          render={({ field }) => (
            <input
              className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none 
                ${hasError(errors) 
                  ? "border-red-500 text-red-700 placeholder-red-300 focus:ring-1 focus:ring-red-500" 
                  : "border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-indigo-500"
                } ${customText} ${rightContentEnable ? "pr-12" : ""}`}
              onChange={e => inputOnchangeValue(e, field)}
              value={returnValue(field)}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}
        />

        {rightContentEnable && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 text-sm">{rightContent}</span>
          </div>
        )}
      </div>

      {hasError(errors) && (
        <p className={`mt-1 text-xs ${customErrorText} ${customValidation ? "text-red-600" : "text-red-500"}`}>
          {customValidation && customRequired ? errorMessage : checkErrorMessage(errors)}
        </p>
      )}
    </div>
  );
});
