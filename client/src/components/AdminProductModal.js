import React, { useState, Fragment } from "react";
import isEmpty from "validator/lib/isEmpty";

import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../store/actions/messageActions";
import { createProduct } from "../store/actions/productActions";

const AdminProductModal = () => {
  /*****************************
   * REDUX GLOBAL STATE PROPERTIES
   *****************************/
  const { loading } = useSelector((state) => state.loading);
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  /*****************************
   * COMPONENT STATE PROPERTIES
   *****************************/
  const [clientSideError, setClientSideError] = useState("");
  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQty: "",
  });

  const {
    productImage,
    productName,
    productDesc,
    productPrice,
    productCategory,
    productQty,
  } = productData;

  /*****************************
   * EVENT HANDLERS
   *****************************/
  const handleMessages = (evt) => {
    dispatch(clearMessages());
    setClientSideError("");
  };

  const handleProductImage = (evt) => {
    setProductData({
      ...productData,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleProductChange = (evt) => {
    setProductData({
      ...productData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleProductSubmit = (evt) => {
    evt.preventDefault();

    if (productImage === null) {
      setClientSideError("Please select an image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productDesc) ||
      isEmpty(productPrice)
    ) {
      setClientSideError("All fields are required");
    } else if (isEmpty(productCategory)) {
      setClientSideError("Please select a category");
    } else if (isEmpty(productQty)) {
      setClientSideError("Please select a quantity");
    } else {
      let formData = new FormData();

      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      dispatch(createProduct(formData));
      setProductData({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productQty: "",
      });
    }
  };

  /*****************************
   * RENDERER
   *****************************/
  return (
    <div id="addFoodModal" className="modal" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5>Add Food</h5>
            </div>
            <div className="modal-body my-2">
              {clientSideError && showErrorMsg(clientSideError)}
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}

              {loading ? (
                <div className="text-center">{showLoading()}</div>
              ) : (
                <Fragment>
                  <div className="input-group mb-2">
                    <input
                      type="file"
                      className="form-control"
                      name="productImage"
                      onChange={handleProductImage}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-secondary">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productName"
                      value={productName}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-secondary">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="productDesc"
                      value={productDesc}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-secondary">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productPrice"
                      value={productPrice}
                      onChange={handleProductChange}
                    />
                  </div>

                  <div className="form-row">
                    <label className="text-secondary">Category</label>
                    <div className="form-group col-md-6">
                      <select
                        classform="form-select"
                        aria-label="Default select example"
                        name="productCategory"
                        onChange={handleProductChange}
                      >
                        <option defaultValue>Choose one...</option>
                        {categories &&
                          categories.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.category}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group col-md-6">
                      <label className="text-secondary">Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        min="0"
                        max="1000"
                        name="productQty"
                        value={productQty}
                        onChange={handleProductChange}
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-success text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;
