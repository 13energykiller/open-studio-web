import { Listbox, Switch } from "@headlessui/react";
import { ReactNode, InputHTMLAttributes } from "react";
import { HiChevronUpDown } from "react-icons/hi2";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: ReactNode;
  descriptions?: string[];
  warnings?: string[];
  inputRef?: any;
}

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  warnings?: string[];
}

interface ToggleProps {
  id: string;
  label: string;
  defaultChecked: boolean;
  required?: boolean;
}

interface SelectProps {
  id: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  options: string[];
}

const inputStyle = (warnings?: string[]) =>
  `w-full rounded-[0.25rem] border border-[#B0B0B0] bg-white px-4 py-2 text-base leading-none placeholder-gray-semilight outline-none focus:border-primary disabled:bg-gray-light disabled:text-[#B0B0B0] ${
    warnings ? "border-red-500" : "border-gray disabled:border-gray-semilight"
  }`;

function Text({
  id,
  label,
  required,
  descriptions = [],
  warnings,
  className = "",
  defaultValue = "",
  inputRef,
  ...rest
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={`block ${className}`}>
        <p className="mb-2 text-sm font-semibold leading-6 text-[#09101D]">
          {label}
          {required && (
            <span className="text-[0.8rem] font-semibold text-[#DA1414]">
              *
            </span>
          )}
        </p>
        <input
          ref={inputRef}
          id={id}
          name={id}
          defaultValue={defaultValue}
          type="text"
          className={inputStyle(warnings)}
          required={required}
          {...rest}
        />
      </label>
      {warnings?.map((warning, i) => (
        <p
          key={i}
          className={`${
            i === 0 ? "mt-2" : "mt-1"
          } pl-2 text-[0.8rem] text-red-500`}
        >
          {warning}
        </p>
      ))}
      {descriptions.map((description, i) => (
        <p
          key={i}
          className={`${
            i === 0 ? "mt-2" : "mt-1"
          } text-gray whitespace-pre-wrap pl-2 text-[0.8rem] text-sm`}
        >
          {description}
        </p>
      ))}
    </div>
  );
}

function TextArea({
  id,
  label,
  required,
  warnings,
  defaultValue = "",
  className = "",
  ...rest
}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={id} className={`block ${className}`}>
        <p className="mb-2 text-sm font-semibold leading-6 text-[#09101D]">
          {label}
          {required && (
            <span className="text-[0.8rem] font-semibold text-[#DA1414]">
              *
            </span>
          )}
        </p>
        <textarea
          id={id}
          name={id}
          defaultValue={defaultValue}
          className={`scrollbar-none h-16 ${inputStyle(warnings)}}`}
          required={required}
          {...rest}
        />
      </label>
      {warnings?.map((warning, i) => (
        <p
          key={i}
          className={`${
            i === 0 ? "mt-2" : "mt-1"
          } pl-2 text-[0.8rem] text-red-500`}
        >
          {warning}
        </p>
      ))}
    </div>
  );
}

function File(props: InputProps) {
  return <Text {...props} type="file" />;
}

function Toggle({ id, defaultChecked, label, required }: ToggleProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold leading-6 text-[#09101D]">
        {label}
        {required && (
          <span className="text-[0.8rem] font-semibold text-[#DA1414]">*</span>
        )}
      </p>
      <Switch id={id} name={id} defaultChecked={defaultChecked} value="True">
        {({ checked }) => (
          <div
            className={`${
              checked ? "bg-primary" : "bg-gray-semilight"
            } relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full`}
          >
            <span className="sr-only">{label}</span>
            <span
              className={`${
                checked ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </div>
        )}
      </Switch>
    </div>
  );
}

function Select({ id, label, required, defaultValue, options }: SelectProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold leading-6 text-[#09101D]">
        {label}
        {required && (
          <span className="text-[0.8rem] font-semibold text-[#DA1414]">*</span>
        )}
      </p>
      <Listbox name={id} defaultValue={defaultValue}>
        <div className="relative">
          <Listbox.Button className={`relative cursor-default ${inputStyle()}`}>
            {({ value }) => (
              <>
                <span className="block text-left">{value}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiChevronUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </>
            )}
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-2 w-full overflow-auto rounded-[0.25rem] bg-white py-1 text-base shadow-lg ring-1 ring-[#B0B0B0] focus:outline-none sm:text-sm">
            {options.map((option, i) => (
              <Listbox.Option
                key={`${id}-option${i}`}
                value={option}
                className="relative cursor-default select-none px-4 py-2 ui-active:bg-primary ui-active:text-white"
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}

const Input = { Text, TextArea, File, Toggle, Select };
export default Input;
