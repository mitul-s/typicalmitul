import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: (props) => ({
        body: {
            bg: mode("#fff", "#fff")(props),
            color: mode("#000", "#000")(props),
        }
    })
}

const theme = extendTheme({
    styles,
    colors: {
        c: {
            yolk: "#EEFF00",
            eggshell: "#FAFAFA",
        },
    },
    fonts: {
        body: "Helvetica",
    }
})

export default theme;