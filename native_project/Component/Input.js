import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const InputCustom = ({ value, setValue, placeholder, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#e8e8e8",
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    input: {},
});

export default InputCustom;