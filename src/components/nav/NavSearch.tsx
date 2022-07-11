import "../../styles/navStyles/navSearch.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { Link } from "react-router-dom";

interface SearchedData {
  name: string;
  background: string;
  workspaceId: string;
  boardId: string;
}

const NavSearchBar: React.FC = () => {
  const [boards, setBoards] = useState<SearchedData[]>([]);
  const [filteredData, setFilteredData] = useState<SearchedData[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [enteredValue, setEnteredValue] = useState<string>("");

  const [mobileSearchForm, setMobileSearchForm] = useState<boolean>(false)

  const workspaces = useSelector(
    (state: RootState) => state.workspace.workspace
  );

  useEffect(() => {
    const tempBoards: SearchedData[] = [];

    workspaces.forEach((board) => {
      board.workspaceBoards.forEach((boardData) => {
        tempBoards.push({
          name: boardData.boardName,
          background: boardData.boardBackground,
          workspaceId: boardData.boardWorkspace,
          boardId: boardData.boardId,
        });
      });
    });

    setBoards(tempBoards);
  }, [workspaces]);

  const handleSearchValueChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    let searchingValue = e.currentTarget.value;
    setEnteredValue(searchingValue);

    setSearching(true);

    if (!searchingValue) {
      setSearching(false);
    }

    const filtered = boards.filter((board) => {
      return board.name.toLowerCase().includes(searchingValue.toLowerCase());
    });

    setFilteredData(filtered);
  };

  const clearInput = () => {
    setSearching(false);
    setEnteredValue("");
  };

  return (
    <div className="navSearchBarDiv">
      <div onClick={() => setMobileSearchForm(!mobileSearchForm)} className="mobileSearch">
        <h4>Search</h4>
        <i className="bi bi-chevron-down"></i>
      </div>
      <form style={!mobileSearchForm ? { display: "flex" } : { display: "none" }} className="navigationSearchForm" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <input
          value={enteredValue}
          onChange={handleSearchValueChange}
          className="navSearchInput"
          placeholder="Search.."
          type="text"
          name="search"
        ></input>
        <i id="navSearchIcon" className="bi bi-search"></i>
      </form>

      {searching ? (
        <div className="searchHints">
          {filteredData.length === 0 ? (
            <p className="searchHint">No matching data</p>
          ) : (
            filteredData.map((data) => {
              return (
                <Link
                  onClick={() => clearInput()}
                  className="searchingLink"
                  key={data.boardId}
                  to={`/board/${data.workspaceId}/${data.boardId}`}
                >
                  <div className="searchHintDiv">
                    <div
                      className="searchHintColorDiv"
                      style={{ background: `${data.background}` }}
                    ></div>
                    <p className="searchHint">
                      {data.name} <span>board</span>
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      ) : null}
    </div>
  );
};

export default NavSearchBar;
