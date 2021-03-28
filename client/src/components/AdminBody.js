import React from "react";

import Card from "./Card";

// Redux
import { useSelector } from "react-redux";

const AdminBody = () => {
  const { products } = useSelector((state) => state.products);

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

export default AdminBody;
