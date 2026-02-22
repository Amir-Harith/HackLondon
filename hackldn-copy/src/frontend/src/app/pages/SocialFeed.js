import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Heart, MessageCircle, Share2, Send, Image as ImageIcon } from "lucide-react";
import { users, currentUser } from "../data/mockData";
import { Badge } from "../components/ui/badge";
const mockPosts = [
    {
        id: "post-1",
        author: users[0],
        content: "Just got back from a wonderful photography walk in Discovery Park! The cherry blossoms are starting to bloom. Anyone else enjoy nature photography? 🌸📷",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
        timestamp: new Date(2026, 1, 21, 9, 30),
        likes: 12,
        comments: 5,
        isLiked: true,
    },
    {
        id: "post-2",
        author: users[1],
        content: "Just finished knitting a scarf for my granddaughter's birthday! The pattern was challenging but so rewarding. Fellow knitters, what projects are you working on?",
        image: "https://images.unsplash.com/photo-1586339277861-99e4153fffb8?w=600",
        timestamp: new Date(2026, 1, 20, 15, 45),
        likes: 18,
        comments: 8,
        isLiked: false,
    },
    {
        id: "post-3",
        author: users[2],
        content: "Spotted a beautiful Blue Heron by the lake this morning during my walk. Nature never ceases to amaze me! 🦅",
        timestamp: new Date(2026, 1, 20, 8, 20),
        likes: 15,
        comments: 6,
        isLiked: true,
    },
    {
        id: "post-4",
        author: users[3],
        content: "My watercolor painting class is going wonderfully! Today we painted landscapes. It's never too late to learn something new. 🎨",
        image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600",
        timestamp: new Date(2026, 1, 19, 14, 10),
        likes: 22,
        comments: 10,
        isLiked: false,
    },
];
export function SocialFeed() {
    const [posts, setPosts] = useState(mockPosts);
    const [newPost, setNewPost] = useState("");
    const handleLike = (postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    isLiked: !post.isLiked,
                };
            }
            return post;
        }));
    };
    const handlePost = () => {
        if (newPost.trim()) {
            const post = {
                id: `post-${Date.now()}`,
                author: currentUser,
                content: newPost,
                timestamp: new Date(),
                likes: 0,
                comments: 0,
                isLiked: false,
            };
            setPosts([post, ...posts]);
            setNewPost("");
        }
    };
    return (_jsxs("div", { className: "p-8 max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl mb-2", children: "Social Feed" }), _jsx("p", { className: "text-xl text-gray-600", children: "Connect and share with your community" })] }), _jsxs(Card, { className: "mb-8", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Share an Update" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Textarea, { placeholder: "What's on your mind, Margaret?", value: newPost, onChange: (e) => setNewPost(e.target.value), className: "min-h-[120px] text-lg resize-none" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Button, { variant: "outline", size: "lg", children: [_jsx(ImageIcon, { className: "w-5 h-5 mr-2" }), "Add Photo"] }), _jsxs(Button, { onClick: handlePost, disabled: !newPost.trim(), size: "lg", className: "bg-amber-600 hover:bg-amber-700", children: [_jsx(Send, { className: "w-5 h-5 mr-2" }), "Post"] })] })] })] }), _jsx("div", { className: "space-y-6", children: posts.map((post) => (_jsx(Card, { children: _jsxs(CardContent, { className: "pt-6", children: [_jsxs("div", { className: "flex items-start gap-4 mb-4", children: [_jsx("img", { src: post.author.avatar, alt: post.author.name, className: "w-14 h-14 rounded-full object-cover" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-medium text-lg", children: post.author.name }), post.author.id === currentUser.id && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: "You" }))] }), _jsx("p", { className: "text-sm text-gray-600", children: post.author.location }), _jsxs("p", { className: "text-sm text-gray-500", children: [post.timestamp.toLocaleDateString(), " at ", post.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })] })] })] }), _jsx("p", { className: "text-base mb-4 leading-relaxed", children: post.content }), post.image && (_jsx("img", { src: post.image, alt: "Post content", className: "w-full rounded-lg mb-4 max-h-96 object-cover" })), _jsxs("div", { className: "flex items-center gap-1 pt-4 border-t", children: [_jsxs(Button, { variant: "ghost", size: "lg", onClick: () => handleLike(post.id), className: post.isLiked ? "text-rose-600" : "", children: [_jsx(Heart, { className: `w-5 h-5 mr-2 ${post.isLiked ? "fill-current" : ""}` }), post.likes, " ", post.likes === 1 ? 'Like' : 'Likes'] }), _jsxs(Button, { variant: "ghost", size: "lg", children: [_jsx(MessageCircle, { className: "w-5 h-5 mr-2" }), post.comments, " ", post.comments === 1 ? 'Comment' : 'Comments'] }), _jsxs(Button, { variant: "ghost", size: "lg", className: "ml-auto", children: [_jsx(Share2, { className: "w-5 h-5 mr-2" }), "Share"] })] })] }) }, post.id))) }), _jsxs(Card, { className: "mt-8", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "People You May Know" }), _jsx("p", { className: "text-sm text-gray-600", children: "Based on your interests" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: users.filter(u => !u.isConnected).map((user) => (_jsxs("div", { className: "flex items-start gap-4 p-4 bg-gray-50 rounded-lg", children: [_jsx("img", { src: user.avatar, alt: user.name, className: "w-16 h-16 rounded-full object-cover" }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-lg mb-1", children: user.name }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: user.location }), _jsx("div", { className: "flex flex-wrap gap-1 mb-3", children: user.interests.slice(0, 3).map((interest) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: interest }, interest))) }), _jsx("p", { className: "text-sm text-gray-700", children: user.bio })] }), _jsx(Button, { className: "bg-amber-600 hover:bg-amber-700", children: "Connect" })] }, user.id))) }) })] })] }));
}
//# sourceMappingURL=SocialFeed.js.map