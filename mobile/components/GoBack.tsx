import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export const GoBack = () => {
    return (
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
            <Ionicons name="chevron-back-outline" size={24} color="black" />
            <Text style={styles.text}>Volver</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    text:{
        fontSize: 20,
        fontWeight: 'semibold',
    }
});