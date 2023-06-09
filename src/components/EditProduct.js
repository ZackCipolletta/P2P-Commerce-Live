import ProductForm from "./ProductForm";
import React, {  } from "react";

function EditProduct(props) {
  const { productToEdit } = props;

  function handleEditProductFormSubmission(imageDownloadURL) {

    // because this function is called by a useEffect we are not able to pass in an event, which we can use to target the form.
    // instead we target the form element using its id and use the FormData object to extract the values from the form.
    // this is the same way we extract the form data values when creating a product.
    const form = document.getElementById('productForm');
    const formData = new FormData(form);
    props.onEditProduct("products", {
      title: formData.get("title"),
      description: formData.get("description"),
      condition: formData.get("condition"),
      price: parseFloat(formData.get("price")),
      shippingPrice: parseFloat(formData.get("shippingPrice")),
      imageUrl: imageDownloadURL || productToEdit.imageUrl,
      id: productToEdit.id
    });
  }

  return (
    <React.Fragment>
      <p> This is the edit page</p>
      <ProductForm product={props.productToEdit}
        formSubmissionHandler={handleEditProductFormSubmission}
        buttonText="Edit Product"/>
    </React.Fragment>
  );

}

export default EditProduct;