import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Products from "./pages/Products";
import SignUp from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
