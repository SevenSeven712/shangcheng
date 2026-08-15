// ================================================================
// 软件.js - 数据层（应用、开发者、社区帖子）
// ================================================================

// ---------- 应用数据 ----------
const APPS = {
    video: {
        id: "video",
        name: "七七视频解析",
        icon: "??",
        iconUrl: "https://i.ibb.co/dJcpTjW5/QQ20260628-152024.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "tools",
        categoryName: "工具",
        status: "online",
        statusText: "已上线",
        rank: 1,
        rating: 4.9,
        downloads: "12.5万",
        version: "2.5.0",
        views: 12500,
        website: "https://sevenseven712.github.io/QQSP/",
        shortDesc: "全网视频免费解析观看",
        description: "七七视频解析是一款强大的全网视频解析工具，支持各大主流视频平台的免费解析观看。无需会员，无需下载，打开就能用，高清流畅不卡顿。\n\n主要功能：\n? 支持全网各大视频平台解析\n? 高清画质，流畅播放\n? 无需登录，即开即用\n? 持续更新维护",
        notice: "",
        updates: [
            { version: "v2.0.1", date: "2026-07-07", content: "? 更新了搜索影片接口" },
            { version: "v2.0.0", date: "2026-06-20", content: "? 新增支持3个视频平台\n? 优化解析速度，提升50%\n? 修复部分视频无法播放的问题" },
            { version: "v1.4.0", date: "2026-05-12", content: "? 全新界面设计\n? 新增功能\n? 修复已知Bug" },
            { version: "v1.3.0", date: "2025-09-10", content: "? 禁用了违规接口" }
        ],
        screenshots: [
            "https://i.ibb.co/gFJJDd1y/QQ20260628-151756.png",
            "https://i.ibb.co/0yckpZCt/image.png"
        ],
        collaborators: [
            { id: "sevenqi", name: "Seven戚", role: "接口提供" },
            { id: "ZZ", name: "扣子", role: "框架设计" },
            { id: "DouBao", name: "豆包", role: "前端优化" },
            { id: "deep", name: "Deep Seek", role: "UI优化" }
        ]
    },
    LY: {
        id: "LY",
        name: "Seven游戏乐园",
        icon: "??",
        iconUrl: "https://i.ibb.co/tnFYQ2m/QQ-20260814193948.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "games",
        categoryName: "游戏",
        status: "online",
        statusText: "已上线",
        rank: 1,
        rating: 4.9,
        downloads: "1.5万",
        version: "1.0.0",
        views: 12500,
        website: "https://sevenseven712.github.io/games-zoo/",
        shortDesc: "集合全网的游戏合集",
        description: "无简介",
        notice: "",
        updates: [
            { version: "v1.0.0", date: "2026-08-14", content: "发布网站" },
        ],
        screenshots: [
            "https://i.ibb.co/99c7djzV/QQ-20260814193130.png",
        ],
        collaborators: [
            { id: "deep", name: "Deepseek", role: "网站框架" },
        ]
    },
    novel: {
        id: "novel",
        name: "七七小说网",
        icon: "??",
        iconUrl: "https://i.ibb.co/zH77YCN3/QQ20260628-152250.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "reading",
        categoryName: "阅读",
        status: "online",
        statusText: "已上线",
        rank: 2,
        rating: 4.8,
        downloads: "8.3万",
        version: "1.8.0",
        views: 8300,
        website: "https://sevenseven712.github.io/qqxsw/",
        shortDesc: "海量小说免费阅读",
        description: "七七小说网，海量小说免费看！涵盖都市、玄幻、言情、悬疑等各类题材，每日更新，让你告别书荒。\n\n主要功能：\n? 海量小说资源，全本免费阅读\n? 多种阅读模式，护眼舒适\n? 智能推荐，发现更多好书\n? 书架管理，阅读进度同步",
        notice: "",
        updates: [
            { version: "v1.8.0", date: "2026-06-18", content: "? 项目一次性开发完成，有完整交互" }
        ],
        screenshots: [
            "https://i.ibb.co/jqmkJj8/image.png",
            "https://i.ibb.co/q3D8DZq9/image.png",
            "https://i.ibb.co/Ldp8LjLZ/image.png"
        ],
        collaborators: [
            { id: "trae", name: "trae", role: "界面设计" }
        ]
    },
    JBS: {
        id: "JBS",
        name: "七七剧本杀",
        icon: "??",
        iconUrl: "https://i.ibb.co/DXfRRm9/QQ20260801-162900.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "games",
        categoryName: "游戏",
        status: "online",
        statusText: "已上线",
        rank: 2,
        rating: 4.7,
        downloads: "5.6万",
        version: "1.0.0",
        views: 8300,
        website: "https://sevenseven712.github.io/QQstory/#home",
        shortDesc: "海量互动小说免费游玩",
        description: "七七剧本杀，海量故事免费看！涵盖都市、玄幻、言情、悬疑等各类题材，每日更新，让你告别书荒。\n\n主要功能：\n? 海量互动小说资源，全游戏免费玩\n? 创作者中心，所有人也能做作者",
        notice: "",
        updates: [
            { version: "v1.8.0", date: "2026-06-18", content: "? 项目一次性开发完成，有完整交互" },
        ],
        screenshots: [
            "https://i.ibb.co/LXCJxj5g/QQ20260801-163823.png",
        ],
        collaborators: [
            { id: "trae", name: "trae", role: "软件设计" },
        ]
    },
    SJ: {
        id: "SJ",
        name: "暗区突袭",
        icon: "??",
        iconUrl: "https://i.ibb.co/v8FGb8H/image.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "games",
        categoryName: "游戏",
        status: "error",
        statusText: "已下架",
        rank: 2,
        rating: 4.6,
        downloads: "2.0万",
        version: "1.2.0",
        views: 1000,
        website: "",
        shortDesc: "模拟枪战小游戏",
        description: "真实枪战模拟，小容量高操作，玩三角洲端游前，先来这里练一练。\n\n主要功能：\n? 仅122MB大小\n? 纯html游戏框架\n?高难度游戏\n? 适合日常练枪和断网游戏",
        notice: "游戏出现较为严重的bug，暂停开放",
        updates: [
            { version: "v1.2.0", date: "2026-07-11", content: "更新多种武器并削弱了ai" },
            { version: "v1.0.0", date: "2026-07-10", content: "项目正式开发" }
        ],
        screenshots: [],
        collaborators: [
            { id: "XM", name: "xiaomimimo", role: "框架确定" },
            { id: "trae", name: "trae", role: "后续更新" }
        ]
    },
    SGS: {
        id: "SGS",
        name: "七七三国杀",
        icon: "??",
        iconUrl: "https://i.ibb.co/qMs0qdns/image.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "game",
        categoryName: "游戏",
        status: "online",
        statusText: "已上线",
        rank: 5,
        rating: 4.7,
        downloads: "7.2万",
        version: "1.0.0",
        views: 8300,
        website: "https://sevenseven712.github.io/qqSGS/",
        shortDesc: "七七三国杀是一个家庭向娱乐软件",
        description: "七七三国杀是一个家庭向娱乐软件，适合和朋友用同一个设备玩。\n\n主要功能：\n? 同一设备交替游戏\n? 线下多人游戏",
        notice: "",
        updates: [
            { version: "v1.0.0", date: "2026-07-12", content: "游戏正式上线" },
            { version: "v0.2.3", date: "2026-06-18", content: "? 修复武将已知问题" }
        ],
        screenshots: [
            "https://i.ibb.co/hJZ4Kb92/image.png",
            "https://i.ibb.co/3msb08tT/image.png",
            "https://i.ibb.co/rKY886PG/image.png",
            "https://i.ibb.co/Dg4kTn0s/image.png"
        ],
        collaborators: [
            { id: "trae", name: "trae", role: "基础框架搭建" },
            { id: "deep", name: "Deep Seek", role: "代码分析" }
        ]
    },
    ZXW: {
        id: "ZXW",
        name: "智学网",
        icon: "??",
        iconUrl: "https://i.ibb.co/PZjyTYf2/2.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "tools",
        categoryName: "工具",
        status: "online",
        statusText: "已上线",
        rank: 4,
        rating: 4.9,
        downloads: "4.3万",
        version: "1.0.0",
        views: 6700,
        website: "https://sevenseven712.github.io/ZXW/ ",
        shortDesc: "七七仿作页面是Seven戚制作的百分之百仿作大厂软件的网站",
        description: "七七仿作页面是Seven戚制作的百分之百仿作大厂软件的网站",
        notice: "",
        updates: [
            { version: "v1.0.1", date: "2026-07-07", content: "因为Seven戚的个人业务变更原因，本软件的宫格导航栏将于2026年7月7日后不再更新，想要使用我们全新的软件更新请使用“七七仿作页面”，七七仿作页面网站是我们的仿真页面中转站但是本网站的智学网仍能使用哦，只是不会再继续更近和更新了" },
            { version: "v1.0.0", date: "2026-06-28", content: "本网站正式上线" }
        ],
        screenshots: [
            "https://i.ibb.co/DHCNrvht/2.png",
            "https://i.ibb.co/HfvL71kN/image.png"
        ],
        collaborators: []
    },
    ZM: {
        id: "ZM",
        name: "大陆霸业",
        icon: "??",
        iconUrl: "https://i.ibb.co/6RzW8MqG/QQ20260709-131130.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "game",
        categoryName: "游戏",
        status: "error",
        statusText: "已下架",
        rank: 5,
        rating: 4.9,
        downloads: "2.4万",
        version: "1.0.0",
        views: 6700,
        website: "",
        shortDesc: "策略模拟战争游戏",
        description: "策略模拟战争游戏。\n\n主要玩法：\n? 模拟外交页面\n? 真实战争地图",
        notice: "暂时下架，可通过内测群浏览",
        updates: [
            { version: "v1.0.0", date: "2026-07-08", content: "网站正式上线" },
        ],
        screenshots: [
            "https://i.ibb.co/Rp36d16N/QQ20260709-131310.png",
            "https://i.ibb.co/nsdQcSsR/QQ20260709-131328.png",
            "https://i.ibb.co/N2qW70ZP/QQ20260709-131359.png"
        ],
        collaborators: [
            { id: "XM", name: "xiaomimimo", role: "逻辑搭建" },
            { id: "deep", name: "Deep Seek", role: "后续开发" }
        ]
    },
    foot: {
        id: "foot",
        name: "足球经济人",
        icon: "??",
        iconUrl: "https://i.ibb.co/SwHJpt9N/QQ20260804-155657.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "game",
        categoryName: "游戏",
        status: "online",
        statusText: "已上线",
        rank: 3,
        rating: 4.9,
        downloads: "5.2万",
        version: "1.16.0",
        views: 3200,
        website: "https://sevenseven712.github.io/QQ-football-game/",
        shortDesc: "足球经理人体验真实模拟经理人",
        description: "足球经理人是Seven戚个人创作的真实模拟当教练和经理人的游戏。\n\n主要玩法：\n? 购买转会球员\n? 炒作和吸粉\n? 建立自己的俱乐部\n? 带领队伍拿下超多奖项",
        notice: "",
        updates: [
            { version: "v1.0.0 ", date: "2026-04-25", content: "?已上线，欢迎游玩哦" },
        ],
        screenshots: [
            "https://i.ibb.co/n2qsM1M/QQ20260804-155946.png",
            "https://i.ibb.co/RTPXtqpQ/QQ20260804-160005.png",
            "https://i.ibb.co/Q7X0rT6y/QQ20260804-160019.png"
        ],
        collaborators: [
            { id: "XM", name: "xiaomimimo", role: "整体设计" },
            { id: "trae", name: "trae", role: "迭代更新" },
            { id: "deep", name: "deepseek", role: "代码整理" },
            { id: "sevenqi", name: "Seven戚", role: "版权管理" }
        ]
    },
    university: {
        id: "university",
        name: "蛙青大学",
        icon: "??",
        iconUrl: "https://i.ibb.co/2fp6Bkr/image.png",
        developerId: "waqing",
        developer: "蛙青工作室",
        category: "education",
        categoryName: "教育",
        status: "online",
        statusText: "已上线",
        rank: 3,
        rating: 4.7,
        downloads: "3.2万",
        version: "0.9.0",
        views: 3200,
        website: "https://sevenseven712.github.io/waqing/",
        shortDesc: "蛙青大学官方网站",
        description: "蛙青大学是一个有趣的民办三次元大学，有很多校园权威人士。\n\n主要功能：\n? 人工智能系博士\n? 数学教授\n? 理科博士\n? 超多奖项",
        notice: "",
        updates: [
            { version: "v1.0.0 ", date: "2026-04-25", content: "? UI重做\n? 优化论文适配\n? 加入我们！" }
        ],
        screenshots: [
            "https://i.ibb.co/6RZSqLww/QQ20260709-143747.png",
            "https://i.ibb.co/d0gMXfjD/QQ20260709-143848.png",
            "https://i.ibb.co/PG6x4vrc/QQ20260709-143835.png"
        ],
        collaborators: [
            { id: "XM", name: "xiaomimimo", role: "整体设计" }
        ]
    },
    ZDYB: {
        id: "ZDYB",
        name: "自定义博客",
        icon: "??",
        iconUrl: "https://i.ibb.co/bRJ0SSQ3/QQ20260709-151005.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "tools",
        categoryName: "工具",
        status: "error",
        statusText: "已下架",
        rank: 3,
        rating: 4.7,
        downloads: "4.1万",
        version: "1.0.0",
        views: 3200,
        website: "",
        shortDesc: "自定义DIY自己的博客",
        description: "Seven戚曾经说过：我希望以我自己的能力让所有人也能写出自己的网站。\n\n主要功能：\n? 自定义博客风格\n? 自定义内容\n? 更多功能.......",
        notice: "暂时无法访问，可通过内测群访问",
        updates: [
            { version: "v1.0.0 ", date: "2026-07-02", content: "网站正式上线" }
        ],
        screenshots: [
            "https://i.ibb.co/Kc7ZXJqr/QQ20260709-150552.png",
            "https://i.ibb.co/zVPZLjGm/QQ20260709-150935.png"
        ],
        collaborators: [
            { id: "XM", name: "xiaomimimo", role: "整体设计" }
        ]
    },
    tools: {
        id: "tools",
        name: "七七工具箱",
        icon: "??",
        iconUrl: "https://i.ibb.co/tpmCgcXw/image.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "tools",
        categoryName: "工具",
        status: "error",
        statusText: "已下架",
        rank: 5,
        rating: 4.9,
        downloads: "6.7万",
        version: "3.2.0",
        views: 6700,
        website: "",
        shortDesc: "集合各种实用小工具",
        description: "七七工具箱，一个顶一百个！集合了各种实用小工具，日常生活学习必备神器。\n\n主要功能：\n? 单位换算、计算器\n? 二维码生成/识别\n? 图片压缩、格式转换\n? 文字处理、密码生成\n? 更多工具持续更新中...",
        notice: "下线调整",
        updates: [
            { version: "v3.2.0", date: "2026-06-22", content: "? 新增5款实用工具\n? 优化工具加载速度" },
            { version: "v3.1.0", date: "2026-05-30", content: "? 全新工具分类\n? 赛博朋克模式\n? 修复若干问题" }
        ],
        screenshots: [
            "https://i.ibb.co/5WY9X4z7/image.png",
        ],
        collaborators: [
            { id: "deep", name: "Deep Seek", role: "应用开发" }
        ]
    },
    wx: {
        id: "wx",
        name: "微微信",
        icon: "??",
        iconUrl: "https://bizaladdin-image.baidu.com/0/pic/-1335079917_-2033055879_1922850240.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "tools",
        categoryName: "工具",
        status: "online",
        statusText: "已上线",
        rank: 5,
        rating: 4.9,
        downloads: "7.7万",
        version: "1.2.0",
        views: 6700,
        website: "https://sevenseven712.github.io/WX/",
        shortDesc: "高精度仿真微信的软件",
        description: "微微信＝单机版微信，日常生活学习必备神器。\n\n主要功能：\n? 模拟聊天页面\n? 整蛊好友\n? 模拟群聊\n? 更多工具持续更新中...",
        notice: "下线调整",
        updates: [
            { version: "v1.2.0", date: "2026-07-06", content: "? 修复了已知问题" },
            { version: "v1.0.0", date: "2026-07-05", content: "? 正式发布" }
        ],
        screenshots: [
            "https://i.ibb.co/t1BKtC6/QQ20260707-135134.png",
            "https://i.ibb.co/sdsY3wSb/QQ20260707-135344.png",
            "https://i.ibb.co/99ks2kMX/QQ20260707-135330.png"
        ],
        collaborators: [
            { id: "deep", name: "Deep Seek", role: "应用开发" },
            { id: "trae", name: "trae", role: "design设计" }
        ]
    },
    SP: {
        id: "SP",
        name: "七七视频网",
        icon: "??",
        iconUrl: "https://i.ibb.co/v6gnGS4V/QQ20260718-130318.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "tools",
        categoryName: "工具",
        status: "online",
        statusText: "已上线",
        rank: 5,
        rating: 4.9,
        downloads: "7.0万",
        version: "1.0.0",
        views: 6700,
        website: "https://sevenseven712.github.io/shipwang/#/home",
        shortDesc: "视频交友·类似B站",
        description: "休闲神器",
        notice: "",
        updates: [
            { version: "v1.0.0", date: "2026-07-18", content: "? 正式发布" },
        ],
        screenshots: [
            "https://i.ibb.co/Z6hqnRRm/QQ20260718-130338.png",
            "https://i.ibb.co/xSRNzrSZ/QQ20260718-130405.png",
        ],
        collaborators: [
            { id: "deep", name: "Deep Seek", role: "应用开发" },
            { id: "XM", name: "xiaomimimo", role: "框架设计" }
        ]
    },
    DLM: {
        id: "DLM",
        name: "edwardp20个人博客",
        icon: "??",
        iconUrl: "https://i.ibb.co/JwSr9fyt/edwardp20.png",
        developerId: "edwardp20",
        developer: "edwardp20",
        category: "me",
        categoryName: "个人",
        status: "online",
        statusText: "已上线",
        rank: 7,
        rating: 4.9,
        downloads: "1.7万",
        version: "3.2.0",
        views: 6700,
        website: "https://edwardp20.qzz.io",
        shortDesc: "edwardp20的个人博客，记录生活，大蓝莓天天开心哦！",
        description: "edwardp20的个人博客，记录生活,每天都要更新生活日志哦，哈哈哈。",
        notice: "",
        updates: [
            { version: "v1.0.0", date: "2026-06-28", content: "本网站正式展示" }
        ],
        screenshots: [
            "https://i.ibb.co/YBN9sxXP/image.png",
        ],
        collaborators: [],
    },
    ZB: {
        id: "ZB",
        name: "暗网开户模拟器",
        icon: "??",
        iconUrl: "https://i.ibb.co/rG9rVvjg/image.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "game",
        categoryName: "游戏",
        status: "error",
        statusText: "已上线",
        rank: 6,
        rating: 4.4,
        downloads: "1.2万",
        version: "1.0.0",
        views: 6700,
        website: "",
        shortDesc: "暗网模拟",
        description: "你是黑客你是黑客，你是什么？",
        notice: "下线调整",
        updates: [
            { version: "v1.0.0", date: "2026-06-22", content: "本网站正式展示" }
        ],
        screenshots: [
            "https://i.ibb.co/v6j0KP2R/1.png",
            "https://i.ibb.co/359w7njS/4.png",
        ],
        collaborators: [],
    },
    GRB: {
        id: "GRB",
        name: "Seven戚个人博客",
        icon: "??",
        iconUrl: "https://i.ibb.co/6Jf818gj/image.png",
        developerId: "sevenqi",
        developer: "Seven戚",
        category: "me",
        categoryName: "个人",
        status: "online",
        statusText: "已上线",
        rank: 6,
        rating: 4.4,
        downloads: "2.7万",
        version: "1.0.0",
        views: 6700,
        website: "https://sevenseven712.github.io/Seven712/",
        shortDesc: "Seven戚的个人博客",
        description: "Seven戚的个人博客支持多端互通，不过电脑端浏览效果最佳哦",
        notice: "",
        updates: [
            { version: "v1.0.0", date: "2026-07-02", content: "本网站正式展示" }
        ],
        screenshots: [
            "https://i.ibb.co/YF4jZd7b/image.png"
        ],
        collaborators: [],
    },
};

