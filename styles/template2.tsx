import { StyleSheet } from "react-native";

export default StyleSheet.create({
    body:{
        backgroundColor: "gray",
        height: "100%",
        padding: 20
    },
    item: {
       borderRadius: 0,
        // En React Native el borde se define por partes
        borderBottomWidth: 2,
        borderBottomColor: '#757575',
        borderStyle: 'solid', // Opcional, ya que solid es el default
        
        // Suponiendo que tu base es 16px (1rem = 16px)
        padding: 16, 
        
        // 'filter: drop-shadow' no existe como tal. 
        // Para quitar sombras, simplemente no las declares o ponlas en 0:
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0, // Necesario para Android

        // El margen porcentual funciona en React Native
        marginBottom: '2%',
    },
    titulo:{
        color: "#ecececff",
        fontFamily: "Italiana",
        fontSize: 20,
    },
    text:{
        //fontFamily: "Italiana-Regular"
    }
})