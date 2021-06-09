import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import "@material-ui/lab/themeAugmentation";

export default responsiveFontSizes(
  createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small",
        },
      },
    },
  })
);