// ---------- 开发者数据 ----------
const DEVELOPERS = {
    sevenqi: {
        id: "sevenqi",
        name: "Seven戚",
        avatar: "七",
        avatarUrl: "https://i.ibb.co/Y4rD6F2Y/b-8ee0f1b16f3c823eeff690735ca17e1f.jpg",
        badge: "gold",
        badgeTitle: "网站站主专属",
        description: "七七软件商城站主 · 热爱编程的独立开发者",
        apps: ["video", "novel", "tools"]
    },
    waqing: {
        id: "waqing",
        name: "蛙青工作室",
        avatar: "??",
        avatarUrl: "https://i.ibb.co/2fp6Bkr/image.png",
        badge: "blue",
        badgeTitle: "企业认证",
        description: "蛙青编程系学生们的专属工作室",
        apps: ["university"]
    },
    edwardp20: {
        id: "edwardp20",
        name: "edwardp20",
        avatar: "大",
        avatarUrl: "https://i.ibb.co/JwSr9fyt/edwardp20.png",
        badge: "gray",
        badgeTitle: "个人开发者",
        description: "后端开发工程师",
        apps: ["DLM"]
    },
    XM: {
        id: "XM",
        name: "xiaomimimo",
        avatar: "小米",
        avatarUrl: "https://ecmb.bdimg.com/tam-ogel/128247567_1656370875_88_88.png",
        badge: "",
        badgeTitle: "合作开发者",
        description: "我的代码又快有专业，平均 1000token/s",
        apps: []
    },
    DouBao: {
        id: "DouBao",
        name: "豆包",
        avatar: "豆包",
        avatarUrl: "https://ecmb.bdimg.com/tam-ogel/-1033864735_1128582517_88_88.png",
        badge: "",
        badgeTitle: "合作开发者",
        description: "我能凭空写篇小说和文字在你网站里，网站效果你别问，别逗你豆姐笑了哈哈哈",
        apps: []
    },
    deep: {
        id: "deep",
        name: "Deep Seek",
        avatar: "前",
        avatarUrl: "https://i.ibb.co/svV16bq8/D.png",
        badge: "",
        badgeTitle: "合作开发者",
        description: "你好啊，我是全能的编程师（我AI味有点重555）",
        apps: []
    },
    trae: {
        id: "trae",
        name: "trae",
        avatar: "后",
        avatarUrl: "https://i.ibb.co/vx12R7Wk/TREA.png",
        badge: "",
        badgeTitle: "合作开发者",
        description: "我的代码速度很快很专业",
        apps: []
    },
    LG: {
        id: "LG",
        name: "灵光",
        avatar: "产",
        avatarUrl: "https://ecmb.bdimg.com/tam-ogel/1618607528_177283195_88_88.png",
        badge: "",
        badgeTitle: "合作开发者",
        description: "产品交付设计，以及UI",
        apps: []
    },
    ZZ: {
        id: "ZZ",
        name: "扣子",
        avatar: "产",
        avatarUrl: "https://ecmb.bdimg.com/tam-ogel/544271792_-2001000336_88_88.png",
        badge: "",
        badgeTitle: "合作开发者",
        description: "我会开发多端应用，如小程序，移动端和web端",
        apps: []
    }
};

