import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./index.scss";

const Detail = ({ value }) => {
  const { id } = useParams();
  const [_id, setId] = useState(value?.data?._id);
  const [name, setName] = useState(value?.data?.name);
  const [price, setPrice] = useState(value?.data?.price);
  const [stock, setStock] = useState(value?.data?.stock);

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v4/product/${id}`);
      if (response.data.data) {
        setId(response.data.data._id);
        setName(response.data.data.name);
        setPrice(response.data.data.price);
        setStock(response.data.data.stock);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {_id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
