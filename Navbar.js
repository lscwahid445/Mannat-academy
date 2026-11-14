import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ShieldCheck, Menu, X, GraduationCap, LogOut } from 'lucide-react';
export default function Navbar({ currentUser, onOpenAuth, onLogout }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (React.createElement("header", { className: "sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm" },
        React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
            React.createElement("div", { className: "flex justify-between items-center h-20" },
                React.createElement(Link, { to: "/", className: "flex items-center gap-3 group" },
                    React.createElement("div", { className: "w-11 h-11 rounded-xl bg-gradient-to-br from-leaf-600 to-leaf-500 flex items-center justify-center text-white shadow-md shadow-leaf-500/20 group-hover:scale-105 transition-transform" },
                        React.createElement(GraduationCap, { className: "w-6 h-6" })),
                    React.createElement("div", null,
                        React.createElement("span", { className: "block text-lg sm:text-xl font-bold text-slate-900 leading-tight" },
                            "Mannat ",
                            React.createElement("span", { className: "text-leaf-600" }, "Academy")),
                        React.createElement("span", { className: "block text-xs font-semibold text-brandOrange-600 tracking-wide" }, "& Skill Development"))),
                React.createElement("nav", { className: "hidden md:flex items-center gap-6" },
                    React.createElement(Link, { to: "/", className: `text-base font-semibold transition-colors ${isActive('/') ? 'text-leaf-600' : 'text-slate-700 hover:text-leaf-600'}` }, "\u09B8\u0995\u09B2 \u0995\u09CB\u09B0\u09CD\u09B8"),
                    currentUser && (React.createElement(Link, { to: "/dashboard", className: `flex items-center gap-1.5 text-base font-semibold transition-colors ${isActive('/dashboard') ? 'text-leaf-600' : 'text-slate-700 hover:text-leaf-600'}` },
                        React.createElement(BookOpen, { className: "w-4 h-4 text-brandOrange-500" }),
                        "\u0986\u09AE\u09BE\u09B0 \u0995\u09CD\u09B2\u09BE\u09B8\u09B0\u09C1\u09AE")),
                    React.createElement(Link, { to: "/admin", className: `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all ${isActive('/admin')
                            ? 'bg-leaf-50 text-leaf-700 border-leaf-300'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-leaf-400 hover:text-leaf-700'}` },
                        React.createElement(ShieldCheck, { className: "w-4 h-4 text-leaf-600" }),
                        "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u09AA\u09CD\u09AF\u09BE\u09A8\u09C7\u09B2")),
                React.createElement("div", { className: "hidden md:flex items-center gap-3" }, currentUser ? (React.createElement("div", { className: "flex items-center gap-3" },
                    React.createElement("div", { className: "text-right" },
                        React.createElement("p", { className: "text-sm font-bold text-slate-800" }, currentUser.name),
                        React.createElement("p", { className: "text-xs text-leaf-600 font-medium" }, currentUser.phone)),
                    React.createElement("button", { onClick: onLogout, title: "\u09B2\u0997\u0986\u0989\u099F", className: "p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" },
                        React.createElement(LogOut, { className: "w-4 h-4" })))) : (React.createElement("button", { onClick: onOpenAuth, className: "px-5 py-2.5 rounded-xl bg-brandOrange-500 hover:bg-brandOrange-600 text-white font-bold text-sm shadow-md shadow-brandOrange-500/25 transition-all" }, "\u09B2\u0997\u0987\u09A8 / \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8"))),
                React.createElement("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100" }, mobileMenuOpen ? React.createElement(X, { className: "w-6 h-6" }) : React.createElement(Menu, { className: "w-6 h-6" })))),
        mobileMenuOpen && (React.createElement("div", { className: "md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-3 shadow-lg" },
            React.createElement(Link, { to: "/", onClick: () => setMobileMenuOpen(false), className: "block py-2 text-base font-semibold text-slate-800 hover:text-leaf-600" }, "\u09B8\u0995\u09B2 \u0995\u09CB\u09B0\u09CD\u09B8"),
            currentUser && (React.createElement(Link, { to: "/dashboard", onClick: () => setMobileMenuOpen(false), className: "block py-2 text-base font-semibold text-leaf-600" }, "\u0986\u09AE\u09BE\u09B0 \u0995\u09CD\u09B2\u09BE\u09B8\u09B0\u09C1\u09AE (My Courses)")),
            React.createElement(Link, { to: "/admin", onClick: () => setMobileMenuOpen(false), className: "block py-2 text-base font-semibold text-slate-800 hover:text-leaf-600" }, "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u09AA\u09CD\u09AF\u09BE\u09A8\u09C7\u09B2 (\u0995\u09CB\u09B0\u09CD\u09B8 \u0993 \u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F \u09AE\u09CD\u09AF\u09BE\u09A8\u09C7\u099C\u09AE\u09C7\u09A8\u09CD\u099F)"),
            React.createElement("div", { className: "pt-2 border-t border-slate-100" }, currentUser ? (React.createElement("button", { onClick: () => {
                    onLogout();
                    setMobileMenuOpen(false);
                }, className: "w-full py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm" },
                "\u09B2\u0997\u0986\u0989\u099F (",
                currentUser.name,
                ")")) : (React.createElement("button", { onClick: () => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                }, className: "w-full py-2.5 rounded-xl bg-brandOrange-500 text-white font-bold text-sm" }, "\u09B2\u0997\u0987\u09A8 / \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8")))))));
}
