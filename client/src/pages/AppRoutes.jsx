import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Home";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import Orders from "./Orders";
import Favourites from "./Favourites";
import About from "./About";

// Admin panel
import Admin from "./Admin";
import AdminProductList from "./Admin/ProductList";
import ProductUpdateForm from "./Admin/ProductUpdateForm";
import ProductCreateForm from "./Admin/ProductCreateForm";
import ProfileSettings from "./ProfileSettings";
import Completion from "./Orders/Completion";
import Payments from "./Payments";
import NotFound from "./NotFound";
import Preparing from "./Preparing";
import HelpCentre from "./HelpCentre";
import Reviews from "./Reviews";
import AdminReviewList from "./Admin/ReviewList";
import EmailNewsletterCreateForm from "./Admin/EmailNewsletterCreateForm";
import AdminEmailList from "./Admin/EmailList";
import DataProtection from "./DataProtection";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Domovska stranka */}
          <Route path="/" element={<Home />} />

          {/* Pro nenalezene stranky */}
          <Route path="*" element={<NotFound />} />

          <Route
            path="/vyprodej"
            element={<Preparing content="Zpět na hlavní stránku" link="/" />}
          />
          <Route
            path="/trendy"
            element={<Preparing content="Zpět na hlavní stránku" link="/" />}
          />
          <Route path="/centrum-pomoci" element={<HelpCentre />} />
          <Route path="/recenze" element={<Reviews />} />
          <Route path="/ochrana-osobnich-udaju" element={<DataProtection />} />

          {/* Admin panel */}
          <Route path="/admin/add-product" element={<ProductCreateForm />} />
          <Route
            path="/admin/update-product/:id"
            element={<ProductUpdateForm />}
          />
          <Route path="/admin/" element={<Admin />} />
          <Route path="/admin/product-list" element={<AdminProductList />} />
          <Route path="/admin/review-list" element={<AdminReviewList />} />
          <Route path="/admin/email-list" element={<AdminEmailList />} />
          <Route
            path="/admin/create-newsletter"
            element={<EmailNewsletterCreateForm />}
          />
          {/* Stranky pro produkty */}
          <Route
            path="/produkty"
            element={<ProductList name="Všechny produkty" category="" />}
          />

          <Route
            path="/produkty/boty"
            element={<ProductList name="Boty" category="boty" />}
          />
          <Route
            path="/produkty/mikiny"
            element={<ProductList name="Mikiny" category="mikiny" />}
          />
          <Route
            path="/produkty/tricka"
            element={<ProductList name="Trička" category="tricka" />}
          />
          <Route
            path="/produkty/bundy"
            element={<ProductList name="Bundy" category="bundy" />}
          />
          <Route
            path="/produkty/dziny"
            element={<ProductList name="Džíny" category="dziny" />}
          />
          <Route
            path="/produkty/kalhoty"
            element={<ProductList name="Kalhoty" category="kalhoty" />}
          />
          <Route
            path="/produkty/plavky"
            element={<ProductList name="Plavky" category="plavky" />}
          />
          <Route
            path="/produkty/svetry"
            element={<ProductList name="Svetry" category="svetry" />}
          />
          <Route
            path="/produkty/pradlo"
            element={<ProductList name="Prádlo" category="pradlo" />}
          />
          <Route
            path="/produkty/obleky"
            element={<ProductList name="Obleky" category="obleky" />}
          />
          <Route
            path="/produkty/smokingy"
            element={<ProductList name="Smokingy" category="smokingy" />}
          />
          <Route
            path="/produkty/kosile"
            element={<ProductList name="Košile" category="kosile" />}
          />
          <Route
            path="/produkty/kabaty"
            element={<ProductList name="Kabáty" category="kabaty" />}
          />

          <Route path="/product/:id" element={<ProductView />} />

          {/* Ostatni */}
          <Route path="/oblibene" element={<Favourites />} />
          <Route path="/objednavky" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/platby" element={<Payments />} />
          <Route path="/completion" element={<Completion />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
