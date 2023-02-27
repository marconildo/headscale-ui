import { useState } from "react";
import MainPage from "./pages/MainPage";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";

const App = () => {
  const [colorScheme, setColorScheme] = useState<string>("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <MainPage />
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
