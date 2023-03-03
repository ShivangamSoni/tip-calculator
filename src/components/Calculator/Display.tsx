import {
    type ReactNode,
    type DetailedHTMLProps,
    type ButtonHTMLAttributes,
} from "react";

import { BiDollar as DollarIcon } from "react-icons/bi";

export default function Display({
    children,
    action,
}: {
    children: ReactNode;
    action?: ReactNode;
}) {
    return (
        <div className="grid md:grid-rows-[1fr_auto] gap-9 md:gap-0 p-6 md:p-10 bg-neutral-700 rounded-2xl">
            <ul className="flex flex-col md:gap-5">{children}</ul>
            {action}
        </div>
    );
}

Display.Item = ({
    title,
    subtitle,
    cost,
}: {
    title: string;
    subtitle: string;
    cost: string;
}) => {
    return (
        <li className="flex items-center justify-between py-5">
            <div className="flex flex-col">
                <span className="text-sm text-white font-semibold capitalize">
                    {title}
                </span>
                <span className="text-sm text-neutral-200">{subtitle}</span>
            </div>
            <div className="flex items-center text-primary text-3xl md:text-5xl font-bold">
                <DollarIcon />
                <span>{cost}</span>
            </div>
        </li>
    );
};

Display.Button = ({
    children,
    className,
    ...props
}: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>) => {
    return (
        <button
            type="button"
            {...props}
            className={`p-2 text-lg font-semibold uppercase rounded-md bg-neutral-100 text-neutral-200 opacity-50 hover:opacity-100 ${className}`}
        >
            {children}
        </button>
    );
};
