import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
const STATUS = {
    approved: { label: 'অনুমোদিত', cls: 'bg-leaf-50 text-leaf-700 border-leaf-200' },
    pending: { label: 'যাচাই চলছে', cls: 'bg-brandOrange-50 text-brandOrange-700 border-brandOrange-200' },
    rejected: { label: 'বাতিল', cls: 'bg-red-50 text-red-600 border-red-200' },
};
export default function Dashboard({ courses, enrollments, currentUser, onOpenAuth }) {
    if (!currentUser) {
        return (React.createElement("div", { className: "mx-auto max-w-xl px-4 py-24 text-center" },
            React.createElement("p", { className: "text-xl font-bold text-slate-700" }, "\u0995\u09CD\u09B2\u09BE\u09B8\u09B0\u09C1\u09AE \u09A6\u09C7\u0996\u09A4\u09C7 \u09B2\u0997\u0987\u09A8 \u0995\u09B0\u09C1\u09A8"),
            React.createElement("button", { onClick: onOpenAuth, className: "mt-4 rounded-xl bg-brandOrange-500 px-6 py-2.5 font-bold text-white" }, "\u09B2\u0997\u0987\u09A8 / \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8")));
    }
    const mine = enrollments
        .filter((e) => e.userPhone === currentUser.phone)
        .map((e) => ({ enrollment: e, course: courses.find((c) => c.id === e.courseId) }))
        .filter((x) => x.course);
    return (React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" },
        React.createElement("h1", { className: "text-2xl font-extrabold text-slate-900 sm:text-3xl" },
            "\u0986\u09AE\u09BE\u09B0 ",
            React.createElement("span", { className: "text-brandOrange-500" }, "\u0995\u09CD\u09B2\u09BE\u09B8\u09B0\u09C1\u09AE")),
        React.createElement("p", { className: "mt-1 text-sm text-slate-600" },
            "\u09B8\u09CD\u09AC\u09BE\u0997\u09A4\u09AE, ",
            currentUser.name),
        mine.length === 0 ? (React.createElement("div", { className: "mt-8 rounded-2xl border border-slate-200 bg-slate-50 py-16 text-center" },
            React.createElement(BookOpen, { className: "mx-auto mb-3 h-10 w-10 text-slate-400" }),
            React.createElement("p", { className: "font-bold text-slate-700" }, "\u0986\u09AA\u09A8\u09BF \u098F\u0996\u09A8\u09CB \u0995\u09CB\u09A8\u09CB \u0995\u09CB\u09B0\u09CD\u09B8\u09C7 \u09AD\u09B0\u09CD\u09A4\u09BF \u09B9\u09A8\u09A8\u09BF"),
            React.createElement(Link, { to: "/", className: "mt-4 inline-block rounded-xl bg-brandOrange-500 px-5 py-2.5 text-sm font-bold text-white" }, "\u0995\u09CB\u09B0\u09CD\u09B8 \u09A6\u09C7\u0996\u09C1\u09A8"))) : (React.createElement("div", { className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" }, mine.map(({ enrollment, course }) => {
            const st = STATUS[enrollment.status] || STATUS.pending;
            return (React.createElement("div", { key: enrollment.id, className: "flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" },
                React.createElement("img", { src: course.thumbnail, alt: course.title, className: "h-40 w-full object-cover" }),
                React.createElement("div", { className: "flex flex-1 flex-col p-5" },
                    React.createElement("span", { className: `mb-2 w-fit rounded-full border px-3 py-0.5 text-xs font-bold ${st.cls}` }, st.label),
                    React.createElement("h3", { className: "mb-4 flex-1 text-lg font-bold text-slate-900" }, course.title),
                    enrollment.status === 'approved' ? (React.createElement(Link, { to: `/classroom/${course.id}`, className: "rounded-xl bg-leaf-600 py-2.5 text-center text-sm font-bold text-white hover:bg-leaf-700" }, "\u0995\u09CD\u09B2\u09BE\u09B8 \u0995\u09B0\u09C1\u09A8")) : (React.createElement(Link, { to: `/course/${course.id}`, className: "rounded-xl bg-slate-900 py-2.5 text-center text-sm font-bold text-white hover:bg-brandOrange-500" }, "\u09AC\u09BF\u09B8\u09CD\u09A4\u09BE\u09B0\u09BF\u09A4 \u09A6\u09C7\u0996\u09C1\u09A8")))));
        })))));
}
