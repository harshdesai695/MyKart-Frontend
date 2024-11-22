import React from "react";
import "./Custominputs.css";
import { SearchIcon } from "./SvgComponents";

export const SearchInput = () => {
  return (
    <div className="SearchGroup">
      <SearchIcon />
      <input placeholder="Search Product" type="search" className="input" />
    </div>
  );
};
