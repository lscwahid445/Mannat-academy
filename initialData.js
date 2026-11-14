export const CATEGORIES = [
    "সকল কোর্স",
    "ভাষা ও আরবি ব্যাকরণ",
    "এআই ও অটোমেশন",
    "ব্যবসা ও ডিজিটাল মার্কেটিং"
];
export const INITIAL_COURSES = [
    {
        id: "nahw-sarf-mastery",
        title: "সহজ পদ্ধতিতে নাহু ও সরফ (আরবি ব্যাকরণ মাস্টারক্লাস)",
        category: "ভাষা ও আরবি ব্যাকরণ",
        batch: "ব্যাচ ০১",
        seatsLeft: 18,
        schedule: "শনি ও সোম (রাত ৯:০০)",
        duration: "৩ মাস",
        price: 1200,
        originalPrice: 2500,
        isFree: false,
        instructor: "মুহাম্মাদ ওয়াহিদুজ্জামান ও বিশেষজ্ঞ উস্তাদবৃন্দ",
        thumbnail: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=800&q=80",
        introVideo: "https://www.youtube.com/embed/ysz5S6PUM-U",
        description: "কুরআন ও হাদিসের অর্থ সরাসরি বুঝতে এবং বিশুদ্ধ আরবি লিখতে ও পড়তে ইলমে নাহু ও সরফের ব্যবহারিক এবং সহজবোধ্য পূর্ণাঙ্গ কোর্স।",
        features: [
            "শূন্য থেকে ইলমে সরফের সিগাহ ও বাব পরিচিতি",
            "ইলমে নাহুর তারকীব ও ইরাব নির্ণয়ের সহজ সূত্র",
            "কুরআনের আয়াত থেকে সরাসরি ব্যাকরণ অনুশীলন",
            "প্রতিটি ক্লাসের পিডিএফ নোট ও সাপ্তাহিক পরীক্ষা"
        ],
        modules: [
            {
                id: "m1",
                title: "মডিউল ০১: ইলমে সরফের মৌলিক ধারণা ও ক্রিয়া রূপান্তর",
                lessons: [
                    { id: "l1", title: "ক্লাস ০১: কালেমা ও তার প্রকারভেদ পরিচিতি", duration: "৪৫ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" },
                    { id: "l2", title: "ক্লাস ০২: ফেয়েলে মাজি ও মুজারে গঠনের নিয়ম", duration: "৫০ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            },
            {
                id: "m2",
                title: "মডিউল ০২: ইলমে নাহু ও বাক্য গঠন (তারকীব)",
                lessons: [
                    { id: "l3", title: "ক্লাস ০৩: জুমলায়ে ইসমিয়্যাহ ও ফেলিয়্যাহ পরিচিতি", duration: "৪০ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            }
        ]
    },
    {
        id: "arabic-spoken",
        title: "প্র্যাকটিক্যাল আরবি স্পোকেন কোর্স (জিরো টু ফ্লুয়েন্ট)",
        category: "ভাষা ও আরবি ব্যাকরণ",
        batch: "ব্যাচ ০২",
        seatsLeft: 14,
        schedule: "রবি ও মঙ্গল (রাত ৯:৩০)",
        duration: "২.৫ মাস",
        price: 1500,
        originalPrice: 3000,
        isFree: false,
        instructor: "মান্নাত একাডেমি ল্যাঙ্গুয়েজ টিম",
        thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80",
        introVideo: "https://www.youtube.com/embed/ysz5S6PUM-U",
        description: "মধ্যপ্রাচ্যে উচ্চশিক্ষা, চাকরি কিংবা দৈনন্দিন কথোপকথনে সাবলীলভাবে আরবিতে কথা বলার প্র্যাকটিক্যাল স্পোকেন কোর্স।",
        features: [
            "দৈনন্দিন জীবনের ১০০০+ প্রয়োজনীয় আরবি ভোকাবুলারি",
            "লাইভ কনভারসেশন ও উচ্চারণ সংশোধন সেশন",
            "সৌদি ও মধ্যপ্রাচ্যের প্রচলিত ডায়ালেক্ট ধারণা",
            "কোর্স শেষে ডিজিটাল সার্টিফিকেট"
        ],
        modules: [
            {
                id: "m1",
                title: "মডিউল ০১: আরবি অভিবাদন ও নিজেকে উপস্থাপন",
                lessons: [
                    { id: "l1", title: "ক্লাস ০১: পরিচিতি পর্ব ও সাধারণ কথোপকথন", duration: "৩৫ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            }
        ]
    },
    {
        id: "english-spoken",
        title: "স্মার্ট ইংরেজি স্পোকেন ও প্রেজেন্টেশন স্কিল",
        category: "ভাষা ও আরবি ব্যাকরণ",
        batch: "ব্যাচ ০৪",
        seatsLeft: 22,
        schedule: "বুধ ও শুক্র (রাত ৮:৩০)",
        duration: "২ মাস",
        price: 1000,
        originalPrice: 2000,
        isFree: false,
        instructor: "মান্নাত একাডেমি ইংলিশ ফ্যাকাল্টি",
        thumbnail: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
        introVideo: "https://www.youtube.com/embed/ysz5S6PUM-U",
        description: "জড়তা কাটিয়ে আত্মবিশ্বাসের সাথে ইংরেজিতে কথা বলা, ইন্টারভিউ এবং পাবলিক প্রেজেন্টেশনের জন্য কমপ্লিট গাইডলাইন।",
        features: [
            "গ্রামারের ভয় ছাড়াই বাক্য তৈরির স্মার্ট স্ট্রাকচার",
            "ফোনেটিক্স ও সঠিক উচ্চারণ অনুশীলন",
            "লাইভ স্পিকিং পার্টনার প্র্যাকটিস"
        ],
        modules: [
            {
                id: "m1",
                title: "মডিউল ০১: স্পিকিং জড়তা কাটানোর কৌশল",
                lessons: [
                    { id: "l1", title: "ক্লাস ০১: ইংরেজিতে চিন্তা করা ও সহজ বাক্য গঠন", duration: "৪০ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            }
        ]
    },
    {
        id: "ai-website-building",
        title: "কোডিং ছাড়াই এআই (AI) দিয়ে পূর্ণাঙ্গ ওয়েবসাইট তৈরি",
        category: "এআই ও অটোমেশন",
        batch: "ব্যাচ ০১",
        seatsLeft: 10,
        schedule: "শুক্র ও শনি (রাত ১০:০০)",
        duration: "১.৫ মাস",
        price: 1800,
        originalPrice: 3500,
        isFree: false,
        instructor: "মুহাম্মাদ ওয়াহিদুজ্জামান",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
        introVideo: "https://www.youtube.com/embed/ysz5S6PUM-U",
        description: "Claude, ChatGPT এবং আধুনিক এআই টুলস ব্যবহার করে ই-কমার্স, LMS ও বিজনেস ওয়েবসাইট তৈরি এবং GitHub ও Netlify-তে লাইভ করার হাতে-কলমে প্রশিক্ষণ।",
        features: [
            "সঠিক প্রম্পট ইঞ্জিনিয়ারিংয়ের মাধ্যমে পূর্ণাঙ্গ ওয়েবসাইট কোড জেনারেট",
            "লোকাল পিসিতে প্রজেক্ট রান এবং বাগ ফিক্সিং",
            "GitHub ও Netlify-তে ফ্রি ডিপ্লয়মেন্ট ও কাস্টম ডোমেইন সেটআপ",
            "ক্লায়েন্টদের জন্য ওয়েবসাইট বানিয়ে আয়ের গাইডলাইন"
        ],
        modules: [
            {
                id: "m1",
                title: "মডিউল ০১: এআই প্রম্পটিং ও প্রজেক্ট আর্কিটেকচার",
                lessons: [
                    { id: "l1", title: "ক্লাস ০১: Claude ও এআই দিয়ে ল্যান্ডিং পেজ তৈরি", duration: "৫৫ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            }
        ]
    },
    {
        id: "ai-agent-building",
        title: "এআই এজেন্ট (AI Agent) ও বিজনেস অটোমেশন মাস্টারক্লাস",
        category: "এআই ও অটোমেশন",
        batch: "ব্যাচ ০১",
        seatsLeft: 12,
        schedule: "সোম ও বৃহঃ (রাত ১০:০০)",
        duration: "২ মাস",
        price: 2500,
        originalPrice: 5000,
        isFree: false,
        instructor: "মুহাম্মাদ ওয়াহিদুজ্জামান",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        introVideo: "https://www.youtube.com/embed/ysz5S6PUM-U",
        description: "আপনার ব্যবসা বা প্রতিষ্ঠানের কাস্টমার সাপোর্ট, সেলস এবং দৈনন্দিন কাজ স্বয়ংক্রিয়ভাবে পরিচালনার জন্য নিজস্ব AI Agent তৈরি করুন।",
        features: [
            "কাস্টম নলেজবেস যুক্ত চ্যাটবট ও ভয়েস এজেন্ট তৈরি",
            "ফেসবুক পেজ, হোয়াটসঅ্যাপ ও ওয়েবসাইটে এআই এজেন্ট ইন্টিগ্রেশন",
            "নো-কোড ও লো-কোড অটোমেশন ওয়ার্কফ্লো (n8n / Make)"
        ],
        modules: [
            {
                id: "m1",
                title: "মডিউল ০১: এআই এজেন্ট ফান্ডামেন্টালস",
                lessons: [
                    { id: "l1", title: "ক্লাস ০১: AI Agent কীভাবে কাজ করে ও প্রথম এজেন্ট তৈরি", duration: "৫০ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            }
        ]
    },
    {
        id: "claude-video-editing",
        title: "ক্লড (Claude) ও এআই টুলস দিয়ে প্রফেশনাল ভিডিও এডিটিং",
        category: "এআই ও অটোমেশন",
        batch: "ব্যাচ ০২",
        seatsLeft: 15,
        schedule: "মঙ্গল ও শুক্র (রাত ৯:০০)",
        duration: "১ মাস",
        price: 1200,
        originalPrice: 2400,
        isFree: false,
        instructor: "দ্য নেক্সাস মিডিয়া টিম",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
        introVideo: "https://www.youtube.com/embed/ysz5S6PUM-U",
        description: "ক্লড এআই দিয়ে স্ক্রিপ্ট, অটো ক্যাপশন, ভয়েসওভার এবং Premiere Pro ও CapCut-এর সমন্বয়ে দ্রুততম সময়ে ভাইরাল ভিডিও ও রিলস এডিটিং শিখুন।",
        features: [
            "Claude দিয়ে হাই-রিটেনশন ভিডিও স্ক্রিপ্ট ও হুক লেখা",
            "এআই ভয়েস ক্লোনিং ও অটো বাংলা সাবটাইটেল জেনারেশন",
            "ইউটিউব, ফেসবুক রিলস ও পডকাস্ট এডিটিং ওয়ার্কফ্লো"
        ],
        modules: [
            {
                id: "m1",
                title: "মডিউল ০১: এআই স্ক্রিপ্টিং ও স্মার্ট এডিটিং সেটআপ",
                lessons: [
                    { id: "l1", title: "ক্লাস ০১: ক্লড দিয়ে ভিডিও স্টোরিবোর্ড ও স্ক্রিপ্ট তৈরি", duration: "৪৫ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            }
        ]
    },
    {
        id: "how-to-start-business",
        title: "শূন্য থেকে কীভাবে লাভজনক ব্যবসা শুরু করবেন (প্র্যাকটিক্যাল গাইড)",
        category: "ব্যবসা ও ডিজিটাল মার্কেটিং",
        batch: "ব্যাচ ০৩",
        seatsLeft: 25,
        schedule: "শনিবার (রাত ৮:৩০)",
        duration: "১ মাস",
        price: 0,
        originalPrice: 1500,
        isFree: true,
        instructor: "মুহাম্মাদ ওয়াহিদুজ্জামান (১০+ বছরের ব্যবসায়িক অভিজ্ঞতা)",
        thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        introVideo: "https://www.youtube.com/embed/ysz5S6PUM-U",
        description: "সঠিক প্রোডাক্ট নির্বাচন, হোলসেল সোর্সিং, ব্র্যান্ডিং এবং কম পুঁজিতে অনলাইন ও অফলাইন ব্যবসা দাঁড় করানোর বাস্তবভিত্তিক গাইডলাইন।",
        features: [
            "লাভজনক নিশ ও প্রোডাক্ট রিসার্চ পদ্ধতি",
            "হোলসেল সাপ্লায়ার সোর্সিং ও ইনভেন্টরি ম্যানেজমেন্ট",
            "ট্রেড লাইসেন্স, ব্র্যান্ডিং ও কাস্টমার ট্রাস্ট বিল্ডিং"
        ],
        modules: [
            {
                id: "m1",
                title: "মডিউল ০১: বিজনেস আইডিয়া ও মার্কেট ভ্যালিডেশন",
                lessons: [
                    { id: "l1", title: "ক্লাস ০১: কম পুঁজিতে সঠিক ব্যবসা নির্বাচনের সূত্র", duration: "৪০ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            }
        ]
    },
    {
        id: "digital-marketing",
        title: "কমপ্লিট ডিজিটাল মার্কেটিং ও ফেসবুক অ্যাডস মাস্টারি",
        category: "ব্যবসা ও ডিজিটাল মার্কেটিং",
        batch: "ব্যাচ ০৩",
        seatsLeft: 16,
        schedule: "রবি ও বুধ (রাত ৯:০০)",
        duration: "২ মাস",
        price: 1600,
        originalPrice: 3200,
        isFree: false,
        instructor: "মান্নাত একাডেমি মার্কেটিং টিম",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        introVideo: "https://www.youtube.com/embed/ysz5S6PUM-U",
        description: "নিজের ব্যবসার সেলস বৃদ্ধি কিংবা ফ্রিল্যান্সিং মার্কেটপ্লেসে কাজ করার জন্য মেটা অ্যাডস, কনটেন্ট মার্কেটিং এবং সেলস ফানেল ডিজাইন।",
        features: [
            "Meta Business Suite ও প্রফিটেবল ফেসবুক অ্যাড ক্যাম্পেইন",
            "পিক্সেল সেটআপ, রি-টার্গেটিং ও অডিয়েন্স রিসার্চ",
            "অর্গানিক রিচ বৃদ্ধি ও ব্র্যান্ড বিল্ডিং স্ট্র্যাটেজি"
        ],
        modules: [
            {
                id: "m1",
                title: "মডিউল ০১: ডিজিটাল মার্কেটিং ফাউন্ডেশন ও মেটা সেটআপ",
                lessons: [
                    { id: "l1", title: "ক্লাস ০১: বিজনেস ম্যানেজার ও অ্যাড অ্যাকাউন্ট সেটআপ", duration: "৫০ মিনিট", videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U", pdfNote: "" }
                ]
            }
        ]
    }
];
