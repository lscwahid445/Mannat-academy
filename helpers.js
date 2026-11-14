// লোকাল স্টোরেজ থেকে ডেটা পড়া/লেখা
export function loadData(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    }
    catch {
        return fallback;
    }
}
export function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch {
        /* স্টোরেজ ভরে গেলে বা ব্লক থাকলে উপেক্ষা করা হবে */
    }
}
// পাসওয়ার্ড হ্যাশ (HTTPS হলে SHA-256, না হলে সাধারণ ফলব্যাক)
export async function hashPassword(text) {
    const salted = `mannat::${text}`;
    try {
        if (window.crypto && window.crypto.subtle) {
            const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(salted));
            return Array.from(new Uint8Array(buf))
                .map((b) => b.toString(16).padStart(2, '0'))
                .join('');
        }
    }
    catch {
        /* ফলব্যাকে যাবে */
    }
    let h = 5381;
    for (let i = 0; i < salted.length; i++)
        h = (h * 33) ^ salted.charCodeAt(i);
    return 'f' + (h >>> 0).toString(16);
}
// ইউটিউব লিংককে embed লিংকে রূপান্তর
export function toEmbedUrl(url) {
    if (!url)
        return '';
    const u = url.trim();
    if (u.includes('youtube.com/embed/'))
        return u;
    const m = u.match(/youtu\.be\/([\w-]{6,})/) ||
        u.match(/[?&]v=([\w-]{6,})/) ||
        u.match(/youtube\.com\/(?:shorts|live)\/([\w-]{6,})/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : u;
}
// বাংলা সংখ্যা ও ইংরেজি সংখ্যা দুটোই গ্রহণ করে সংখ্যায় রূপান্তর
export function toNumber(value) {
    const map = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
    const s = String(value ?? '').replace(/[০-৯]/g, (d) => map[d]);
    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
}
export function normalizePhone(phone) {
    return String(phone || '')
        .replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d))
        .replace(/[^\d]/g, '');
}
export function isValidBdPhone(phone) {
    return /^01[3-9]\d{8}$/.test(normalizePhone(phone));
}
export function makeId(prefix = 'id') {
    return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
