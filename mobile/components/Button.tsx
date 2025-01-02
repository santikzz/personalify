import { Text, TouchableOpacity } from "react-native";

export const Button = ({ children, className = '', onPress = () => { }, ...props }: { children: any, className?: string, onPress: () => void }) => {
    return (
        <TouchableOpacity
            className='bg-neutral-950 p-4 rounded-md flex items-center justify-center'
            onPress={onPress}
            {...props}
        >
            <Text className='text-white text-base text-center'>
                {children}
            </Text>
        </TouchableOpacity>
    );
}

