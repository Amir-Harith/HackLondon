import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, Link, useLocation } from "react-router";
import { Home, Video, Users, Brain, MessageCircle, User, Settings } from "lucide-react";
import { cn } from "./ui/utils";
const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Video Journal", href: "/journal", icon: Video },
    { name: "Social Feed", href: "/social", icon: Users },
    { name: "Memories", href: "/memories", icon: Brain },
    { name: "Connections", href: "/connections", icon: MessageCircle },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
];
export function Layout() {
    const location = useLocation();
    return (_jsxs("div", { className: "flex h-screen bg-gray-50", children: [_jsxs("aside", { className: "w-72 bg-white border-r border-gray-200 flex flex-col", children: [_jsxs("div", { className: "p-6 border-b border-gray-200", children: [_jsx("h1", { className: "text-3xl font-serif text-amber-600", children: "The Golden Years" }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: "Stay connected, remember together" })] }), _jsx("nav", { className: "flex-1 p-4 space-y-1", children: navigation.map((item) => {
                            const isActive = location.pathname === item.href ||
                                (item.href !== "/" && location.pathname.startsWith(item.href));
                            return (_jsxs(Link, { to: item.href, className: cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-lg", isActive
                                    ? "bg-amber-50 text-amber-700"
                                    : "text-gray-700 hover:bg-gray-50"), children: [_jsx(item.icon, { className: "w-6 h-6" }), item.name] }, item.name));
                        }) }), _jsx("div", { className: "p-4 border-t border-gray-200", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400", alt: "Margaret Thompson", className: "w-12 h-12 rounded-full object-cover" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Margaret Thompson" }), _jsx("p", { className: "text-sm text-gray-600", children: "Portland, OR" })] })] }) })] }), _jsx("main", { className: "flex-1 overflow-auto", children: _jsx(Outlet, {}) })] }));
}
//# sourceMappingURL=Layout.js.map