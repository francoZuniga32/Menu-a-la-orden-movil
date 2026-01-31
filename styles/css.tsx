import { StyleSheet } from "react-native";

export default StyleSheet.create({
    body:{
        margin: 20,
        height: "100%"
    },
    title: {
        color: "white",
        textAlign: "center",
        fontSize: 20
    },
    reactLogo: {
        height: "100%",
        width: "100%",
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    parrafo: {
        color: "white"
    },
    input: {
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 2,
        color: "white"
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        marginTop: 20,
        width: "auto"
    },
    button_image:{
        width: 40,
        height: 40,
        padding: 4,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 2 
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    flexRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row"
    },
    w100: {
        width: "50%",
        padding: 2
    }
})