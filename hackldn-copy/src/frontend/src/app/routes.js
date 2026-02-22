import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { VideoJournal } from "./pages/VideoJournal";
import { SocialFeed } from "./pages/SocialFeed";
import { Memories } from "./pages/Memories";
import { Profile } from "./pages/Profile";
import { Connections } from "./pages/Connections";
import { Chat } from "./pages/Chat";
import { Settings } from "./pages/Settings";
import { Layout } from "./components/Layout";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: Dashboard },
            { path: "journal", Component: VideoJournal },
            { path: "social", Component: SocialFeed },
            { path: "memories", Component: Memories },
            { path: "profile/:userId?", Component: Profile },
            { path: "connections", Component: Connections },
            { path: "chat/:userId?", Component: Chat },
            { path: "settings", Component: Settings },
        ],
    },
]);
//# sourceMappingURL=routes.js.map