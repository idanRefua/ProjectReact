import "./my-products-table-component.css";

const MyProductsTableComponent = (props) => {
  const handleEdit = () => {
    props.onEditProduct(props.id);
  };

  const handleDelete = () => {
    props.onDeleteProduct(props.id);
  };

  return (
    <tr className="my-products-row">
      <th scope="row">*</th>
      <td>
        <img
          className="product-image"
          src={
            props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2018/06/12/15/08/question-mark-3470783_960_720.jpg"
          }
          alt={props.image}
        />
      </td>
      <td className="title-product">{props.title}</td>
      <td>
        <button className="btn btn-primary" onClick={handleEdit}>
          Edit Product
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete This Product
        </button>
      </td>
    </tr>
  );
};

export default MyProductsTableComponent;
