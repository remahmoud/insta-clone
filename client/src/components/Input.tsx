import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

export default function Input({
    id,
    label,
    register,
    errors,
    ...rest
}: InputProps) {
    return (
        <div className="mb-2">
            <label
                htmlFor={id}
                className="block mb-1 text-sm font-medium text-gray-900"
            >
                {label}
            </label>
            <input
                id={id}
                className={clsx(
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ring-1 ring-inset ring-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500",
                    errors[id] && "focus:ring-rose-500 focus:border-rose-500"
                )}
                {...register(id, { required: true })}
                {...rest}
            />
        </div>
    );
}
