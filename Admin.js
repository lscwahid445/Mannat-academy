import React, { useRef, useState } from 'react';
import { ShieldCheck, Plus, Trash2, Pencil, X, Check, Download, Upload, Lock } from 'lucide-react';
import { CATEGORIES, INITIAL_COURSES } from './initialData.js';
import { hashPassword, makeId, toNumber, toEmbedUrl } from './helpers.js';
const inputCls = 'w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm focus:border-leaf-500 focus:outline-none';
const labelCls = 'mb-1 block text-xs font-bold text-slate-600';
const emptyCourse = () => ({
    id: makeId('course'),
    title: '',
    category: CATEGORIES[1],
    batch: 'ব্যাচ ০১',
    seatsLeft: 20,
    schedule: '',
    duration: '',
    price: 0,
    originalPrice: 0,
    isFree: false,
    instructor: '',
    thumbnail: '',
    introVideo: '',
    description: '',
    features: [],
    modules: [],
});
/* ───────────────────────── লগইন / পাসওয়ার্ড সেটআপ ───────────────────────── */
function AdminGate({ adminHash, setAdminHash, onAuthed }) {
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [error, setError] = useState('');
    const isSetup = !adminHash;
    const submit = async (e) => {
        e.preventDefault();
        setError('');
        if (pw.length < 6)
            return setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
        if (isSetup) {
            if (pw !== pw2)
                return setError('দুটি পাসওয়ার্ড মিলছে না');
            setAdminHash(await hashPassword(pw));
            onAuthed();
        }
        else {
            if ((await hashPassword(pw)) !== adminHash)
                return setError('পাসওয়ার্ড সঠিক নয়');
            onAuthed();
        }
    };
    return (React.createElement("div", { className: "mx-auto max-w-md px-4 py-20" },
        React.createElement("form", { onSubmit: submit, className: "space-y-4 rounded-3xl border-2 border-leaf-100 bg-white p-7 shadow-xl" },
            React.createElement("div", { className: "text-center" },
                React.createElement("div", { className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-50 text-leaf-600" },
                    React.createElement(Lock, { className: "h-7 w-7" })),
                React.createElement("h1", { className: "text-xl font-extrabold text-slate-900" }, isSetup ? 'অ্যাডমিন পাসওয়ার্ড সেট করুন' : 'অ্যাডমিন লগইন'),
                isSetup && React.createElement("p", { className: "mt-1 text-sm text-slate-600" }, "\u09AA\u09CD\u09B0\u09A5\u09AE\u09AC\u09BE\u09B0, \u09A4\u09BE\u0987 \u09A8\u09BF\u099C\u09C7\u09B0 \u09AA\u099B\u09A8\u09CD\u09A6\u09C7\u09B0 \u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u09A6\u09BF\u09A8\u0964 \u098F\u099F\u09BF \u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09AC\u09C7\u09A8\u0964")),
            React.createElement("input", { type: "password", value: pw, onChange: (e) => setPw(e.target.value), placeholder: "\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1", className: inputCls }),
            isSetup && React.createElement("input", { type: "password", value: pw2, onChange: (e) => setPw2(e.target.value), placeholder: "\u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u0986\u09AC\u09BE\u09B0 \u09B2\u09BF\u0996\u09C1\u09A8", className: inputCls }),
            error && React.createElement("p", { className: "text-sm font-semibold text-red-600" }, error),
            React.createElement("button", { className: "w-full rounded-xl bg-brandOrange-500 py-3 font-bold text-white hover:bg-brandOrange-600" }, isSetup ? 'পাসওয়ার্ড সেট করে প্রবেশ করুন' : 'প্রবেশ করুন'))));
}
/* ───────────────────────── কোর্স এডিটর ───────────────────────── */
function CourseEditor({ initial, onSave, onCancel }) {
    const [c, setC] = useState(() => ({ ...initial, featuresText: (initial.features || []).join('\n') }));
    const [error, setError] = useState('');
    const set = (k, v) => setC((p) => ({ ...p, [k]: v }));
    const addModule = () => set('modules', [...c.modules, { id: makeId('m'), title: `মডিউল ${c.modules.length + 1}`, lessons: [] }]);
    const updModule = (mid, patch) => set('modules', c.modules.map((m) => (m.id === mid ? { ...m, ...patch } : m)));
    const delModule = (mid) => set('modules', c.modules.filter((m) => m.id !== mid));
    const addLesson = (mid) => updModule(mid, {
        lessons: [
            ...c.modules.find((m) => m.id === mid).lessons,
            { id: makeId('l'), title: '', duration: '', videoUrl: '', pdfNote: '' },
        ],
    });
    const updLesson = (mid, lid, patch) => updModule(mid, { lessons: c.modules.find((m) => m.id === mid).lessons.map((l) => (l.id === lid ? { ...l, ...patch } : l)) });
    const delLesson = (mid, lid) => updModule(mid, { lessons: c.modules.find((m) => m.id === mid).lessons.filter((l) => l.id !== lid) });
    const save = (e) => {
        e.preventDefault();
        if (!c.title.trim())
            return setError('কোর্সের নাম দিন');
        const { featuresText, ...rest } = c;
        onSave({
            ...rest,
            title: c.title.trim(),
            price: c.isFree ? 0 : toNumber(c.price),
            originalPrice: toNumber(c.originalPrice),
            seatsLeft: toNumber(c.seatsLeft),
            introVideo: toEmbedUrl(c.introVideo),
            features: featuresText.split('\n').map((s) => s.trim()).filter(Boolean),
            modules: c.modules.map((m) => ({
                ...m,
                lessons: m.lessons.filter((l) => l.title.trim()).map((l) => ({ ...l, videoUrl: toEmbedUrl(l.videoUrl) })),
            })),
        });
    };
    return (React.createElement("form", { onSubmit: save, className: "space-y-6 rounded-2xl border-2 border-leaf-100 bg-white p-5 shadow-lg sm:p-7" },
        React.createElement("div", { className: "flex items-center justify-between" },
            React.createElement("h2", { className: "text-lg font-extrabold text-slate-900" }, "\u0995\u09CB\u09B0\u09CD\u09B8\u09C7\u09B0 \u09A4\u09A5\u09CD\u09AF"),
            React.createElement("button", { type: "button", onClick: onCancel, className: "rounded-lg p-1.5 text-slate-500 hover:bg-slate-100" },
                React.createElement(X, { className: "h-5 w-5" }))),
        React.createElement("div", { className: "grid gap-4 sm:grid-cols-2" },
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { className: labelCls }, "\u0995\u09CB\u09B0\u09CD\u09B8\u09C7\u09B0 \u09A8\u09BE\u09AE *"),
                React.createElement("input", { className: inputCls, value: c.title, onChange: (e) => set('title', e.target.value) })),
            React.createElement("div", null,
                React.createElement("label", { className: labelCls }, "\u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF"),
                React.createElement("select", { className: inputCls, value: c.category, onChange: (e) => set('category', e.target.value) }, CATEGORIES.filter((x) => x !== 'সকল কোর্স').map((x) => React.createElement("option", { key: x }, x)))),
            React.createElement("div", null,
                React.createElement("label", { className: labelCls }, "\u09AC\u09CD\u09AF\u09BE\u099A"),
                React.createElement("input", { className: inputCls, value: c.batch, onChange: (e) => set('batch', e.target.value) })),
            React.createElement("div", null,
                React.createElement("label", { className: labelCls }, "\u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09B8\u09AE\u09AF\u09BC\u09B8\u09C2\u099A\u09BF"),
                React.createElement("input", { className: inputCls, value: c.schedule, onChange: (e) => set('schedule', e.target.value), placeholder: "\u09B6\u09A8\u09BF \u0993 \u09B8\u09CB\u09AE (\u09B0\u09BE\u09A4 \u09EF:\u09E6\u09E6)" })),
            React.createElement("div", null,
                React.createElement("label", { className: labelCls }, "\u0995\u09CB\u09B0\u09CD\u09B8\u09C7\u09B0 \u09AE\u09C7\u09AF\u09BC\u09BE\u09A6"),
                React.createElement("input", { className: inputCls, value: c.duration, onChange: (e) => set('duration', e.target.value), placeholder: "\u09E8 \u09AE\u09BE\u09B8" })),
            React.createElement("div", null,
                React.createElement("label", { className: labelCls }, "\u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u09AE\u09C2\u09B2\u09CD\u09AF (\u09F3)"),
                React.createElement("input", { className: inputCls, value: c.isFree ? 0 : c.price, disabled: c.isFree, onChange: (e) => set('price', e.target.value) })),
            React.createElement("div", null,
                React.createElement("label", { className: labelCls }, "\u0986\u0997\u09C7\u09B0 \u09AE\u09C2\u09B2\u09CD\u09AF (\u09F3)"),
                React.createElement("input", { className: inputCls, value: c.originalPrice, onChange: (e) => set('originalPrice', e.target.value) })),
            React.createElement("div", null,
                React.createElement("label", { className: labelCls }, "\u09AC\u09BE\u0995\u09BF \u09B8\u09BF\u099F"),
                React.createElement("input", { className: inputCls, value: c.seatsLeft, onChange: (e) => set('seatsLeft', e.target.value) })),
            React.createElement("label", { className: "flex items-center gap-2 pt-5 text-sm font-bold text-slate-700" },
                React.createElement("input", { type: "checkbox", checked: c.isFree, onChange: (e) => set('isFree', e.target.checked), className: "h-4 w-4 accent-leaf-600" }),
                " \u09AB\u09CD\u09B0\u09BF \u0995\u09CB\u09B0\u09CD\u09B8"),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { className: labelCls }, "\u0987\u09A8\u09B8\u09CD\u099F\u09CD\u09B0\u09BE\u0995\u09CD\u099F\u09B0"),
                React.createElement("input", { className: inputCls, value: c.instructor, onChange: (e) => set('instructor', e.target.value) })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { className: labelCls }, "\u09A5\u09BE\u09AE\u09CD\u09AC\u09A8\u09C7\u0987\u09B2 \u099B\u09AC\u09BF\u09B0 \u09B2\u09BF\u0982\u0995"),
                React.createElement("input", { className: inputCls, value: c.thumbnail, onChange: (e) => set('thumbnail', e.target.value), placeholder: "https://..." })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { className: labelCls }, "\u0987\u09A8\u09CD\u099F\u09CD\u09B0\u09CB \u09AD\u09BF\u09A1\u09BF\u0993 (\u0987\u0989\u099F\u09BF\u0989\u09AC \u09B2\u09BF\u0982\u0995)"),
                React.createElement("input", { className: inputCls, value: c.introVideo, onChange: (e) => set('introVideo', e.target.value), placeholder: "https://www.youtube.com/watch?v=..." })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { className: labelCls }, "\u09AC\u09BF\u09AC\u09B0\u09A3"),
                React.createElement("textarea", { rows: 3, className: inputCls, value: c.description, onChange: (e) => set('description', e.target.value) })),
            React.createElement("div", { className: "sm:col-span-2" },
                React.createElement("label", { className: labelCls }, "\u0995\u09CB\u09B0\u09CD\u09B8\u09C7 \u09AF\u09BE \u09B6\u09BF\u0996\u09AC\u09C7\u09A8 (\u09AA\u09CD\u09B0\u09A4\u09BF \u09B2\u09BE\u0987\u09A8\u09C7 \u098F\u0995\u099F\u09BF)"),
                React.createElement("textarea", { rows: 4, className: inputCls, value: c.featuresText, onChange: (e) => set('featuresText', e.target.value) }))),
        React.createElement("div", { className: "space-y-3" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("h3", { className: "font-extrabold text-slate-900" }, "\u09AE\u09A1\u09BF\u0989\u09B2 \u0993 \u0995\u09CD\u09B2\u09BE\u09B8"),
                React.createElement("button", { type: "button", onClick: addModule, className: "inline-flex items-center gap-1 rounded-lg bg-leaf-50 px-3 py-1.5 text-sm font-bold text-leaf-700" },
                    React.createElement(Plus, { className: "h-4 w-4" }),
                    " \u09AE\u09A1\u09BF\u0989\u09B2")),
            c.modules.map((m) => (React.createElement("div", { key: m.id, className: "space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4" },
                React.createElement("div", { className: "flex gap-2" },
                    React.createElement("input", { className: inputCls, value: m.title, onChange: (e) => updModule(m.id, { title: e.target.value }) }),
                    React.createElement("button", { type: "button", onClick: () => delModule(m.id), className: "rounded-lg bg-red-50 p-2 text-red-600" },
                        React.createElement(Trash2, { className: "h-4 w-4" }))),
                m.lessons.map((l) => (React.createElement("div", { key: l.id, className: "grid gap-2 rounded-lg border border-slate-200 bg-white p-3 sm:grid-cols-2" },
                    React.createElement("input", { className: inputCls, placeholder: "\u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09A8\u09BE\u09AE", value: l.title, onChange: (e) => updLesson(m.id, l.id, { title: e.target.value }) }),
                    React.createElement("input", { className: inputCls, placeholder: "\u09B8\u09AE\u09AF\u09BC (\u09AF\u09C7\u09AE\u09A8: \u09EA\u09EB \u09AE\u09BF\u09A8\u09BF\u099F)", value: l.duration, onChange: (e) => updLesson(m.id, l.id, { duration: e.target.value }) }),
                    React.createElement("input", { className: inputCls, placeholder: "\u09AD\u09BF\u09A1\u09BF\u0993 \u09B2\u09BF\u0982\u0995 (\u0987\u0989\u099F\u09BF\u0989\u09AC)", value: l.videoUrl, onChange: (e) => updLesson(m.id, l.id, { videoUrl: e.target.value }) }),
                    React.createElement("div", { className: "flex gap-2" },
                        React.createElement("input", { className: inputCls, placeholder: "\u09AA\u09BF\u09A1\u09BF\u098F\u09AB \u09A8\u09CB\u099F\u09C7\u09B0 \u09B2\u09BF\u0982\u0995 (\u0990\u099A\u09CD\u099B\u09BF\u0995)", value: l.pdfNote, onChange: (e) => updLesson(m.id, l.id, { pdfNote: e.target.value }) }),
                        React.createElement("button", { type: "button", onClick: () => delLesson(m.id, l.id), className: "rounded-lg bg-red-50 p-2 text-red-600" },
                            React.createElement(Trash2, { className: "h-4 w-4" })))))),
                React.createElement("button", { type: "button", onClick: () => addLesson(m.id), className: "inline-flex items-center gap-1 text-sm font-bold text-brandOrange-600" },
                    React.createElement(Plus, { className: "h-4 w-4" }),
                    " \u0995\u09CD\u09B2\u09BE\u09B8 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8"))))),
        error && React.createElement("p", { className: "text-sm font-semibold text-red-600" }, error),
        React.createElement("div", { className: "flex gap-3" },
            React.createElement("button", { className: "inline-flex items-center gap-1.5 rounded-xl bg-leaf-600 px-6 py-2.5 font-bold text-white hover:bg-leaf-700" },
                React.createElement(Check, { className: "h-4 w-4" }),
                " \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0995\u09B0\u09C1\u09A8"),
            React.createElement("button", { type: "button", onClick: onCancel, className: "rounded-xl bg-slate-100 px-6 py-2.5 font-bold text-slate-700" }, "\u09AC\u09BE\u09A4\u09BF\u09B2"))));
}
/* ───────────────────────── মূল অ্যাডমিন প্যানেল ───────────────────────── */
export default function Admin({ courses, setCourses, enrollments, setEnrollments, users, setUsers, adminHash, setAdminHash, payment, setPayment, }) {
    const [authed, setAuthed] = useState(() => sessionStorage.getItem('mannat_admin_ok') === '1');
    const [tab, setTab] = useState('courses');
    const [editing, setEditing] = useState(null);
    const [oldPw, setOldPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [msg, setMsg] = useState('');
    const fileRef = useRef(null);
    const flash = (m) => {
        setMsg(m);
        setTimeout(() => setMsg(''), 3500);
    };
    if (!authed) {
        return (React.createElement(AdminGate, { adminHash: adminHash, setAdminHash: setAdminHash, onAuthed: () => {
                sessionStorage.setItem('mannat_admin_ok', '1');
                setAuthed(true);
            } }));
    }
    const saveCourse = (course) => {
        setCourses((prev) => (prev.some((x) => x.id === course.id) ? prev.map((x) => (x.id === course.id ? course : x)) : [course, ...prev]));
        setEditing(null);
        flash('কোর্স সংরক্ষিত হয়েছে');
    };
    const deleteCourse = (course) => {
        if (!window.confirm(`"${course.title}" কোর্সটি মুছে ফেলবেন? এর সব এনরোলমেন্টও মুছে যাবে।`))
            return;
        setCourses((prev) => prev.filter((x) => x.id !== course.id));
        setEnrollments((prev) => prev.filter((e) => e.courseId !== course.id));
        flash('কোর্স মুছে ফেলা হয়েছে');
    };
    const setStatus = (id, status) => setEnrollments((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    const changePassword = async (e) => {
        e.preventDefault();
        if ((await hashPassword(oldPw)) !== adminHash)
            return flash('পুরনো পাসওয়ার্ড সঠিক নয়');
        if (newPw.length < 6)
            return flash('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
        setAdminHash(await hashPassword(newPw));
        setOldPw('');
        setNewPw('');
        flash('পাসওয়ার্ড পরিবর্তন হয়েছে');
    };
    const exportData = () => {
        const blob = new Blob([JSON.stringify({ courses, enrollments, users, payment }, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `mannat-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
    };
    const importData = (ev) => {
        const file = ev.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const d = JSON.parse(String(reader.result));
                if (!Array.isArray(d.courses))
                    throw new Error('bad');
                setCourses(d.courses);
                if (Array.isArray(d.enrollments))
                    setEnrollments(d.enrollments);
                if (Array.isArray(d.users))
                    setUsers(d.users);
                if (d.payment)
                    setPayment(d.payment);
                flash('ব্যাকআপ রিস্টোর হয়েছে');
            }
            catch {
                flash('ফাইলটি সঠিক ব্যাকআপ ফাইল নয়');
            }
        };
        reader.readAsText(file);
        ev.target.value = '';
    };
    const sortedEnr = [...enrollments].sort((a, b) => (a.status === 'pending' ? -1 : 1) - (b.status === 'pending' ? -1 : 1));
    const pendingCount = enrollments.filter((e) => e.status === 'pending').length;
    const tabs = [
        ['courses', `কোর্স (${courses.length})`],
        ['payments', `পেমেন্ট${pendingCount ? ` (${pendingCount})` : ''}`],
        ['settings', 'সেটিংস'],
    ];
    return (React.createElement("div", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6" },
        React.createElement("div", { className: "mb-6 flex flex-wrap items-center justify-between gap-3" },
            React.createElement("h1", { className: "flex items-center gap-2 text-2xl font-extrabold text-slate-900" },
                React.createElement(ShieldCheck, { className: "h-7 w-7 text-leaf-600" }),
                " \u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u09AA\u09CD\u09AF\u09BE\u09A8\u09C7\u09B2"),
            React.createElement("button", { onClick: () => {
                    sessionStorage.removeItem('mannat_admin_ok');
                    setAuthed(false);
                }, className: "rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600" }, "\u09B2\u0997\u0986\u0989\u099F")),
        msg && React.createElement("div", { className: "mb-4 rounded-xl bg-leaf-50 px-4 py-2.5 text-sm font-bold text-leaf-700" }, msg),
        React.createElement("div", { className: "mb-6 flex gap-2 overflow-x-auto" }, tabs.map(([k, label]) => (React.createElement("button", { key: k, onClick: () => { setTab(k); setEditing(null); }, className: `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold ${tab === k ? 'bg-leaf-600 text-white' : 'bg-slate-100 text-slate-700'}` }, label)))),
        tab === 'courses' && (editing ? (React.createElement(CourseEditor, { initial: editing, onSave: saveCourse, onCancel: () => setEditing(null) })) : (React.createElement("div", { className: "space-y-4" },
            React.createElement("button", { onClick: () => setEditing(emptyCourse()), className: "inline-flex items-center gap-1.5 rounded-xl bg-brandOrange-500 px-5 py-2.5 font-bold text-white hover:bg-brandOrange-600" },
                React.createElement(Plus, { className: "h-4 w-4" }),
                " \u09A8\u09A4\u09C1\u09A8 \u0995\u09CB\u09B0\u09CD\u09B8 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8"),
            courses.length === 0 && React.createElement("p", { className: "rounded-xl bg-slate-50 p-8 text-center font-semibold text-slate-600" }, "\u0995\u09CB\u09A8\u09CB \u0995\u09CB\u09B0\u09CD\u09B8 \u09A8\u09C7\u0987\u0964"),
            courses.map((c) => (React.createElement("div", { key: c.id, className: "flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4" },
                React.createElement("img", { src: c.thumbnail, alt: "", className: "h-16 w-24 rounded-lg bg-slate-100 object-cover" }),
                React.createElement("div", { className: "min-w-0 flex-1" },
                    React.createElement("p", { className: "font-bold text-slate-900" }, c.title),
                    React.createElement("p", { className: "text-xs text-slate-500" },
                        c.category,
                        " \u00B7 ",
                        c.isFree ? 'ফ্রি' : `৳${c.price}`,
                        " \u00B7 ",
                        c.modules.reduce((n, m) => n + m.lessons.length, 0),
                        "\u099F\u09BF \u0995\u09CD\u09B2\u09BE\u09B8")),
                React.createElement("button", { onClick: () => setEditing(c), className: "inline-flex items-center gap-1 rounded-lg bg-leaf-50 px-3 py-2 text-sm font-bold text-leaf-700" },
                    React.createElement(Pencil, { className: "h-4 w-4" }),
                    " \u098F\u09A1\u09BF\u099F"),
                React.createElement("button", { onClick: () => deleteCourse(c), className: "inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-600" },
                    React.createElement(Trash2, { className: "h-4 w-4" }),
                    " \u09AE\u09C1\u099B\u09C1\u09A8"))))))),
        tab === 'payments' && (React.createElement("div", { className: "space-y-3" },
            sortedEnr.length === 0 && React.createElement("p", { className: "rounded-xl bg-slate-50 p-8 text-center font-semibold text-slate-600" }, "\u098F\u0996\u09A8\u09CB \u0995\u09CB\u09A8\u09CB \u09AD\u09B0\u09CD\u09A4\u09BF\u09B0 \u0986\u09AC\u09C7\u09A6\u09A8 \u0986\u09B8\u09C7\u09A8\u09BF\u0964"),
            sortedEnr.map((e) => {
                const course = courses.find((c) => c.id === e.courseId);
                return (React.createElement("div", { key: e.id, className: "flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4" },
                    React.createElement("div", { className: "min-w-0 flex-1 text-sm" },
                        React.createElement("p", { className: "font-bold text-slate-900" },
                            e.userName,
                            " \u00B7 ",
                            e.userPhone),
                        React.createElement("p", { className: "text-slate-600" }, course?.title || 'মুছে ফেলা কোর্স'),
                        React.createElement("p", { className: "text-xs text-slate-500" }, e.method === 'free' ? 'ফ্রি এনরোলমেন্ট' : `${e.method} · TrxID: ${e.trxId} · প্রেরক: ${e.senderNumber} · ৳${e.amount}`)),
                    React.createElement("span", { className: `rounded-full px-3 py-1 text-xs font-bold ${e.status === 'approved' ? 'bg-leaf-50 text-leaf-700' : e.status === 'pending' ? 'bg-brandOrange-50 text-brandOrange-700' : 'bg-red-50 text-red-600'}` }, e.status === 'approved' ? 'অনুমোদিত' : e.status === 'pending' ? 'অপেক্ষমাণ' : 'বাতিল'),
                    e.status !== 'approved' && React.createElement("button", { onClick: () => setStatus(e.id, 'approved'), className: "rounded-lg bg-leaf-600 px-3 py-2 text-sm font-bold text-white" }, "\u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09A8"),
                    e.status !== 'rejected' && React.createElement("button", { onClick: () => setStatus(e.id, 'rejected'), className: "rounded-lg bg-red-50 px-3 py-2 text-sm font-bold text-red-600" }, "\u09AC\u09BE\u09A4\u09BF\u09B2")));
            }))),
        tab === 'settings' && (React.createElement("div", { className: "grid gap-6 lg:grid-cols-2" },
            React.createElement("form", { onSubmit: changePassword, className: "space-y-3 rounded-2xl border border-slate-200 bg-white p-5" },
                React.createElement("h2", { className: "font-extrabold text-slate-900" }, "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8"),
                React.createElement("input", { type: "password", className: inputCls, placeholder: "\u09AA\u09C1\u09B0\u09A8\u09CB \u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1", value: oldPw, onChange: (e) => setOldPw(e.target.value) }),
                React.createElement("input", { type: "password", className: inputCls, placeholder: "\u09A8\u09A4\u09C1\u09A8 \u09AA\u09BE\u09B8\u0993\u09AF\u09BC\u09BE\u09B0\u09CD\u09A1 (\u0995\u09AE\u09AA\u0995\u09CD\u09B7\u09C7 \u09EC \u0985\u0995\u09CD\u09B7\u09B0)", value: newPw, onChange: (e) => setNewPw(e.target.value) }),
                React.createElement("button", { className: "rounded-xl bg-leaf-600 px-5 py-2.5 text-sm font-bold text-white" }, "\u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0\u09C1\u09A8")),
            React.createElement("div", { className: "space-y-3 rounded-2xl border border-slate-200 bg-white p-5" },
                React.createElement("h2", { className: "font-extrabold text-slate-900" }, "\u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F \u09A8\u09AE\u09CD\u09AC\u09B0 (\u099B\u09BE\u09A4\u09CD\u09B0\u09A6\u09C7\u09B0 \u09A6\u09C7\u0996\u09BE\u09A8\u09CB \u09B9\u09AC\u09C7)"),
                [['bkash', 'বিকাশ নম্বর'], ['nagad', 'নগদ নম্বর'], ['rocket', 'রকেট নম্বর']].map(([k, label]) => (React.createElement("input", { key: k, className: inputCls, placeholder: label, value: payment[k] || '', onChange: (e) => setPayment({ ...payment, [k]: e.target.value }) }))),
                React.createElement("textarea", { rows: 3, className: inputCls, placeholder: "\u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F \u09A8\u09BF\u09B0\u09CD\u09A6\u09C7\u09B6\u09A8\u09BE", value: payment.note || '', onChange: (e) => setPayment({ ...payment, note: e.target.value }) }),
                React.createElement("p", { className: "text-xs text-slate-500" }, "\u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u09B8\u09CD\u09AC\u09AF\u09BC\u0982\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u09AD\u09BE\u09AC\u09C7 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09B9\u09AF\u09BC\u0964")),
            React.createElement("div", { className: "space-y-3 rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2" },
                React.createElement("h2", { className: "font-extrabold text-slate-900" }, "\u09AC\u09CD\u09AF\u09BE\u0995\u0986\u09AA \u0993 \u09B0\u09BF\u09B8\u09CD\u099F\u09CB\u09B0"),
                React.createElement("p", { className: "text-sm text-slate-600" }, "\u09A1\u09C7\u099F\u09BE \u09B6\u09C1\u09A7\u09C1 \u098F\u0987 \u09AC\u09CD\u09B0\u09BE\u0989\u099C\u09BE\u09B0\u09C7 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09A5\u09BE\u0995\u09C7\u0964 \u09A8\u09BF\u09AF\u09BC\u09AE\u09BF\u09A4 \u09AC\u09CD\u09AF\u09BE\u0995\u0986\u09AA \u09A1\u09BE\u0989\u09A8\u09B2\u09CB\u09A1 \u0995\u09B0\u09C7 \u09B0\u09BE\u0996\u09C1\u09A8\u0964"),
                React.createElement("div", { className: "flex flex-wrap gap-3" },
                    React.createElement("button", { onClick: exportData, className: "inline-flex items-center gap-1.5 rounded-xl bg-leaf-600 px-5 py-2.5 text-sm font-bold text-white" },
                        React.createElement(Download, { className: "h-4 w-4" }),
                        " \u09AC\u09CD\u09AF\u09BE\u0995\u0986\u09AA \u09A1\u09BE\u0989\u09A8\u09B2\u09CB\u09A1"),
                    React.createElement("button", { onClick: () => fileRef.current?.click(), className: "inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white" },
                        React.createElement(Upload, { className: "h-4 w-4" }),
                        " \u09AC\u09CD\u09AF\u09BE\u0995\u0986\u09AA \u09B0\u09BF\u09B8\u09CD\u099F\u09CB\u09B0"),
                    React.createElement("input", { ref: fileRef, type: "file", accept: "application/json,.json", className: "hidden", onChange: importData }),
                    React.createElement("button", { onClick: () => {
                            if (window.confirm('সব কোর্স ডিফল্ট অবস্থায় ফিরে যাবে। নিশ্চিত?')) {
                                setCourses(INITIAL_COURSES);
                                flash('ডিফল্ট কোর্স ফিরিয়ে আনা হয়েছে');
                            }
                        }, className: "rounded-xl bg-red-50 px-5 py-2.5 text-sm font-bold text-red-600" }, "\u0995\u09CB\u09B0\u09CD\u09B8 \u09B0\u09BF\u09B8\u09C7\u099F")),
                React.createElement("p", { className: "text-xs text-slate-500" },
                    "\u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u09BF\u09A4 \u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u09B0\u09CD\u09A5\u09C0: ",
                    users.length,
                    " \u099C\u09A8"))))));
}
