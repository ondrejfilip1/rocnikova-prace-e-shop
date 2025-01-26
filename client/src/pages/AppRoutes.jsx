import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import ProductCreateForm from "./ProductCreateForm";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import ProductUpdateForm from "./ProductUpdateForm";
import Search from "./Search";
import Orders from "./Orders";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<ProductCreateForm />} />

          {/* TODO: vsechny produkty */}
          <Route
            path="/view-products"
            element={<ProductList name="Všechny produkty" category="" />}
          />

          <Route
            path="/view-products/boty"
            element={<ProductList name="Boty" category="boty" />}
          />
          <Route
            path="/view-products/mikiny"
            element={<ProductList name="Mikiny" category="mikiny" />}
          />
          <Route
            path="/view-products/tricka"
            element={<ProductList name="Trička" category="tricka" />}
          />
          <Route
            path="/view-products/bundy"
            element={<ProductList name="Bundy" category="bundy" />}
          />
          <Route
            path="/view-products/dziny"
            element={<ProductList name="Džíny" category="dziny" />}
          />
          <Route
            path="/view-products/kalhoty"
            element={<ProductList name="Kalhoty" category="kalhoty" />}
          />
          <Route
            path="/view-products/teplaky"
            element={<ProductList name="Tepláky" category="teplaky" />}
          />
          <Route
            path="/view-products/svetry"
            element={<ProductList name="Svetry" category="svetry" />}
          />
          <Route
            path="/view-products/pradlo"
            element={<ProductList name="Prádlo" category="pradlo" />}
          />
          <Route
            path="/view-products/obleky"
            element={<ProductList name="Obleky" category="obleky" />}
          />
          <Route
            path="/view-products/smokingy"
            element={<ProductList name="Smokingy" category="smokingy" />}
          />
          <Route
            path="/view-products/kosile"
            element={<ProductList name="Košile" category="kosile" />}
          />
          <Route
            path="/view-products/kabaty"
            element={<ProductList name="Kabáty" category="kabaty" />}
          />

          <Route path="/product/:id" element={<ProductView />} />
          <Route path="/update-product/:id" element={<ProductUpdateForm />} />
          <Route path="/search" element={<Search />} />
          <Route path="/objednavky" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
