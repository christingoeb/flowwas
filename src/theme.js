import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Helvetica Neue", "Roboto", "sans-serif"].join(","),
    fontWeightBold: 700,
  },
});

export default theme;
