import { StyleSheet } from "react-native";

export default StyleSheet.create({
    body:{
        backgroundColor: "gray",
        height: "100%",
        padding: 20
    },
    item: {
        backgroundColor: '#ddd9d6',
        // 0.1rem basado en base 16px (16 * 0.1 = 1.6)
        // Nota: RN no suele renderizar decimales menores a 0.5 bien, se suele redondear a 2
        borderRadius: 2, 
        
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',

        // Padding (1rem = 16px)
        padding: 16,

        // El margen porcentual sí funciona
        marginBottom: '2%',

        // --- SOMBRA (Reemplazo de drop-shadow) ---
        // En iOS:
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 0,
        
        // En Android (limitado, no permite offset exacto de 2px):
        elevation: 3,
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