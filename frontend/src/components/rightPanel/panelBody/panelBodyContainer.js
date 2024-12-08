import React from "react";
import HeaderFilters from "./headerFilters/headerFilters";
import Category from "./categories/category";
export default function panelBodyContainer() {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeaderFilters />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Category />
      </div>
    </>
  );
}
