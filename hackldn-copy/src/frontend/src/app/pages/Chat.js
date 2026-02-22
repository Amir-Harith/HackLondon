import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Send, Phone, Video, Heart, ArrowLeft, Sparkles } from "lucide-react";
import { users, messages, currentUser } from "../data/mockData";
import { Badge } from "../components/ui/badge";
export function Chat() {
    const { userId } = useParams();
    const [messageText, setMessageText] = useState("");
    const [chatMessages, setChatMessages] = useState(userId ? messages[userId] || [] : []);
    const messagesEndRef = useRef(null);
    const otherUser = users.find(u => u.id === userId);
    const connectedUsers = users.filter(u => u.isConnected);
    useEffect(() => {
        if (userId && messages[userId]) {
            setChatMessages(messages[userId]);
        }
    }, [userId]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);
    const handleSend = () => {
        if (messageText.trim() && userId) {
            const newMessage = {
                id: `msg-${Date.now()}`,
                senderId: currentUser.id,
                receiverId: userId,
                content: messageText,
                timestamp: new Date(),
            };
            setChatMessages([...chatMessages, newMessage]);
            setMessageText("");
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    if (!userId || !otherUser) {
        return (_jsxs("div", { className: "p-8 max-w-6xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl mb-2", children: "Messages" }), _jsx("p", { className: "text-xl text-gray-600", children: "Stay in touch with your connections" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: connectedUsers.map((user) => (_jsx(Link, { to: `/chat/${user.id}`, children: _jsx(Card, { className: "hover:shadow-lg transition-shadow cursor-pointer", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: user.avatar, alt: user.name, className: "w-16 h-16 rounded-full object-cover" }), _jsx("div", { className: "absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-lg mb-1", children: user.name }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: user.location }), messages[user.id] && messages[user.id].length > 0 && (_jsx("p", { className: "text-sm text-gray-500 line-clamp-1", children: messages[user.id][messages[user.id].length - 1].content }))] })] }) }) }) }, user.id))) }), _jsxs(Card, { className: "mt-8", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "w-5 h-5 text-amber-600" }), "AI Happy Moments Detection"] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-gray-700 mb-4", children: "Our AI listens to your conversations and automatically detects when you're expressing happiness or joy. These special moments are saved to help you remember the good times." }), _jsx("div", { className: "bg-amber-50 border border-amber-200 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Heart, { className: "w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm mb-1", children: "What we detect:" }), _jsxs("ul", { className: "text-sm text-gray-700 space-y-1", children: [_jsx("li", { children: "\u2022 Expressions of joy and excitement" }), _jsx("li", { children: "\u2022 Laughter and positive emotions" }), _jsx("li", { children: "\u2022 Sharing good news" }), _jsx("li", { children: "\u2022 Warm exchanges with friends" })] })] })] }) })] })] })] }));
    }
    return (_jsxs("div", { className: "flex flex-col h-screen", children: [_jsx("div", { className: "bg-white border-b border-gray-200 p-4", children: _jsxs("div", { className: "max-w-6xl mx-auto flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Link, { to: "/chat", children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }) }), _jsxs(Link, { to: `/profile/${otherUser.id}`, className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: otherUser.avatar, alt: otherUser.name, className: "w-12 h-12 rounded-full object-cover" }), _jsx("div", { className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-medium", children: otherUser.name }), _jsx("p", { className: "text-sm text-gray-600", children: "Active now" })] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "icon", children: _jsx(Phone, { className: "w-5 h-5" }) }), _jsx(Button, { variant: "outline", size: "icon", children: _jsx(Video, { className: "w-5 h-5" }) })] })] }) }), _jsx("div", { className: "flex-1 overflow-y-auto bg-gray-50 p-4", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-4", children: [chatMessages.map((message) => {
                            const isCurrentUser = message.senderId === currentUser.id;
                            const sender = isCurrentUser ? currentUser : otherUser;
                            return (_jsxs("div", { className: `flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`, children: [_jsx("img", { src: sender.avatar, alt: sender.name, className: "w-10 h-10 rounded-full object-cover flex-shrink-0" }), _jsxs("div", { className: `flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-md`, children: [_jsxs("div", { className: `px-4 py-3 rounded-2xl ${isCurrentUser
                                                    ? 'bg-amber-600 text-white'
                                                    : 'bg-white border border-gray-200'}`, children: [_jsx("p", { className: "text-base", children: message.content }), message.isHappyMoment && (_jsxs("div", { className: `flex items-center gap-1 mt-2 pt-2 border-t ${isCurrentUser ? 'border-amber-700' : 'border-gray-200'}`, children: [_jsx(Heart, { className: `w-4 h-4 ${isCurrentUser ? 'text-amber-200' : 'text-rose-500'}` }), _jsx("span", { className: `text-xs ${isCurrentUser ? 'text-amber-200' : 'text-gray-600'}`, children: "Happy moment detected" })] }))] }), _jsx("span", { className: "text-xs text-gray-500 mt-1 px-2", children: message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] })] }, message.id));
                        }), _jsx("div", { ref: messagesEndRef })] }) }), _jsx("div", { className: "bg-white border-t border-gray-200 p-4", children: _jsxs("div", { className: "max-w-4xl mx-auto flex gap-3", children: [_jsx(Input, { placeholder: `Message ${otherUser.name}...`, value: messageText, onChange: (e) => setMessageText(e.target.value), onKeyPress: handleKeyPress, className: "flex-1 text-lg" }), _jsx(Button, { onClick: handleSend, disabled: !messageText.trim(), size: "lg", className: "bg-amber-600 hover:bg-amber-700", children: _jsx(Send, { className: "w-5 h-5" }) })] }) })] }));
}
//# sourceMappingURL=Chat.js.map