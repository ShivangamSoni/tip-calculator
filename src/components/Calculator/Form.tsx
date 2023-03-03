import {
    type ReactNode,
    type DetailedHTMLProps,
    type FC,
    type InputHTMLAttributes,
    type SVGProps,
    type FormHTMLAttributes,
    forwardRef,
} from "react";

export default function Form({
    children,
    ...props
}: DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>) {
    return (
        <form {...props} className="grid gap-10 p-4">
            {children}
        </form>
    );
}

Form.Field = ({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: ReactNode;
}) => {
    return (
        <fieldset className="grid gap-5">
            <div className="flex items-center justify-between text-sm font-semibold">
                <legend className="text-neutral-300">{label}</legend>
                {error && <span className="text-error">{error}</span>}
            </div>
            {children}
        </fieldset>
    );
};

interface InputFieldProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    IconBefore?: FC<SVGProps<SVGSVGElement>>;
    label?: string;
    error?: boolean;
}
Form.InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    ({ IconBefore, label, error, ...inputProps }, ref) => {
        return (
            <label
                className={`cursor-pointer flex items-center justify-start p-2 rounded outline outline-2 focus-within:outline-primary bg-neutral-50 text-neutral-100 font-bold text-xl ${
                    error ? "outline-error" : "outline-transparent"
                }`}
            >
                {IconBefore && (
                    <span>
                        <IconBefore />
                    </span>
                )}
                <div className="flex-1 relative">
                    <input
                        {...inputProps}
                        tabIndex={1}
                        placeholder={label}
                        className="cursor-pointer w-full appearance-none text-right bg-transparent outline-none border-none focus:text-neutral-700 placeholder:text-transparent peer"
                        ref={ref}
                    />
                    {label && (
                        <span className="absolute inset-0 pointer-events-none text-center text-neutral-300 hidden peer-placeholder-shown:block">
                            {label}
                        </span>
                    )}
                </div>
            </label>
        );
    },
);

interface RadioButtonProps
    extends Omit<
        DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        "type"
    > {
    label: string;
}
Form.RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
    ({ label, ...inputProps }, ref) => {
        return (
            <label className="cursor-pointer outline-none border-none">
                <input
                    {...inputProps}
                    type="radio"
                    ref={ref}
                    className="sr-only peer"
                    tabIndex={1}
                />
                <div className="font-bold text-xl text-center p-2 rounded outline outline-2 outline-transparent bg-neutral-700 text-neutral-50 hover:bg-neutral-100 hover:text-neutral-700 peer-checked:bg-neutral-100 peer-checked:text-neutral-700 peer-focus-visible:outline-primary">
                    <span>{label}</span>
                </div>
            </label>
        );
    },
);