// ---------- 社区帖子数据 ----------
const POSTS = [
    {
        id: 1,
        type: "official",
        username: "七七官方",
        avatar: "官",
        avatarUrl: "https://picsum.photos/seed/official/200/200",
        avatarColor: "linear-gradient(135deg,#FF3B30,#D70015)",
        badge: "red",
        badgeText: "官方",
        time: "2小时前",
        content: "??【重要公告】七七软件商城v2.0版本即将上线！\n\n全新社区功能、开发者认证体系、更流畅的体验...\n\n敬请期待！??\n\n#七七软件商城 #版本更新",
        likes: 328,
        comments: 56,
        shares: 12
    },
    {
        id: 2,
        type: "developer",
        username: "Seven戚",
        avatar: "七",
        avatarUrl: "https://picsum.photos/seed/sevenqi_avatar/200/200",
        avatarColor: "linear-gradient(135deg,#FFD700,#FFA500)",
        badge: "gold",
        badgeText: "站主",
        time: "5小时前",
        content: "七七视频解析v2.5已更新上线！\n\n这次优化了解析速度，提升了50%哦～\n大家快去试试吧！有问题随时反馈～\n\n#七七视频解析 #更新",
        likes: 156,
        comments: 32,
        shares: 8
    },
    {
        id: 3,
        type: "developer",
        username: "蛙青工作室",
        avatar: "??",
        avatarUrl: "https://picsum.photos/seed/waqing_avatar/200/200",
        avatarColor: "linear-gradient(135deg,#34C759,#30D158)",
        badge: "blue",
        badgeText: "企业",
        time: "昨天",
        content: "??蛙青大学内测招募中！\n\n我们正在寻找100名内测用户，抢先体验全新课程系统，还有专属福利哦～\n\n感兴趣的小伙伴评论区扣1！\n\n#蛙青大学 #内测招募",
        likes: 89,
        comments: 45,
        shares: 5
    }
];