import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';


const primaryBase = "#745077";
const primaryMain = alpha(primaryBase, 1);

const secondaryBase = "#F5DAF7";
const secondaryMain = alpha(secondaryBase, 1);

const tertiaryBase = "#508561";
const tertiaryMain = alpha(tertiaryBase, 1);










const palette = {
  white: {
    main: "#fff",
    light: alpha("#fff", 0.5),
    dark: alpha("#fff", 0.9),
    contrastText: "#111",
  },
  black: {
    main: "#111",
    light: alpha("#111", 0.5),
    dark: alpha("#111", 0.9),
    contrastText: "#fff",
  },
}



/* Light Theme */
export const lightTheme = createTheme({ palette: { mode: "light", ...palette,
  primary: {
    main: primaryMain,
    light: alpha(primaryBase, 0.5),
    dark: alpha(primaryBase, 0.9),
    contrastText: getContrastRatio(primaryMain, "#fff") > 4.5 ? "#fff" : "#111",
  },
  secondary: {
    main: secondaryMain,
    light: alpha(secondaryBase, 0.5),
    dark: alpha(secondaryBase, 0.9),
    contrastText: getContrastRatio(secondaryMain, "#fff") > 4.5 ? "#fff" : "#111",
  },
  tertiary: {
    main: tertiaryMain,
    light: alpha(tertiaryBase, 0.5),
    dark: alpha(tertiaryBase, 0.9),
    contrastText: getContrastRatio(tertiaryMain, "#fff") > 4.5 ? "#fff" : "#111",
  },


  onBackground: {
    main: "#111",
    light: alpha("#111", 0.5),
    dark: alpha("#111", 0.9),
    contrastText: "#fff",
  },


} });







/* Dark Theme */
export const darkTheme = createTheme({ palette: { mode: "dark", ...palette,

  primary: {
    main: primaryMain,
    light: alpha(primaryBase, 0.5),
    dark: alpha(primaryBase, 0.9),
    contrastText: getContrastRatio(primaryMain, "#fff") > 4.5 ? "#fff" : "#111",
  },
  secondary: {
    main: secondaryMain,
    light: alpha(secondaryBase, 0.5),
    dark: alpha(secondaryBase, 0.9),
    contrastText: getContrastRatio(secondaryMain, "#fff") > 4.5 ? "#fff" : "#111",
  },
  tertiary: {
    main: tertiaryMain,
    light: alpha(tertiaryBase, 0.5),
    dark: alpha(tertiaryBase, 0.9),
    contrastText: getContrastRatio(tertiaryMain, "#fff") > 4.5 ? "#fff" : "#111",
  },

  onBackground: {
    main: "#fff",
    light: alpha("#fff", 0.5),
    dark: alpha("#fff", 0.9),
    contrastText: "#111",
  },

} });

