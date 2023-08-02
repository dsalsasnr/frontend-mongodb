import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v4/products");
      setProductList(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterProductList = productList ? productList.filter((product) => product.name.toLowerCase().includes(searchProduct.toLowerCase())) : [];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/v4/product/${id}`);
      getProduct();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tambah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterProductList.map((value) => (
            <tr>
              <td>{value._id}</td>
              <td>{value.name}</td>
              <td className="text-right">RP. {value.price}</td>
              <td className="text-center">
                <Link to={`/detail/${value._id}`} className="btn btn-sm btn-info">
                  Detail
                </Link>
                {console.log("valueID: ", value._id)}
                <Link to={`/edit/${value._id}`} className="btn btn-sm btn-warning">
                  Edit
                </Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(value._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
