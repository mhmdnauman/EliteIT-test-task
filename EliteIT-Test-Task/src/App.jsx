import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppRouter from "./AppRouter";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Navbar />
        <AppRouter />
        <Footer />
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
