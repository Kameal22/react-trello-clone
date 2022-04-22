import "../../styles/navStyles/navSearch.css";
import { useState } from "react";

const NavSearchBar: React.FC = () => {
  const [searchingValue, setSearchingValue] = useState<string>("");

  return (
    <div className="navSearchBarDiv">
      <form autoComplete="off">
        <input
          className="navSearchInput"
          placeholder="Search"
          type="text"
          name="search"
        ></input>
        <i id="navSearchIcon" className="bi bi-search"></i>
      </form>
    </div>
  );
};

export default NavSearchBar;
