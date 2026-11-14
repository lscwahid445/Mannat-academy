import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlayCircle, FileText, ArrowLeft } from 'lucide-react';
import { toEmbedUrl } from './helpers.js';
export default function Classroom({ courses, enrollments, currentUser, onOpenAuth }) {
    const { id } = useParams();
    const course = courses.find((c) => c.id === id);
    const [activeId, setActiveId] = useState(null);
    if (!currentUser) {
        return (React.createElement("div", { className: "mx-auto max-w-xl px-4 py-24 text-center" },
            React.createElement("p", { className: "text-xl font-bold text-slate-700" }, "\u0995\u09CD\u09B2\u09BE\u09B8 \u09A6\u09C7\u0996\u09A4\u09C7 \u09B2\u0997\u0987\u09A8 \u0995\u09B0\u09C1\u09A8"),
            React.createElement("button", { onClick: onOpenAuth, className: "mt-4 rounded-xl bg-brandOrange-500 px-6 py-2.5 font-bold text-white" }, "\u09B2\u0997\u0987\u09A8 / \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8")));
    }
    if (!course) {
        return (React.createElement("div", { className: "mx-auto max-w-xl px-4 py-24 text-center" },
            React.createElement("p", { className: "text-xl font-bold text-slate-700" }, "\u0995\u09CB\u09B0\u09CD\u09B8\u099F\u09BF \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964"),
            React.createElement(Link, { to: "/dashboard", className: "mt-4 inline-block font-bold text-leaf-600" }, "\u2190 \u0995\u09CD\u09B2\u09BE\u09B8\u09B0\u09C1\u09AE\u09C7 \u09AB\u09BF\u09B0\u09C1\u09A8")));
    }
    const approved = enrollments.some((e) => e.courseId === course.id && e.userPhone === currentUser.phone && e.status === 'approved');
    if (!approved) {
        return (React.createElement("div", { className: "mx-auto max-w-xl px-4 py-24 text-center" },
            React.createElement("p", { className: "text-xl font-bold text-slate-700" }, "\u098F\u0987 \u0995\u09CB\u09B0\u09CD\u09B8\u09C7\u09B0 \u0995\u09CD\u09B2\u09BE\u09B8 \u09A6\u09C7\u0996\u09A4\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 \u09AD\u09B0\u09CD\u09A4\u09BF \u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8\u0964"),
            React.createElement(Link, { to: `/course/${course.id}`, className: "mt-4 inline-block rounded-xl bg-brandOrange-500 px-6 py-2.5 font-bold text-white" }, "\u0995\u09CB\u09B0\u09CD\u09B8\u09C7\u09B0 \u09AA\u09C7\u099C\u09C7 \u09AF\u09BE\u09A8")));
    }
    const allLessons = course.modules.flatMap((m) => m.lessons);
    const active = allLessons.find((l) => l.id === activeId) || allLessons[0];
    const activeKey = active ? active.id : null;
    return (React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" },
        React.createElement(Link, { to: "/dashboard", className: "mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-leaf-700" },
            React.createElement(ArrowLeft, { className: "h-4 w-4" }),
            " \u0986\u09AE\u09BE\u09B0 \u0995\u09CD\u09B2\u09BE\u09B8\u09B0\u09C1\u09AE"),
        React.createElement("h1", { className: "mb-6 text-xl font-extrabold text-slate-900 sm:text-2xl" }, course.title),
        allLessons.length === 0 ? (React.createElement("p", { className: "rounded-xl bg-slate-50 p-8 text-center font-semibold text-slate-600" }, "\u098F\u0987 \u0995\u09CB\u09B0\u09CD\u09B8\u09C7 \u098F\u0996\u09A8\u09CB \u0995\u09CB\u09A8\u09CB \u0995\u09CD\u09B2\u09BE\u09B8 \u09AF\u09CB\u0997 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF\u0964")) : (React.createElement("div", { className: "grid gap-6 lg:grid-cols-12" },
            React.createElement("div", { className: "space-y-4 lg:col-span-8" },
                React.createElement("div", { className: "aspect-video overflow-hidden rounded-2xl bg-black shadow-md" }, active?.videoUrl ? (React.createElement("iframe", { key: activeKey, src: toEmbedUrl(active.videoUrl), title: active.title, className: "h-full w-full", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true })) : (React.createElement("div", { className: "flex h-full items-center justify-center text-slate-300" }, "\u09AD\u09BF\u09A1\u09BF\u0993 \u09AF\u09CB\u0997 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF"))),
                React.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3" },
                    React.createElement("h2", { className: "text-lg font-bold text-slate-900" }, active?.title),
                    active?.pdfNote && (React.createElement("a", { href: active.pdfNote, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 rounded-xl bg-brandOrange-500 px-4 py-2 text-sm font-bold text-white hover:bg-brandOrange-600" },
                        React.createElement(FileText, { className: "h-4 w-4" }),
                        " \u09AA\u09BF\u09A1\u09BF\u098F\u09AB \u09A8\u09CB\u099F")))),
            React.createElement("div", { className: "space-y-3 lg:col-span-4" }, course.modules.map((m) => (React.createElement("div", { key: m.id, className: "overflow-hidden rounded-xl border border-slate-200" },
                React.createElement("div", { className: "bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800" }, m.title),
                React.createElement("ul", { className: "divide-y divide-slate-100" }, m.lessons.map((l) => (React.createElement("li", { key: l.id },
                    React.createElement("button", { onClick: () => setActiveId(l.id), className: `flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors ${active?.id === l.id ? 'bg-leaf-50 font-bold text-leaf-700' : 'text-slate-700 hover:bg-slate-50'}` },
                        React.createElement(PlayCircle, { className: "h-4 w-4 shrink-0 text-brandOrange-500" }),
                        React.createElement("span", { className: "flex-1" }, l.title),
                        React.createElement("span", { className: "shrink-0 text-xs text-slate-500" }, l.duration))))))))))))));
}
