import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

import Homepage from "./components/Homepage";
import NavBar from "./Header/Navbar";
import Products from "./components/Products";

const App = () => {
   return (
      <Router>
         <GlobalStyles />
         <NavBar />
         <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/products" element={<Products />} />
         </Routes>
      </Router>
   );
};

export default App;
