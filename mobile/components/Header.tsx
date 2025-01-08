import { StyleSheet, View } from "react-native";

export const Header = ({ children, className = '' }: { children: any; className?: string }) => {
    return (
        <View style={styles.header} className={className}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }
});