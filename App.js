import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar.js';
import AuthModal from './AuthModal.js';
import Home from './Home.js';
import CourseDetail from './CourseDetail.js';
import Dashboard from './Dashboard.js';
import Classroom from './Classroom.js';
import Admin from './Admin.js';
import { INITIAL_COURSES } from './initialData.js';
import { loadData, saveData } from './helpers.js';
const DEFAULT_PAYMENT = {
    bkash: '',
    nagad: '',
    rocket: '',
    note: 'পেমেন্ট করার পর ট্রানজেকশন আইডি (TrxID) দিয়ে ফর্ম সাবমিট করুন। অ্যাডমিন যাচাই করে ক্লাস চালু করে দেবেন।',
};
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
export default function App() {
    const [courses, setCourses] = useState(() => loadData('mannat_courses', INITIAL_COURSES));
    const [enrollments, setEnrollments] = useState(() => loadData('mannat_enrollments', []));
    const [users, setUsers] = useState(() => loadData('mannat_users', []));
    const [adminHash, setAdminHash] = useState(() => loadData('mannat_admin_hash', ''));
    const [payment, setPayment] = useState(() => loadData('mannat_payment', DEFAULT_PAYMENT));
    const [currentUser, setCurrentUser] = useState(() => loadData('mannat_session', null));
    const [authOpen, setAuthOpen] = useState(false);
    useEffect(() => saveData('mannat_courses', courses), [courses]);
    useEffect(() => saveData('mannat_enrollments', enrollments), [enrollments]);
    useEffect(() => saveData('mannat_users', users), [users]);
    useEffect(() => saveData('mannat_admin_hash', adminHash), [adminHash]);
    useEffect(() => saveData('mannat_payment', payment), [payment]);
    useEffect(() => saveData('mannat_session', currentUser), [currentUser]);
    const handleRegister = (user) => {
        setUsers((prev) => [...prev, user]);
        setCurrentUser({ name: user.name, phone: user.phone });
        setAuthOpen(false);
    };
    const handleLogin = (user) => {
        setCurrentUser({ name: user.name, phone: user.phone });
        setAuthOpen(false);
    };
    const handleLogout = () => setCurrentUser(null);
    return (React.createElement("div", { className: "min-h-screen bg-white font-sans text-slate-800" },
        React.createElement(ScrollToTop, null),
        React.createElement(Navbar, { currentUser: currentUser, onOpenAuth: () => setAuthOpen(true), onLogout: handleLogout }),
        React.createElement("main", null,
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(Home, { courses: courses, enrollments: enrollments, currentUser: currentUser }) }),
                React.createElement(Route, { path: "/course/:id", element: React.createElement(CourseDetail, { courses: courses, enrollments: enrollments, setEnrollments: setEnrollments, currentUser: currentUser, payment: payment, onOpenAuth: () => setAuthOpen(true) }) }),
                React.createElement(Route, { path: "/dashboard", element: React.createElement(Dashboard, { courses: courses, enrollments: enrollments, currentUser: currentUser, onOpenAuth: () => setAuthOpen(true) }) }),
                React.createElement(Route, { path: "/classroom/:id", element: React.createElement(Classroom, { courses: courses, enrollments: enrollments, currentUser: currentUser, onOpenAuth: () => setAuthOpen(true) }) }),
                React.createElement(Route, { path: "/admin", element: React.createElement(Admin, { courses: courses, setCourses: setCourses, enrollments: enrollments, setEnrollments: setEnrollments, users: users, setUsers: setUsers, adminHash: adminHash, setAdminHash: setAdminHash, payment: payment, setPayment: setPayment }) }),
                React.createElement(Route, { path: "*", element: React.createElement(Navigate, { to: "/", replace: true }) }))),
        React.createElement("footer", { className: "mt-10 border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-600" },
            "\u00A9 ",
            new Date().getFullYear(),
            " Mannat Academy & Skill Development\u0964 \u09B8\u09B0\u09CD\u09AC\u09B8\u09CD\u09AC\u09A4\u09CD\u09AC \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4\u0964"),
        authOpen && (React.createElement(AuthModal, { users: users, onClose: () => setAuthOpen(false), onRegister: handleRegister, onLogin: handleLogin }))));
}
