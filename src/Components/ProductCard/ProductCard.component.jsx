import "./product-card-component.css";
import { useHistory } from "react-router-dom";

const ProductCardComponent = (props) => {
  // function that send props.id === delete / props.onDeleteCard(props.id)
  // function that send props.id === edit / props.onEditCard(props.id)
  const history = useHistory();
  const moreInfo = () => {
    history.push(`/products/moreinfo/${props.id}`);
  };
  return (
    <div
      className="card product-card"
      style={{ width: "16rem" }}
      onClick={moreInfo}
    >
      <img
        src={
          props.image
            ? props.image
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        className="card-img-top"
        alt={props.title}
      />

      <div className="card-body">
        <h5 className="card-title product-card-title ">{props.title}</h5>
        <p className="card-text product-shortinfo">{props.shortinfo}</p>
        <p className="d-flex align-items-center justify-content-center product-price">
          {props.price}$
        </p>
      </div>
    </div>
  );
};

export default ProductCardComponent;
