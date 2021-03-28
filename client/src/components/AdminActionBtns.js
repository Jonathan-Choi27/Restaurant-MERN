import React from "react";

const AdminActionBtns = () => (
  <div className="container">
    <div className="container">
      <div className="row pb-3">
        <div className="col-md-3 my-1">
          <button
            className="btn btn-primary btn-block"
            data-bs-toggle="modal"
            data-bs-target="#addCategoryModal"
          >
            Add Category
          </button>
        </div>
        <div className="col-md-5 my-1">
          <button
            className="btn btn-warning btn-block"
            data-bs-toggle="modal"
            data-bs-target="#addFoodModal"
          >
            Add Food
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default AdminActionBtns;
