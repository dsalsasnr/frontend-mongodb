import { useState } from "react";
import Input from "../../components/Input";
import "./index.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tambah = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const createProduct = async (productData) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v4/products", productData);
      const newProduct = response.data;
      window.alert("Product created successfully.");
      navigate("/");
      return newProduct;
    } catch (error) {
      console.log("Error: ", error.response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, price, stock, status };
    const newProduct = await createProduct(productData);
    console.log(newProduct);
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={name} onChange={(e) => setName(e.target.value)} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          <Input name="status" type="checkbox" label="Active" checked={status} onChange={(e) => setStatus(e.target.checked)} />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
