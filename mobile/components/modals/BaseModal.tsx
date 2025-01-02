import { Modal, Pressable, StyleSheet, View } from "react-native";

export const BaseModal = ({ children, isOpen, setIsOpen }: any) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
                setIsOpen(!isOpen);
            }}
        >
            <View style={styles.backdrop}>
                <Pressable style={styles.dismiss} onPress={() => setIsOpen(!isOpen)}>
                </Pressable>
                <View style={styles.inner}>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
    },
    dismiss:{
        height: 50,
    },
    inner: {
        backgroundColor: '#ffffff',
        flex: 1,
        padding: 20,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    }
});