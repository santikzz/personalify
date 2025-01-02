import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export const GoBack = () => {
    return (
        <TouchableOpacity onPress={() => router.back()}>
            <Text className="font-semibold text-xl">{'<'} Volver</Text>
        </TouchableOpacity>
    );
}