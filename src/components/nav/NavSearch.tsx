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

    setSearching(true);

    if (!searchingValue) {
      setSearching(false);
    }

    const filtered = boards.filter((board) => {
      return board.name.toLowerCase().includes(searchingValue.toLowerCase());
    });

    setFilteredData(filtered);
  };

  return (
    <div className="navSearchBarDiv">
      <form autoComplete="off">
        <input
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
                  className="searchingLink"
                  key={data.boardId}
                  to={`/board/${data.workspaceId}/${data.boardId}`}
                >
                  <div className="searchHintDiv">
                    <div
                      className="searchHintColorDiv"
                      style={{ background: `${data.background}` }}
                    ></div>
                    <p className="searchHint">{data.name} <span>board</span></p>
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
