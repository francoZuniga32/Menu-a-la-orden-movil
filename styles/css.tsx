import { StyleSheet } from "react-native";

export default StyleSheet.create({
    body:{
        margin: 20,
        height: "100%"
    },
    formBody: {
        margin: 20,
        paddingBottom: 32
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
    label: {
        color: "white",
        fontSize: 14,
        marginTop: 16,
        marginBottom: 6
    },
    input: {
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        color: "white",
        paddingHorizontal: 12,
        paddingVertical: 10,
        minHeight: 44
    },
    pickerWrap: {
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 4,
        justifyContent: "center"
    },
    sectionTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginTop: 32,
        marginBottom: 4,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.25)"
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
        marginTop: 24,
        marginBottom: 8,
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