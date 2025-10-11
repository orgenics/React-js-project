import { Route, Routes } from "react-router";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import Addproduct from "./component/addProduct/Addproduct";
import Editproduct from "./component/editproduct/Editproduct";
import Men from "./component/Men/Men";



function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-product" element={<Addproduct />} />
      <Route path="/edit-product/:id" element={<Editproduct />} />
      <Route path="/Men" element={<Men />} />
    </Routes>
       
        
    </>
  )
}

export default App;
