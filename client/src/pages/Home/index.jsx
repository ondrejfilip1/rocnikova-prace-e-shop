import { Link } from "react-router-dom";
import s from "./Home.module.css";
import Header from "@/components/Header";

import React from "react";

export default function Home() {
  return (
    <>
      <div className={s.background}>
        <Header />
        <div className={s.heading_container}>
          <div className={s.heading}>
            <div>PIGRESS</div>
            <h1>PIGRESS</h1>
            <h1>PIGRESS</h1>
          </div>
        </div>
        {/*
                  <div className="min-h-screen" />
        <div className="min-h-screen flex items-center justify-between container mx-auto gap-10">
          <div className="aspect-square rounded-lg border border-transparent w-1/2 bg-red-200" />
          <div className="aspect-square rounded-lg border border-transparent w-1/2 bg-red-200"> </div>
        </div>
        */}

        {/*
        <Link to={"/add-car"}>
            <p>Add car</p>
        </Link>

        <Link to={"/view-cars"}>
            <p>View car</p>
        </Link>
        */}
      </div>
    </>
  );
}
