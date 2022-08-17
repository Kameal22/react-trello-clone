import React, { createContext, useContext, useState } from "react";
import { BoardInterface } from "../interfaces/WorkspaceInterface";

interface RecentlyViewedInterface {
  recentlyViewed: BoardInterface[];
}

export const RecentlyViewedContext = createContext<RecentlyViewedInterface[]>(
  []
);

export const SetRWContext = createContext<
  React.Dispatch<React.SetStateAction<RecentlyViewedInterface[]>> | undefined
>(undefined);

export const useSetRW = () => {
  const setLW = useContext(SetRWContext);

  if (!setLW) {
    throw new Error("Called outside setRW provider");
  }
  return setLW;
};

export const RWProvider: React.FC = ({ children }) => {
  const [recentlyWatched, setRecentlyWatched] = useState<
    RecentlyViewedInterface[]
  >([]);

  return (
    <RecentlyViewedContext.Provider value={recentlyWatched}>
      <SetRWContext.Provider value={setRecentlyWatched}>
        {children}
      </SetRWContext.Provider>
    </RecentlyViewedContext.Provider>
  );
};
