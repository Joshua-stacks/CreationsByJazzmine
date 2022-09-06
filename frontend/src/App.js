import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

import Homepage from "./components/Homepage";
import NavBar from "./Header/Navbar";
import Products from "./components/Products";
import About from "./components/About";

const App = () => {
   return (
      <Router>
         <GlobalStyles />
         <NavBar />
         <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/about" element={<About />} />
         </Routes>
      </Router>
   );
};

export default App;
