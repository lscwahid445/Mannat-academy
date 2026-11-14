import React, { useState } from 'react';
import { CATEGORIES } from './initialData.js';
import CourseCard from './CourseCard.js';
import { Sparkles, CheckCircle, Search, Award, Users, BookOpen } from 'lucide-react';
export default function Home({ courses, enrollments, currentUser }) {
    const [selectedCategory, setSelectedCategory] = useState("সকল কোর্স");
    const [searchQuery, setSearchQuery] = useState("");
    const filteredCourses = courses.filter((course) => {
        const matchesCategory = selectedCategory === "সকল কোর্স" || course.category === selectedCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    const getEnrollmentStatus = (courseId) => {
        if (!currentUser)
            return null;
        const found = enrollments.find((e) => e.courseId === courseId && e.userPhone === currentUser.phone);
        return found ? found.status : null;
    };
    return (React.createElement("div", { className: "bg-white" },
        React.createElement("section", { className: "relative overflow-hidden bg-gradient-to-b from-leaf-50/80 via-white to-white pt-10 pb-16 border-b border-slate-100" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "grid lg:grid-cols-12 gap-10 items-center" },
                    React.createElement("div", { className: "lg:col-span-7 space-y-6" },
                        React.createElement("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brandOrange-50 border border-brandOrange-200 text-brandOrange-700 text-sm font-bold" },
                            React.createElement(Sparkles, { className: "w-4 h-4 text-brandOrange-500" }),
                            "\u09A6\u0995\u09CD\u09B7\u09A4\u09BE \u0993 \u09A8\u09C8\u09A4\u09BF\u0995 \u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0 \u09B8\u09AE\u09A8\u09CD\u09AC\u09BF\u09A4 \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09AB\u09B0\u09CD\u09AE"),
                        React.createElement("h1", { className: "text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight" },
                            "\u09AD\u09BE\u09B7\u09BE, \u09AA\u09CD\u09B0\u09AF\u09C1\u0995\u09CD\u09A4\u09BF \u0993 \u09AC\u09CD\u09AF\u09AC\u09B8\u09BE\u09DF \u09A8\u09BF\u099C\u09C7\u0995\u09C7 \u09A6\u0995\u09CD\u09B7 \u0995\u09B0\u09C7 \u09A4\u09C1\u09B2\u09C1\u09A8",
                            ' ',
                            React.createElement("span", { className: "text-leaf-600" }, "Mannat Academy"),
                            "-\u098F\u09B0 \u09B8\u09BE\u09A5\u09C7"),
                        React.createElement("p", { className: "text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl" }, "\u09B8\u09B9\u099C \u09AA\u09A6\u09CD\u09A7\u09A4\u09BF\u09A4\u09C7 \u09A8\u09BE\u09B9\u09C1-\u09B8\u09B0\u09AB \u0993 \u0986\u09B0\u09AC\u09BF \u09B8\u09CD\u09AA\u09CB\u0995\u09C7\u09A8 \u09A5\u09C7\u0995\u09C7 \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09C7 \u0995\u09CD\u09B2\u09A1 \u0993 \u098F\u0986\u0987 \u09A6\u09BF\u09DF\u09C7 \u0993\u09DF\u09C7\u09AC\u09B8\u09BE\u0987\u099F \u09A4\u09C8\u09B0\u09BF, \u098F\u0986\u0987 \u098F\u099C\u09C7\u09A8\u09CD\u099F, \u09AD\u09BF\u09A1\u09BF\u0993 \u098F\u09A1\u09BF\u099F\u09BF\u0982 \u098F\u09AC\u0982 \u0986\u09A7\u09C1\u09A8\u09BF\u0995 \u09A1\u09BF\u099C\u09BF\u099F\u09BE\u09B2 \u09AE\u09BE\u09B0\u09CD\u0995\u09C7\u099F\u09BF\u0982 \u09B6\u09BF\u0996\u09C1\u09A8 \u0985\u09AD\u09BF\u099C\u09CD\u099E \u09AE\u09C7\u09A8\u09CD\u099F\u09B0\u09A6\u09C7\u09B0 \u09A4\u09A4\u09CD\u09A4\u09CD\u09AC\u09BE\u09AC\u09A7\u09BE\u09A8\u09C7\u0964"),
                        React.createElement("div", { className: "relative max-w-xl" },
                            React.createElement(Search, { className: "w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" }),
                            React.createElement("input", { type: "text", placeholder: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u099B\u09A8\u09CD\u09A6\u09C7\u09B0 \u0995\u09CB\u09B0\u09CD\u09B8 \u0996\u09C1\u0981\u099C\u09C1\u09A8 (\u09AF\u09C7\u09AE\u09A8: \u09A8\u09BE\u09B9\u09C1 \u09B8\u09B0\u09AB, \u098F\u0986\u0987 \u0993\u09DF\u09C7\u09AC\u09B8\u09BE\u0987\u099F, \u0986\u09B0\u09AC\u09BF)...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-leaf-500 focus:outline-none text-slate-800 shadow-sm" })),
                        React.createElement("div", { className: "flex flex-wrap gap-5 pt-2 text-sm font-semibold text-slate-700" },
                            React.createElement("span", { className: "flex items-center gap-1.5" },
                                React.createElement(CheckCircle, { className: "w-5 h-5 text-leaf-600" }),
                                "\u09B2\u09BE\u0987\u09AD \u0993 \u09B0\u09C7\u0995\u09B0\u09CD\u09A1\u09C7\u09A1 \u0995\u09CD\u09B2\u09BE\u09B8"),
                            React.createElement("span", { className: "flex items-center gap-1.5" },
                                React.createElement(CheckCircle, { className: "w-5 h-5 text-leaf-600" }),
                                "\u09AA\u09CD\u09B0\u09CD\u09AF\u09BE\u0995\u099F\u09BF\u0995\u09CD\u09AF\u09BE\u09B2 \u09AA\u09CD\u09B0\u099C\u09C7\u0995\u09CD\u099F \u0993 \u09A8\u09CB\u099F\u09B8"),
                            React.createElement("span", { className: "flex items-center gap-1.5" },
                                React.createElement(CheckCircle, { className: "w-5 h-5 text-brandOrange-500" }),
                                "\u0995\u09CB\u09B0\u09CD\u09B8 \u09B6\u09C7\u09B7\u09C7 \u09B8\u09BE\u09B0\u09CD\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u099F"))),
                    React.createElement("div", { className: "lg:col-span-5" },
                        React.createElement("div", { className: "bg-white rounded-3xl p-6 border-2 border-leaf-100 shadow-xl relative" },
                            React.createElement("div", { className: "absolute -top-4 -right-4 bg-brandOrange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md" }, "\u09AD\u09B0\u09CD\u09A4\u09BF \u099A\u09B2\u099B\u09C7 \u09E8\u09E6\u09E8\u09EC \u09AC\u09CD\u09AF\u09BE\u099A"),
                            React.createElement("img", { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80", alt: "Mannat Academy Learning", className: "w-full h-56 object-cover rounded-2xl mb-5" }),
                            React.createElement("div", { className: "grid grid-cols-3 gap-3 text-center" },
                                React.createElement("div", { className: "p-3 rounded-xl bg-leaf-50 border border-leaf-100" },
                                    React.createElement(Users, { className: "w-5 h-5 text-leaf-600 mx-auto mb-1" }),
                                    React.createElement("p", { className: "text-lg font-extrabold text-slate-900" }, "\u09E8,\u09EB\u09E6\u09E6+"),
                                    React.createElement("p", { className: "text-xs text-slate-600 font-medium" }, "\u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0\u09CD\u09A5\u09C0")),
                                React.createElement("div", { className: "p-3 rounded-xl bg-brandOrange-50 border border-brandOrange-100" },
                                    React.createElement(BookOpen, { className: "w-5 h-5 text-brandOrange-500 mx-auto mb-1" }),
                                    React.createElement("p", { className: "text-lg font-extrabold text-slate-900" },
                                        courses.length,
                                        "\u099F\u09BF"),
                                    React.createElement("p", { className: "text-xs text-slate-600 font-medium" }, "\u09B8\u09CD\u09AA\u09C7\u09B6\u09BE\u09B2 \u0995\u09CB\u09B0\u09CD\u09B8")),
                                React.createElement("div", { className: "p-3 rounded-xl bg-leaf-50 border border-leaf-100" },
                                    React.createElement(Award, { className: "w-5 h-5 text-leaf-600 mx-auto mb-1" }),
                                    React.createElement("p", { className: "text-lg font-extrabold text-slate-900" }, "\u09E7\u09E6\u09E6%"),
                                    React.createElement("p", { className: "text-xs text-slate-600 font-medium" }, "\u09AA\u09CD\u09B0\u09CD\u09AF\u09BE\u0995\u099F\u09BF\u0995\u09CD\u09AF\u09BE\u09B2")))))))),
        React.createElement("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" },
            React.createElement("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "text-2xl sm:text-3xl font-extrabold text-slate-900" },
                        "\u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u099A\u09B2\u09AE\u09BE\u09A8 ",
                        React.createElement("span", { className: "text-brandOrange-500" }, "\u0995\u09CB\u09B0\u09CD\u09B8\u09B8\u09AE\u09C2\u09B9")),
                    React.createElement("p", { className: "text-slate-600 text-sm mt-1" }, "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u099B\u09A8\u09CD\u09A6\u09C7\u09B0 \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u09AC\u09C7\u099B\u09C7 \u09A8\u09BF\u09DF\u09C7 \u0986\u099C\u0987 \u09B6\u09C7\u0996\u09BE \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09C1\u09A8")),
                React.createElement("div", { className: "flex flex-wrap gap-2" }, CATEGORIES.map((category) => (React.createElement("button", { key: category, onClick: () => setSelectedCategory(category), className: `px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === category
                        ? 'bg-leaf-600 text-white shadow-md shadow-leaf-600/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-leaf-50 hover:text-leaf-700'}` }, category))))),
            filteredCourses.length > 0 ? (React.createElement("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-7" }, filteredCourses.map((course) => (React.createElement(CourseCard, { key: course.id, course: course, enrollmentStatus: getEnrollmentStatus(course.id) }))))) : (React.createElement("div", { className: "text-center py-16 bg-slate-50 rounded-2xl border border-slate-200" },
                React.createElement("p", { className: "text-lg font-bold text-slate-700" }, "\u0995\u09CB\u09A8\u09CB \u0995\u09CB\u09B0\u09CD\u09B8 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF!"),
                React.createElement("button", { onClick: () => {
                        setSelectedCategory("সকল কোর্স");
                        setSearchQuery("");
                    }, className: "mt-3 px-4 py-2 rounded-xl bg-brandOrange-500 text-white text-sm font-bold" }, "\u09B8\u09AC \u0995\u09CB\u09B0\u09CD\u09B8 \u09A6\u09C7\u0996\u09C1\u09A8"))))));
}
