import { TextInput } from "react-native";

export const Input = ({ className = '', ...props }: { className?: string;[key: string]: any }) => {
    return (
        <TextInput
            className={`flex border border-neutral-400 px-4 text-base text-black rounded-md ${className}`}
            {...props}
        />
    );
}