import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { getProduct } from "../store/actions/productActions";
import { getCategories } from "../store/actions/categoryActions";

const AdminEditProduct = ({ match, history }) => {
  /*****************************
   * PARAMS
   *****************************/
  const productId = match.params.productId;

  /*****************************
   * REDUX GLOBAL STATE PROPERTIES
   *****************************/
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  /*****************************
   * COMPONENT STATE PROPERTIES
   *****************************/
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQty, setProductQty] = useState("");

  /*****************************
   * LIFECYCLE METHODS
   *****************************/
  useEffect(() => {
    if (!product) {
      dispatch(getProduct(productId));
      dispatch(getCategories());
    } else {
      setProductImage(product.fileName);
      setProductName(product.productName);
      setProductDesc(product.productDesc);
      setProductPrice(product.productPrice);
      setProductCategory(product.productCategory);
      setProductQty(product.productQty);
    }
  }, [dispatch, productId, product]);

  /*****************************
   * EVENT HANDLERS
   *****************************/
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setProductImage(image);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productImage", productImage);
    formData.append("productName", productName);
    formData.append("productDesc", productDesc);
    formData.append("productPrice", productPrice);
    formData.append("productCategory", productCategory);
    formData.append("productQty", productQty);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await axios
      .put(`/api/product/${productId}`, formData, config)
      .then((response) => {
        history.push("/admin/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*****************************
   * RENDERER
   *****************************/
  return (
    <Fragment>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div>
              <br />
              <div className="modal-content">
                <form onSubmit={handleProductSubmit}>
                  <div className="modal-header bg-warning text-white">
                    <h5 className="modal-title">Update Food</h5>
                  </div>
                  <div className="modal-body my-2">
                    <Fragment>
                      <label className="btn btn-secondary mr-6">
                        Choose file
                        <input
                          type="file"
                          name="productImage"
                          accept="images/*"
                          hidden
                          onChange={handleImageUpload}
                        />
                      </label>
                      {productImage && productImage.name ? (
                        <span className="badge bg-secondary">
                          {productImage.name}
                        </span>
                      ) : productImage ? (
                        <img
                          className="img-thumbnail"
                          style={{
                            width: "120px",
                            height: "80px",
                          }}
                          src={`/uploads/${productImage}`}
                          alt="product"
                        />
                      ) : null}

                      <div className="form-group">
                        <label className="text-secondary">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="text-secondary">Description</label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="productDesc"
                          value={productDesc}
                          onChange={(e) => setProductDesc(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label className="text-secondary">Price</label>
                        <input
                          type="text"
                          className="form-control"
                          name="productPrice"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="text-secondary">Category</label>
                          <select
                            className="custom-select mr-sm-2"
                            name="productCategory"
                            value={productCategory}
                            onChange={(e) => setProductCategory(e.target.value)}
                          >
                            <option value="">Choose one...</option>
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
                            onChange={(e) => setProductQty(e.target.value)}
                          />
                        </div>
                      </div>
                    </Fragment>
                  </div>
                  <div className="modal-footer">
                    <Link to="/admin/dashboard/">
                      <button className="btn btn-secondary">Close</button>
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-success text-white"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminEditProduct;
