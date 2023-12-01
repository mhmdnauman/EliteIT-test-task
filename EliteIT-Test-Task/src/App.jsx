import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppRouter from "./AppRouter";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <AppRouter />
        <Footer />
    </BrowserRouter>
  );
}

export default App;
