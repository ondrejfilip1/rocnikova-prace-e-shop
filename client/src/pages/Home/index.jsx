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
