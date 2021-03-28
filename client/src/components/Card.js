import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";

// Redux
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/actions/productActions";

const Card = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="col-md-4 my-3">
      <div className="card h-100">
        <Link to="#!">
          <img
            src={`/uploads/${product.fileName}`}
            alt="product"
            className="card-img-top img-responsive w-100"
          />
        </Link>

        <div className="card-body text-center ">
          <h5>{product.productName}</h5>
          <hr />
          <h6 className="mb-3">
            <span className="text-secondary mr-2">
              {product.productPrice.toLocaleString("en-AU", {
                style: "currency",
                currency: "AUD",
              })}
            </span>
          </h6>
          <p>
            {product.productDesc.length > 60
              ? product.productDesc.substring(0, 60) + "..."
              : product.productDesc.substring(0, 60)}
          </p>
          {isAuthenticated() && isAuthenticated().role === 1 && (
            <Fragment>
              <Link
                to={`/admin/edit/product/${product._id}`}
                type="button"
                className="btn btn-secondary btn-sm mr-1 my-1 mx-2"
              >
                <i className="bi bi-pencil-square"></i>
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => dispatch(deleteProduct(product._id))}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
