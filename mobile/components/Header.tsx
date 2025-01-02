import { View } from "react-native";

export const Header = ({ children, className = '' }: { children: any; className?: string }) => {
    return (
        <View className={`flex justify-center px-4 h-24 bg-white border-b border-neutral-300 ${className}`}>
            {children}
        </View>
    )
}