import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

import Homepage from "./components/Homepage";
import NavBar from "./Header/Navbar";
import Products from "./components/Products";
import About from "./components/About";
import Orders from "./components/Orders";
import Cart from "./components/Cart";

import { ProductProvider } from "./components/ContextComponents/ProductContext";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route
          exact
          path="/products"
          element={
            <ProductProvider>
              <Products />
            </ProductProvider>
          }
        />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
