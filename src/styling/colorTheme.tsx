import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        "&$completed": {
          color: "#78b445",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#494949",
    },
    secondary: {
      main: "#F1F1F1",
    },
  },
});
