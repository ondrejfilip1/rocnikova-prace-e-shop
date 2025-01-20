import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import ProductCreateForm from "./ProductCreateForm";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import ProductUpdateForm from "./ProductUpdateForm";
import Search from "./Search";
import Orders from "./Orders";
import Checkout from "./Orders/Checkout";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<ProductCreateForm />} />

          { /* TODO: vsechny produkty */}
          <Route path="/view-products" element={<ProductList name="Všechny produkty" />} />

          <Route path="/view-products/boty" element={<ProductList name="Boty" />} />
          <Route path="/view-products/mikiny" element={<ProductList name="Mikiny" />} />
          <Route path="/view-products/tricka" element={<ProductList name="Trička" />} />
          <Route path="/view-products/bundy" element={<ProductList name="Mikiny" />} />
          <Route path="/view-products/dziny" element={<ProductList name="Džíny" />} />
          <Route path="/view-products/kalhoty" element={<ProductList name="Kalhoty" />} />
          <Route path="/view-products/teplaky" element={<ProductList name="Tepláky" />} />
          <Route path="/view-products/svetry" element={<ProductList name="Svetry" />} />
          <Route path="/view-products/pradlo" element={<ProductList name="Prádlo" />} />
          <Route path="/view-products/obleky" element={<ProductList name="Obleky" />} />
          <Route path="/view-products/smokingy" element={<ProductList name="Smokingy" />} />
          <Route path="/view-products/kosile" element={<ProductList name="Košile" />} />
          <Route path="/view-products/kabaty" element={<ProductList name="Kabáty" />} />

          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/update-product/:id" element={<ProductUpdateForm />} />
          <Route path="/search" element={<Search />} />
          <Route path="/objednavky" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
