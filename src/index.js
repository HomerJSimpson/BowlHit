import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const initialData = {
  "1": { hit: false },
  "2": { hit: false },
  "3": { hit: false },
  "4": { hit: false },
  "5": { hit: false }
};

function App() {
  const [bowls, setBowls] = React.useState(initialData);

  function hit(e) {
    setBowls((prev) => {
      const newBowls = { ...prev };
      try {
        newBowls[e.target.innerText] = { hit: !prev[e.target.innerText].hit };
      } catch (exception) {
        console.log(exception + "\n" + e.target);
      }
      console.log(JSON.stringify(newBowls));
      return newBowls;
    });
  }

  function reset() {
    setBowls(initialData);
  }

  const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#ff4400"
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        // dark: will be calculated from palette.secondary.main,
        contrastText: "#ffcc00"
      },
      // Provide every color token (light, main, dark, and contrastText) when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      custom: {
        light: "#ffa726",
        main: "#f57c00",
        dark: "#ef6c00",
        contrastText: "rgba(0, 0, 0, 0.87)"
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper elevation={0} p={0}>
        <Box sx={{ p: 1, bgcolor: "cornsilk", color: "darkgreen" }}>
          <Typography>Bowls</Typography>
        </Box>
        <Box p={1}>
          <br />
          {[1, 2, 3, 4, 5].map((e, i) => (
            <Box p={1}>
              <Button
                disabled={bowls[e].hit}
                key={i}
                variant="contained"
                color="primary"
                onClick={hit}
              >
                {e}
              </Button>
            </Box>
          ))}
          <Button variant="contained" onClick={reset}>
            Reset
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

createRoot(document.querySelector("#app")).render(<App />);
