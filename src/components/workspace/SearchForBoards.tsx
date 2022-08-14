import "../../styles/workspaceStyles/searchForBoards.css";
import { BoardInterface } from "../../interfaces/WorkspaceInterface";

interface SearchForBoardsInterface {
  boards: BoardInterface[] | undefined
  showSearchedBoards: (searchingValue: string) => void;
}

const SearchForBoards: React.FC<SearchForBoardsInterface> = ({
  showSearchedBoards,
  boards
}) => {
  const handleSearchValueChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    let searchingValue = e.currentTarget.value;
    showSearchedBoards(searchingValue);
  };

  return (
    <div className="searchBoardsDiv">
      {boards?.length ? (
        <form autoComplete="off">
          <input
            onChange={handleSearchValueChange}
            className="searchBoardsInput"
            placeholder="Search for boards.."
            type="text"
            name="search"
          ></input>
        </form>
      ) : null}
    </div>
  );
};

export default SearchForBoards;
