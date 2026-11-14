import React, { useState } from 'react';
import { X } from 'lucide-react';
import { hashPassword, normalizePhone, isValidBdPhone } from './helpers.js';
export default function AuthModal({ users, onClose, onRegister, onLogin }) {
    const [mode, setMode] = useState('login');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        setError('');
        const cleanPhone = normalizePhone(phone);
        if (!isValidBdPhone(cleanPhone)) {
            setError('সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (যেমন: 01712345678)');
            return;
        }
        if (password.length < 6) {
            setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
            return;
        }
        setBusy(true);
        const hash = await hashPassword(password);
        if (mode === 'register') {
            if (!name.trim()) {
                setError('আপনার নাম লিখুন');
                setBusy(false);
                return;
            }
            if (users.some((u) => u.phone === cleanPhone)) {
                setError('এই নম্বর দিয়ে আগেই রেজিস্ট্রেশন করা হয়েছে, লগইন করুন');
                setBusy(false);
                return;
            }
            onRegister({ name: name.trim(), phone: cleanPhone, passHash: hash });
        }
        else {
            const found = users.find((u) => u.phone === cleanPhone && u.passHash === hash);
            if (!found) {
                setError('মোবাইল নম্বর বা পাসওয়ার্ড সঠিক নয়');
                setBusy(false);
                return;
            }
            onLogin(found);
        }
        setBusy(false);
    };
    return (React.createElement("div", { className: "fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4", onClick: onClose },
        React.createElement("div", { className: "relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl", onClick: (e) => e.stopPropagation() },
            React.createElement("button", { onClick: onClose, className: "absolute right-4 top-4 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" },
                React.createElement(X, { className: "h-5 w-5" })),
            React.createElement("div", { className: "mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-bold" }, [
                ['login', 'লগইন'],
                ['register', 'রেজিস্ট্রেশন'],
            ].map(([key, label]) => (React.createElement("button", { key: key, type: "button", onClick: () => {
                    setMode(key);
                    setError('');
                }, className: `rounded-lg py-2 transition-all ${mode === key ? 'bg-white text-leaf-700 shadow' : 'text-slate-600'}` }, label)))),
            React.createElement("form", { onSubmit: submit, className: "space-y-4" },
                mode === 'register' && (React.createElement("div", null,
                    React.createElement("label", { className: "mb-1 block text-sm font-semibold text-slate-700" }, "\u0986\u09AA\u09A8\u09BE\u09B0 \u09A8\u09BE\u09AE"),
                    React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:border-leaf-500 focus:outline-none", placeholder: "\u09AA\u09C2\u09B0\u09CD\u09A3 \u09A8\u09BE\u09AE" }))),
                React.createElement("div", null,
                    React.createElement("label", { className: "mb-1 block text-sm font-semibold text-slate-700" }, "\u09AE\u09CB\u09AC\u09BE\u0987\u09B2 \u09A8\u09AE\u09CD\u09AC\u09B0"),
                    React.createElement("input", { value: phone, onChange: (e) => setPhone(e.target.value), inputMode: "numeric", className: "w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:border-leaf-500 focus:outline-none", placeholder: "01XXXXXXXXX" })),
                React.createElement("div", null,
                    React.createElement("label", { className: "mb-1 block text-sm font-semibold text-slate-700" }, "\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1"),
                    React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:border-leaf-500 focus:outline-none", placeholder: "\u0995\u09AE\u09AA\u0995\u09CD\u09B7\u09C7 \u09EC \u0985\u0995\u09CD\u09B7\u09B0" })),
                error && React.createElement("p", { className: "rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600" }, error),
                React.createElement("button", { type: "submit", disabled: busy, className: "w-full rounded-xl bg-brandOrange-500 py-3 font-bold text-white shadow-md transition-colors hover:bg-brandOrange-600 disabled:opacity-60" }, mode === 'login' ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন')))));
}
