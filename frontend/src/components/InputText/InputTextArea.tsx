import isEmpty from "lodash/isEmpty";

interface InputTextAreaProps {
  name: string;
  register: any; // Ideally UseFormRegister<T>
  errors?: any;
  required?: boolean;
  placeholder?: string;
  labelName?: string;
  errorMessage?: string;
  customLabelText?: string;
  customText?: string;
  customErrorText?: string;
  emptyCheck?: any;
  availableValueCheck?: any;
  checkValue?: boolean;
  defaultValues?: string;
  validateHandle?: (value: any) => boolean | string;
  onChangeFunction?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export const InputTextArea = ({
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
  onChangeFunction,
  disabled = false,
}: InputTextAreaProps) => {
  return (
    <div className="w-full">
      {labelName && (
        <label
          className={`block text-sm font-medium text-gray-700 ${customLabelText}`}
        >
          {labelName}
        </label>
      )}

      <div className="mt-1">
        {checkValue ? (
          (availableValueCheck || isEmpty(emptyCheck)) && (
            <textarea
              className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                ${errors ? "border-red-500" : "border-gray-300"} 
                ${customText}`}
              autoComplete="off"
              placeholder={placeholder}
              defaultValue={defaultValues}
              {...register(name, {
                onChange: (e: any) => onChangeFunction?.(e),
                required,
                validate: validateHandle,
              })}
              disabled={disabled}
            />
          )
        ) : (
          <textarea
            className={`block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm
              ${errors ? "border-red-500" : "border-gray-300"} 
              ${customText}`}
            autoComplete="off"
            placeholder={placeholder}
            defaultValue={defaultValues}
            {...register(name, {
              onChange: (e: any) => onChangeFunction?.(e),
              required,
              validate: validateHandle,
            })}
            disabled={disabled}
          />
        )}
      </div>

      {errors && (
        <p className={`mt-1 text-sm text-red-600 ${customErrorText}`}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
