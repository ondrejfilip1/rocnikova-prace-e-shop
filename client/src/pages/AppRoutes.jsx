import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import ProductCreateForm from "./Admin/ProductCreateForm";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import ProductUpdateForm from "./Admin/ProductUpdateForm";
import Admin from "./Admin";
import Orders from "./Orders";
import Favourites from "./Favourites";
import About from "./About";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin/add-product" element={<ProductCreateForm />} />
          <Route path="/admin/update-product/:id" element={<ProductUpdateForm />} />
          <Route path="/admin/" element={<Admin />} />

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
          <Route path="/oblibene" element={<Favourites />} />
          <Route path="/objednavky" element={<Orders />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
