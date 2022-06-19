import "../../styles/workspaceStyles/searchForBoards.css";
import { BoardInterface } from "../../interfaces/WorkspaceInterface";

interface SearchForBoardsInterface {
  showSearchedBoards: (searchingValue: string) => void;
  setBoardsBackToInitial: (initialBoards: BoardInterface[] | undefined) => void;
  initialBoards: BoardInterface[] | undefined;
}

const SearchForBoards: React.FC<SearchForBoardsInterface> = (props) => {

  const handleSearchValueChange = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    let searchingValue = e.currentTarget.value;

    if (searchingValue) {
      props.showSearchedBoards(searchingValue);
    } else {
      props.setBoardsBackToInitial(props.initialBoards);
    }
  };

  return (
    <div className="searchBoardsDiv">
      {props.initialBoards?.length ? (
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
