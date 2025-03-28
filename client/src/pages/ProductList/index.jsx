import { useState, useEffect } from "react";
import { getAllProducts } from "../../models/Product";
import ProductLink from "./ProductLink";
import s from "./ProductList.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Filters from "./Filters";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

import NotFound from "@/components/NotFound";
import { categoriesTranslated } from "@/components/constants";
import classNames from "classnames";

export default function ProductList(props) {
  const [products, setProducts] = useState();
  const [isLoaded, setLoaded] = useState(false);
  const [isSidebarOpened, setSidebarOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [favouritesIDs, setFavouritesIDs] = useState();
  const [pageNumber, setPageNumber] = useState();

  const location = useLocation();

  const load = async (
    query = "",
    queryCategory = "",
    queryBrand = "",
    queryMinPrice = "",
    queryMaxPrice = "",
    queryPage = ""
  ) => {
    // ziska produkty podle parametru
    // console.log(queryCategory);
    // console.log(query);
    if (props.category !== "") queryCategory = props.category;

    // data - produkty
    // data2 - oblibene polozky IDs
    const data = await getAllProducts(
      query,
      queryCategory,
      queryBrand,
      queryMinPrice,
      queryMaxPrice,
      queryPage
    );
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites && favourites.length > 0) setFavouritesIDs(favourites);
    if (data.status === 404 || data.status === 500) return setLoaded(null);
    if (data.status === 200) {
      setTotalProducts(data.payload.length);
      document.title = props.category
        ? `Pigress - ${categoriesTranslated[props.category]}`
        : `Pigress - Všechny produkty`;
      // console.log(data.payload.length);
      setProducts(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    // varovani - cinsky kod
    // TODO: strasne moc ifu - opravit
    const query = new URLSearchParams(location.search);
    const queryParam = query.get("search") || "";
    const queryParam2 = query.get("category") || "";
    const queryParam3 = query.get("brand") || "";
    const queryParam4 = query.get("minprice") || "";
    const queryParam5 = query.get("maxprice") || "";
    const queryParam6 = query.get("page") || "";
    setPageNumber(queryParam6);
    if (
      searchQuery ||
      queryParam2 ||
      queryParam3 ||
      queryParam4 ||
      queryParam5 ||
      queryParam6
    ) {
      if (searchQuery)
        load(
          searchQuery,
          queryParam2,
          queryParam3,
          queryParam4,
          queryParam5,
          queryParam6
        );
      else
        load(
          queryParam,
          queryParam2,
          queryParam3,
          queryParam4,
          queryParam5,
          queryParam6
        );
    } else if (queryParam) {
      setSearchQuery(query.get("search"));
      load(
        query.get("search"),
        queryParam2,
        queryParam3,
        queryParam4,
        queryParam5,
        queryParam6
      );
    } else {
      setSearchQuery("");
      load("", "");
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
      <div className="background pb-[1px]">
        <Header onSearch={(query) => setSearchQuery(query)} />
        <div className="mt-3.5" />
        <SidebarProvider
          open={isSidebarOpened}
          onOpenChange={() => setSidebarOpened(!isSidebarOpened)}
        >
          <Sidebar className={s.card_background}>
            <SidebarContent
              className={classNames(
                "text-red-900",
                s.background_primary_light_breakpoint
              )}
            >
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
                    <Filters category={props.category} />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarTrigger content="Zobrazit filtry" />
          <div className="container mx-auto px-4">
            {isLoaded !== null && (
              <div className="text-red-900 text-2xl flex items-center gap-2 justify-center mb-6 mt-2">
                <span>{props.name}</span>
                <span className="rounded-full background-primary min-w-5 px-1.5 text-center text-sm text-primary-light">
                  {totalProducts}
                </span>
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-6">
              {isLoaded === null && (
                <NotFound
                  link={`/produkty/${props.category}`}
                  content="Zobrazit produkty"
                  description="Produkty nebyly nalezeny"
                />
              )}
              {isLoaded !== null &&
                products.map((product, index) => (
                  <div
                    key={index}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/5 flex-shrink-0"
                  >
                    <ProductLink {...product} favouritesIDs={favouritesIDs} />
                  </div>
                ))}
            </div>
            {isLoaded !== null && pageNumber && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <Link
                  to={
                    location.pathname +
                    location.search.replace(
                      `page=${parseInt(pageNumber)}`,
                      `page=${parseInt(pageNumber) - 1}`
                    )
                  }
                  className={
                    parseInt(pageNumber) === 1 ? "pointer-events-none" : ""
                  }
                >
                  <Button
                    variant="ghost"
                    className="background-button-hover !text-red-900 gap-1 pl-3"
                    disabled={parseInt(pageNumber) === 1 ? true : false}
                  >
                    <ChevronLeft />
                    Předchozí
                  </Button>
                </Link>
                <div className="rounded-md text-sm font-medium px-4 py-2 text-red-900">
                  {parseInt(pageNumber)}
                </div>
                <Link
                  to={
                    location.pathname +
                    location.search.replace(
                      `page=${parseInt(pageNumber)}`,
                      `page=${parseInt(pageNumber) + 1}`
                    )
                  }
                  className={totalProducts < 32 ? "pointer-events-none" : ""}
                >
                  <Button
                    variant="ghost"
                    className="background-button-hover !text-red-900 gap-1 pr-3"
                    disabled={totalProducts < 32 ? true : false}
                  >
                    Další
                    <ChevronRight />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </SidebarProvider>
        <Footer />
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
