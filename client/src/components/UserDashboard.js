import React, { useEffect } from "react";

import Card from "./Card";
import { useSelector } from "react-redux";
import { getProducts } from "../store/actions/productActions";
import { useDispatch } from "react-redux";

const UserDashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row mt-4">
        {products &&
          products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default UserDashboard;
