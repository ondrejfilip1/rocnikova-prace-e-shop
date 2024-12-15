import { useState, useEffect } from "react";
import { getAllProducts } from "../../models/Product";
import ProductLink from "./ProductLink";
import s from "./ProductList.module.css";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Filters from "./Filters";
import { X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { useLocation } from "react-router-dom";

import NotFound from "@/components/NotFound";

export default function ProductList() {
  const [products, setProducts] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [isSidebarOpened, setSidebarOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);

  const location = useLocation();

  const load = async (query = "") => {
    const data = await getAllProducts(query);
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setTotalProducts(data.payload.length);
      // console.log(data.payload.length);
      setProducts(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const queryParam = query.get("search");
    if (searchQuery) {
      load(searchQuery);
    } else if (queryParam) {
      setSearchQuery(query.get("search"));
      load(query.get("search"));
    } else {
      setSearchQuery("");
      load("");
    }
  }, [location.search, searchQuery]);

  if (!isLoaded && isLoaded !== null) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  return (
    <>
      <div className={s.background}>
        <Header onSearch={(query) => setSearchQuery(query)} />
        <div className="header-placeholder" />
        <SidebarProvider
          open={isSidebarOpened}
          onOpenChange={() => setSidebarOpened(!isSidebarOpened)}
        >
          <Sidebar className={s.card_background}>
            <SidebarContent className="text-red-900">
              <SidebarGroup>
                <div className="flex items-center justify-between">
                  <SidebarGroupLabel className="text-red-900">
                    Filtry
                  </SidebarGroupLabel>
                  <X
                    className="background-button-hover transition-colors rounded-md !p-1 !h-7 !w-7"
                    onClick={() => setSidebarOpened(false)}
                  />
                </div>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <Filters />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarTrigger content="Zobrazit filtry" />
          <div className="container mx-auto px-4">
            {isLoaded !== null && (
              <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6 mt-2">
                <span>Boty</span>
                <span className="rounded-full background-primary min-w-5 px-1.5 text-center text-sm text-primary-light">
                  {totalProducts}
                </span>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-6">
              {isLoaded === null && (
                <>
                  <NotFound link="/view-products" content="Zobrazit produkty" />
                </>
              )}
              {isLoaded !== null &&
                products.map((product, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/5 flex-shrink-0"
                  >
                    <ProductLink {...product} />
                  </div>
                ))}
            </div>
          </div>
        </SidebarProvider>
        <Toaster
          position="bottom-right"
          className="font-manrope"
          toastOptions={{
            unstyled: false,
            classNames: {
              toast: "background-primary-light border-red-900/20",
              title: "text-red-900",
              description: "text-red-900",
              actionButton:
                "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
              cancelButton:
                "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
              closeButton:
                "!text-red-900 !bg-transparent background-button-hover !p-1 !h-7 !w-7 !transition-colors",
            },
          }}
        />
      </div>
    </>
  );
}
