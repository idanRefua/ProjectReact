import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditProductDetailsPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/products/moreinfo/${id}`)
      .then((res) => {
        console.log(res.data.product);
        setProduct(res.data.product);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <div className="container">{product !== null && <div></div>}</div>;
};

export default EditProductDetailsPage;
