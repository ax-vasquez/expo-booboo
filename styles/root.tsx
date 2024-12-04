import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export const BRAND_COLOR_PRIMARY = "green"
export const BRAND_COLOR_SECONDARY = "white"
export const FONT_FAMILY = "Gill Sans"

// Hopefully they will export this in the future, but this is a duplicate object
type FontStyle = {
    fontFamily: string;
    fontWeight:
      | 'normal'
      | 'bold'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900';
  }

const FONTS = {
    regular: {
        fontFamily: FONT_FAMILY,
        fontWeight: '100'
    } as FontStyle,
    medium: {
        fontFamily: FONT_FAMILY,
        fontWeight: '300'
    } as FontStyle,
    bold: {
        fontFamily: FONT_FAMILY,
        fontWeight: 'bold'
    } as FontStyle,
    heavy: {
        fontFamily: FONT_FAMILY,
        fontWeight: '900'
    } as FontStyle
}

export const LIGHT_THEME: Theme = {
    dark: false,
    fonts: FONTS,
    colors: {
        primary: 'rgb(0, 122, 255)',
        background: 'rgb(220, 220, 220)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    }
  }
  
export const DARK_THEME: Theme = {
    dark: false,
    fonts: FONTS,
    colors: {
        primary: 'rgb(10, 132, 255)',
        background: 'rgb(100, 100, 100)',
        card: 'rgb(18, 18, 18)',
        text: 'rgb(229, 229, 231)',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
    }
}

export const LayoutStyles = StyleSheet.create({
    gestureHandlerContainer: {
        flex: 1
    }
})
