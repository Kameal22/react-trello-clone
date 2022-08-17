import { RecentlyViewedInterface } from "../interfaces/RecentlyViewedInterface";

export const handleSetRecentlyViewed = (recents: RecentlyViewedInterface[], name: string | undefined, background: string | undefined, workspace: string | undefined, id: string | undefined, setRecentlyViewed: React.Dispatch<React.SetStateAction<RecentlyViewedInterface[]>>) => {
    if (!recents.some((boards) => boards.name === name)) {
        if (recents.length <= 3) {
            setRecentlyViewed(rw => (
                [...rw, { name: name, background: background, workspace: workspace, id: id }]
            ))
        } else {
            recents.pop();
            setRecentlyViewed(rw => (
                [{ name: name, background: background, workspace: workspace, id: id }, ...rw]
            ))
        }
    }
}