import { useState, useEffect } from "react";
import Input from "../../components/Input";
import axios from "axios";

const Edit = ({ value, match }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (match && match.params && match.params.id) {
      getProductDetail(match.params.id);
    }
  }, [match]);

  const getProductDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v4/product/${id}`);
      const productData = response.data.data;
      setName(productData.name);
      setPrice(productData.price);
      setStock(productData.stock);
      setStatus(productData.status);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProduct = { name, price, stock, status };
    console.log(updateProduct);
    try {
      const response = await axios.put(`http://localhost:3001/api/v4/product/${match.params.id}`, updateProduct);
      console.log(response.data);
      window.alert("Product updated succesfully.");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
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

export default Edit;
