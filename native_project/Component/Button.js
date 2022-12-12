import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const ButtonCustom = ({ onPress, text }) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3B71F3",

        padding: 10,
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 5,
    },
    text: { color: "white" },
});
export default ButtonCustom;