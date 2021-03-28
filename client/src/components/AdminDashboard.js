import React, { useEffect } from "react";

// Components
import AdminActionBtns from "./AdminActionBtns";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminProductModal from "./AdminProductModal";
import AdminBody from "./AdminBody";

// Redux
import { useDispatch } from "react-redux";
import { getCategories } from "../store/actions/categoryActions";
import { getProducts } from "../store/actions/productActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section>
      <AdminActionBtns />
      <AdminCategoryModal />
      <AdminProductModal />
      <AdminBody />
    </section>
  );
};

export default AdminDashboard;
