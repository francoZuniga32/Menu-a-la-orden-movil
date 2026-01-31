import { StyleSheet } from "react-native";

export default StyleSheet.create({
    body:{
        backgroundColor: "gray",
        height: "100%",
        padding: 20
    },
    item: {
        backgroundColor: "#a3e635",
        borderRadius: 8,          // .5rem ≈ 8px
        borderWidth: 3,
        borderColor: "black",

        // Sombra (equivalente a drop-shadow)
        shadowColor: "#000",
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 7, // Android

        padding: 16,              // 1rem ≈ 16px
        marginBottom: "2%",

        fontFamily: "System",     // Fuente equivalente multiplataforma
    },
    titulo:{
        color: "#1d1d1dff",
        fontFamily: "Italiana-Regular",
        fontSize: 20,
    },
    text:{
        fontFamily: "Italiana-Regular"
    }
})