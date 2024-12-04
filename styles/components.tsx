import { StyleSheet } from "react-native"
import { BRAND_COLOR_PRIMARY, BRAND_COLOR_SECONDARY } from "./root"

const drawerHeaderButtonIconSize = 28

export const CustomHeaderStyles = StyleSheet.create({
    container: {
        backgroundColor: BRAND_COLOR_PRIMARY,
        height: 92,
    },
    titleContainer: {
        alignItems: "center",
        position: 'absolute',
        marginTop: 'auto',
        bottom: 10,
        width: "100%",
    },
    titleText: {
        color: BRAND_COLOR_SECONDARY,
        fontSize: 18,
        fontWeight: "500"
    },
    button: {
        height: drawerHeaderButtonIconSize,
        width: drawerHeaderButtonIconSize,
        position: "absolute",
        marginTop: 'auto',
        bottom: 10,
        alignItems: "center",
        justifyContent: "center",
        // WORKAROUND: for some reason, the button will not work with the default z index,
        // despite appearing "on top of" the header (it will still work about 5% of the time)
        zIndex: 1,
    },
    left: {
        left: 10,
    },
    right: {
        right: 10,
    }
})
