import { useEffect } from "react";
import axios from "axios";

const MyFavouritesPage = () => {
  useEffect(() => {
    axios
      .get("/products/myfavourites")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <div></div>;
};

export default MyFavouritesPage;
