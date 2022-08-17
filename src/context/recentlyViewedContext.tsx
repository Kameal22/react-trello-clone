import React, { createContext, useContext, useState } from "react";
import { RecentlyViewedInterface } from "../interfaces/RecentlyViewedInterface";

export const RecentlyViewedContext = createContext<RecentlyViewedInterface[]>(
  []
);

export const SetRWContext = createContext<
  React.Dispatch<React.SetStateAction<RecentlyViewedInterface[]>> | undefined
>(undefined);

export const useSetRW = () => {
  const setRW = useContext(SetRWContext);

  if (!setRW) {
    throw new Error("Called outside setRW provider");
  }
  return setRW;
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
