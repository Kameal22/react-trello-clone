import "../../styles/boardStyles/boardStyles.css"
import Nav from "../nav/Nav"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { addRecentlyViewed } from "../../redux/features/recentlyViewedSlice";

const Board: React.FC = () => {
    const [createWorkspacePopUp, setCreateWorkspacePopUp] =
        useState<boolean>(false);

    const { workspaceId, boardId } = useParams();

    useEffect(() => {
        if (shownBoard)
            addRecentlyViewed(shownBoard)
    }, [])

    const workspaces = useSelector(
        (state: RootState) => state.workspace.workspace
    );

    const recents = useSelector(
        (state: RootState) => state.recents.recentlyViewed
    );

    const shownWorkspace = workspaces.find((workspace) => {
        return workspace.workspaceId === workspaceId;
    });

    const shownBoard = shownWorkspace?.workspaceBoards.find((board) => {
        return board.boardId === boardId
    })

    const showWorkspaceCreation = () => {
        setCreateWorkspacePopUp(!createWorkspacePopUp);
    };

    console.log(recents)

    return (
        <div style={{ backgroundColor: `${shownBoard?.boardBackground}` }} className="boardDiv">
            <Nav showCreateWorkspace={showWorkspaceCreation} />
            <h1>{shownBoard?.boardName}</h1>
        </div>
    )
}

export default Board