import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle2, PlayCircle, Hourglass, XCircle } from 'lucide-react';
import { toEmbedUrl, makeId, normalizePhone, isValidBdPhone } from './helpers.js';
export default function CourseDetail({ courses, enrollments, setEnrollments, currentUser, payment, onOpenAuth }) {
    const { id } = useParams();
    const course = courses.find((c) => c.id === id);
    const [method, setMethod] = useState('bkash');
    const [senderNumber, setSenderNumber] = useState('');
    const [trxId, setTrxId] = useState('');
    const [error, setError] = useState('');
    if (!course) {
        return (React.createElement("div", { className: "mx-auto max-w-3xl px-4 py-20 text-center" },
            React.createElement("p", { className: "text-xl font-bold text-slate-700" }, "\u0995\u09CB\u09B0\u09CD\u09B8\u099F\u09BF \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964"),
            React.createElement(Link, { to: "/", className: "mt-4 inline-block rounded-xl bg-brandOrange-500 px-5 py-2.5 font-bold text-white" }, "\u09B8\u09AC \u0995\u09CB\u09B0\u09CD\u09B8 \u09A6\u09C7\u0996\u09C1\u09A8")));
    }
    const myEnrollment = currentUser
        ? enrollments.find((e) => e.courseId === course.id && e.userPhone === currentUser.phone)
        : null;
    const enrollFree = () => {
        if (!currentUser)
            return onOpenAuth();
        setEnrollments((prev) => [
            ...prev,
            {
                id: makeId('enr'),
                courseId: course.id,
                userPhone: currentUser.phone,
                userName: currentUser.name,
                status: 'approved',
                method: 'free',
                trxId: '',
                senderNumber: '',
                amount: 0,
                createdAt: new Date().toISOString(),
            },
        ]);
    };
    const submitPayment = (e) => {
        e.preventDefault();
        if (!currentUser)
            return onOpenAuth();
        setError('');
        if (!isValidBdPhone(senderNumber)) {
            setError('যে নম্বর থেকে টাকা পাঠিয়েছেন সেটি সঠিকভাবে দিন (১১ সংখ্যা)');
            return;
        }
        if (trxId.trim().length < 6) {
            setError('সঠিক ট্রানজেকশন আইডি (TrxID) দিন');
            return;
        }
        setEnrollments((prev) => [
            ...prev.filter((x) => !(x.courseId === course.id && x.userPhone === currentUser.phone)),
            {
                id: makeId('enr'),
                courseId: course.id,
                userPhone: currentUser.phone,
                userName: currentUser.name,
                status: 'pending',
                method,
                trxId: trxId.trim(),
                senderNumber: normalizePhone(senderNumber),
                amount: course.price,
                createdAt: new Date().toISOString(),
            },
        ]);
        setTrxId('');
        setSenderNumber('');
    };
    const payNumbers = [
        ['bkash', 'বিকাশ', payment?.bkash],
        ['nagad', 'নগদ', payment?.nagad],
        ['rocket', 'রকেট', payment?.rocket],
    ].filter(([, , num]) => num);
    const embed = toEmbedUrl(course.introVideo);
    return (React.createElement("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "grid gap-8 lg:grid-cols-12" },
            React.createElement("div", { className: "space-y-8 lg:col-span-8" },
                React.createElement("div", null,
                    React.createElement("span", { className: "text-sm font-bold text-leaf-600" }, course.category),
                    React.createElement("h1", { className: "mt-1 text-2xl font-extrabold leading-tight text-slate-900 sm:text-4xl" }, course.title),
                    React.createElement("p", { className: "mt-3 leading-relaxed text-slate-600" }, course.description),
                    React.createElement("div", { className: "mt-4 flex flex-wrap gap-4 text-sm font-semibold text-slate-700" },
                        React.createElement("span", { className: "flex items-center gap-1.5" },
                            React.createElement(User, { className: "h-4 w-4 text-leaf-600" }),
                            course.instructor),
                        React.createElement("span", { className: "flex items-center gap-1.5" },
                            React.createElement(Calendar, { className: "h-4 w-4 text-leaf-600" }),
                            course.schedule),
                        React.createElement("span", { className: "flex items-center gap-1.5" },
                            React.createElement(Clock, { className: "h-4 w-4 text-brandOrange-500" }),
                            course.duration))),
                embed && (React.createElement("div", { className: "aspect-video overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-md" },
                    React.createElement("iframe", { src: embed, title: course.title, className: "h-full w-full", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }))),
                course.features?.length > 0 && (React.createElement("section", null,
                    React.createElement("h2", { className: "mb-4 text-xl font-extrabold text-slate-900" }, "\u098F\u0987 \u0995\u09CB\u09B0\u09CD\u09B8\u09C7 \u09AF\u09BE \u09B6\u09BF\u0996\u09AC\u09C7\u09A8"),
                    React.createElement("ul", { className: "grid gap-3 sm:grid-cols-2" }, course.features.map((f, i) => (React.createElement("li", { key: i, className: "flex items-start gap-2 rounded-xl border border-leaf-100 bg-leaf-50/60 p-3 text-sm font-semibold text-slate-700" },
                        React.createElement(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-leaf-600" }),
                        f)))))),
                course.modules?.length > 0 && (React.createElement("section", null,
                    React.createElement("h2", { className: "mb-4 text-xl font-extrabold text-slate-900" }, "\u0995\u09CB\u09B0\u09CD\u09B8 \u0995\u09BE\u09B0\u09BF\u0995\u09C1\u09B2\u09BE\u09AE"),
                    React.createElement("div", { className: "space-y-3" }, course.modules.map((m) => (React.createElement("div", { key: m.id, className: "overflow-hidden rounded-xl border border-slate-200" },
                        React.createElement("div", { className: "bg-slate-50 px-4 py-3 font-bold text-slate-800" }, m.title),
                        React.createElement("ul", { className: "divide-y divide-slate-100" }, m.lessons.map((l) => (React.createElement("li", { key: l.id, className: "flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-slate-700" },
                            React.createElement("span", { className: "flex items-center gap-2" },
                                React.createElement(PlayCircle, { className: "h-4 w-4 text-brandOrange-500" }),
                                l.title),
                            React.createElement("span", { className: "shrink-0 text-xs text-slate-500" }, l.duration)))))))))))),
            React.createElement("aside", { className: "lg:col-span-4" },
                React.createElement("div", { className: "sticky top-24 space-y-4 rounded-3xl border-2 border-leaf-100 bg-white p-6 shadow-xl" },
                    React.createElement("img", { src: course.thumbnail, alt: course.title, className: "h-44 w-full rounded-2xl object-cover" }),
                    React.createElement("div", { className: "flex items-baseline gap-2" }, course.isFree ? (React.createElement("span", { className: "text-3xl font-extrabold text-leaf-600" }, "\u09AB\u09CD\u09B0\u09BF")) : (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "text-3xl font-extrabold text-slate-900" },
                            "\u09F3",
                            course.price),
                        course.originalPrice > 0 && React.createElement("span", { className: "text-slate-400 line-through" },
                            "\u09F3",
                            course.originalPrice)))),
                    !course.isFree && React.createElement("p", { className: "text-sm font-semibold text-brandOrange-600" },
                        "\u09B8\u09BF\u099F \u09AC\u09BE\u0995\u09BF: ",
                        course.seatsLeft,
                        "\u099F\u09BF \u00B7 ",
                        course.batch),
                    myEnrollment?.status === 'approved' && (React.createElement(Link, { to: `/classroom/${course.id}`, className: "flex w-full items-center justify-center gap-2 rounded-xl bg-leaf-600 py-3 font-bold text-white hover:bg-leaf-700" },
                        React.createElement(CheckCircle2, { className: "h-5 w-5" }),
                        " \u0995\u09CD\u09B2\u09BE\u09B8 \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09C1\u09A8")),
                    myEnrollment?.status === 'pending' && (React.createElement("div", { className: "flex items-start gap-2 rounded-xl border border-brandOrange-200 bg-brandOrange-50 p-4 text-sm font-semibold text-brandOrange-700" },
                        React.createElement(Hourglass, { className: "mt-0.5 h-4 w-4 shrink-0" }),
                        "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F \u09AF\u09BE\u099A\u09BE\u0987 \u099A\u09B2\u099B\u09C7\u0964 \u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8 \u09A6\u09BF\u09B2\u09C7\u0987 \u0995\u09CD\u09B2\u09BE\u09B8 \u099A\u09BE\u09B2\u09C1 \u09B9\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AC\u09C7\u0964")),
                    myEnrollment?.status === 'rejected' && (React.createElement("div", { className: "flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600" },
                        React.createElement(XCircle, { className: "mt-0.5 h-4 w-4 shrink-0" }),
                        "\u0986\u0997\u09C7\u09B0 \u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F\u099F\u09BF \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964 \u09A8\u09BF\u099A\u09C7\u09B0 \u09AB\u09B0\u09CD\u09AE\u09C7 \u09B8\u09A0\u09BF\u0995 \u09A4\u09A5\u09CD\u09AF \u09A6\u09BF\u09AF\u09BC\u09C7 \u0986\u09AC\u09BE\u09B0 \u099A\u09C7\u09B7\u09CD\u099F\u09BE \u0995\u09B0\u09C1\u09A8\u0964")),
                    (!myEnrollment || myEnrollment.status === 'rejected') && (React.createElement(React.Fragment, null, course.isFree ? (React.createElement("button", { onClick: enrollFree, className: "w-full rounded-xl bg-leaf-600 py-3 font-bold text-white hover:bg-leaf-700" }, "\u09AB\u09CD\u09B0\u09BF\u09A4\u09C7 \u09AD\u09B0\u09CD\u09A4\u09BF \u09B9\u09CB\u09A8")) : !currentUser ? (React.createElement("button", { onClick: onOpenAuth, className: "w-full rounded-xl bg-brandOrange-500 py-3 font-bold text-white hover:bg-brandOrange-600" }, "\u09AD\u09B0\u09CD\u09A4\u09BF \u09B9\u09A4\u09C7 \u09B2\u0997\u0987\u09A8 \u0995\u09B0\u09C1\u09A8")) : (React.createElement("form", { onSubmit: submitPayment, className: "space-y-3" },
                        payNumbers.length > 0 ? (React.createElement("div", { className: "space-y-1 rounded-xl bg-slate-50 p-3 text-sm" },
                            payNumbers.map(([key, label, num]) => (React.createElement("p", { key: key, className: "font-semibold text-slate-700" },
                                label,
                                " (Send Money): ",
                                React.createElement("span", { className: "font-extrabold text-slate-900" }, num)))),
                            payment?.note && React.createElement("p", { className: "pt-1 text-xs text-slate-500" }, payment.note))) : (React.createElement("p", { className: "rounded-xl bg-slate-50 p-3 text-sm text-slate-600" }, "\u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09A8\u09AE\u09CD\u09AC\u09B0 \u098F\u0996\u09A8\u09CB \u09AF\u09CB\u0997 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF\u0964 \u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964")),
                        React.createElement("select", { value: method, onChange: (e) => setMethod(e.target.value), className: "w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm font-semibold focus:border-leaf-500 focus:outline-none" },
                            React.createElement("option", { value: "bkash" }, "\u09AC\u09BF\u0995\u09BE\u09B6"),
                            React.createElement("option", { value: "nagad" }, "\u09A8\u0997\u09A6"),
                            React.createElement("option", { value: "rocket" }, "\u09B0\u0995\u09C7\u099F")),
                        React.createElement("input", { value: senderNumber, onChange: (e) => setSenderNumber(e.target.value), inputMode: "numeric", placeholder: "\u09AF\u09C7 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09A5\u09C7\u0995\u09C7 \u09AA\u09BE\u09A0\u09BF\u09AF\u09BC\u09C7\u099B\u09C7\u09A8", className: "w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-leaf-500 focus:outline-none" }),
                        React.createElement("input", { value: trxId, onChange: (e) => setTrxId(e.target.value), placeholder: "\u099F\u09CD\u09B0\u09BE\u09A8\u099C\u09C7\u0995\u09B6\u09A8 \u0986\u0987\u09A1\u09BF (TrxID)", className: "w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm focus:border-leaf-500 focus:outline-none" }),
                        error && React.createElement("p", { className: "text-sm font-semibold text-red-600" }, error),
                        React.createElement("button", { type: "submit", className: "w-full rounded-xl bg-brandOrange-500 py-3 font-bold text-white hover:bg-brandOrange-600" }, "\u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F \u09B8\u09BE\u09AC\u09AE\u09BF\u099F \u0995\u09B0\u09C1\u09A8"))))))))));
}
