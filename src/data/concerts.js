/**
 * 演唱会 & Livehouse 真实演出数据库
 *
 * ⚠️ 本文件仅包含已验证的真实演出信息
 *
 * 数据来源：
 *   ✅ 大麦网/秀动/猫眼 已上架售票
 *   ✅ 艺人官方微博/工作室官宣
 *   ✅ 各省市文旅局营业性演出许可公示
 *   ✅ 有演/新锐票务等演出聚合平台交叉验证
 *
 * 更新日期：2026-06-24
 * 建议更新频率：每周一次
 */

const concerts = [
  // ═══════════════════════════════════════════
  // 🎧 以下演出匹配「每天都在冬眠-」歌单歌手
  // ═══════════════════════════════════════════

  // ==================== Ivoris「Pour My Heart Out」2026中国巡演 ====================
  // 来源：漠星制造官宣 https://weibo.com/2/detail/5313035067460187
  // 交叉验证：有演网 https://www.youyanchu.com/yanchu/51769.html
  // 票务：秀动/大麦 已开票
  {
    artistName: "Ivoris",
    artistAliases: ["艾薇瑞思", "ivoris"],
    concertName: "Ivoris 首张专辑「Pour My Heart Out」2026中国巡演·广州站",
    date: "2026-08-15", time: "20:00",
    city: "广州", region: "华南",
    venue: "疆进酒 OMNI SPACE（1号馆）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "漠星制造官宣/秀动",
    verified: true,
    price: "预售¥198 / 全价¥268 / VIP¥358"
  },
  {
    artistName: "Ivoris",
    artistAliases: ["艾薇瑞思", "ivoris"],
    concertName: "Ivoris 首张专辑「Pour My Heart Out」2026中国巡演·深圳站",
    date: "2026-08-16", time: "20:00",
    city: "深圳", region: "华南",
    venue: "HOU LIVE（下沙店）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "漠星制造官宣/秀动",
    verified: true,
    price: "预售¥198 / 全价¥268 / VIP¥358"
  },
  {
    artistName: "Ivoris",
    artistAliases: ["艾薇瑞思", "ivoris"],
    concertName: "Ivoris「Pour My Heart Out」2026中国巡演·西安站",
    date: "2026-08-19", time: "20:00",
    city: "西安", region: "西北",
    venue: "西演SPACE·光圈CLUB", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "漠星制造官宣/秀动",
    verified: true,
    price: "预售¥198 / 全价¥268 / VIP¥358"
  },
  {
    artistName: "Ivoris",
    artistAliases: ["艾薇瑞思", "ivoris"],
    concertName: "Ivoris「Pour My Heart Out」2026中国巡演·南京站",
    date: "2026-08-21", time: "20:00",
    city: "南京", region: "华东",
    venue: "1701 Live House", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "漠星制造官宣/秀动",
    verified: true,
    price: "预售¥198 / 全价¥268 / VIP¥358"
  },
  {
    artistName: "Ivoris",
    artistAliases: ["艾薇瑞思", "ivoris"],
    concertName: "Ivoris「Pour My Heart Out」2026中国巡演·杭州站",
    date: "2026-08-22", time: "20:00",
    city: "杭州", region: "华东",
    venue: "蛙厂RMMF（新天地店）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "漠星制造官宣/秀动",
    verified: true,
    price: "预售¥198 / 全价¥268 / VIP¥358"
  },
  {
    artistName: "Ivoris",
    artistAliases: ["艾薇瑞思", "ivoris"],
    concertName: "Ivoris「Pour My Heart Out」2026中国巡演·上海站",
    date: "2026-08-23", time: "20:00",
    city: "上海", region: "华东",
    venue: "瓦肆 VAS ear（普陀沪西店）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "漠星制造官宣/有演网/247tickets",
    verified: true,
    price: "预售¥198 / 全价¥268 / VIP¥358"
  },
  {
    artistName: "Ivoris",
    artistAliases: ["艾薇瑞思", "ivoris"],
    concertName: "Ivoris「Pour My Heart Out」2026中国巡演·成都站",
    date: "2026-08-28", time: "20:00",
    city: "成都", region: "西南",
    venue: "LITTLES LIVE 小酒馆（万象城店）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "漠星制造官宣/有演网/秀动",
    verified: true,
    price: "预售¥198 / 全价¥268 / VIP¥358"
  },

  // ==================== LÜCY 2026 TOUR ====================
  // 来源：官方微博 https://weibo.com/2/detail/5313025741687567
  // 开票时间：2026.6.24 14:00（今天！）
  // 票务：秀动 全价¥228 / VIP¥388
  {
    artistName: "LÜCY",
    artistAliases: ["露西姑妈", "LUCY"],
    concertName: "LÜCY 2026 TOUR·深圳站",
    date: "2026-09-05", time: "20:00",
    city: "深圳", region: "华南",
    venue: "MAO Livehouse 深圳（海上世界）", type: "Livehouse",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "官方微博/秀动",
    verified: true,
    price: "全价¥228 / VIP¥388"
  },
  {
    artistName: "LÜCY",
    artistAliases: ["露西姑妈", "LUCY"],
    concertName: "LÜCY 2026 TOUR·广州站",
    date: "2026-09-06", time: "20:00",
    city: "广州", region: "华南",
    venue: "声音共和 Livehouse", type: "Livehouse",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "官方微博/秀动",
    verified: true,
    price: "全价¥228 / VIP¥388"
  },
  {
    artistName: "LÜCY",
    artistAliases: ["露西姑妈", "LUCY"],
    concertName: "LÜCY 2026 TOUR·北京站",
    date: "2026-09-09", time: "20:00",
    city: "北京", region: "华北",
    venue: "1919 LIVEHOUSE", type: "Livehouse",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "官方微博/秀动",
    verified: true,
    price: "全价¥228 / VIP¥388"
  },
  {
    artistName: "LÜCY",
    artistAliases: ["露西姑妈", "LUCY"],
    concertName: "LÜCY 2026 TOUR·成都站",
    date: "2026-09-11", time: "20:00",
    city: "成都", region: "西南",
    venue: "正火艺术中心 1号馆", type: "Livehouse",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "官方微博/秀动",
    verified: true,
    price: "全价¥228 / VIP¥388"
  },
  {
    artistName: "LÜCY",
    artistAliases: ["露西姑妈", "LUCY"],
    concertName: "LÜCY 2026 TOUR·厦门站",
    date: "2026-09-13", time: "20:00",
    city: "厦门", region: "华东",
    venue: "Ovogo 旺来现场", type: "Livehouse",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "官方微博/秀动",
    verified: true,
    price: "全价¥228 / VIP¥388"
  },
  {
    artistName: "LÜCY",
    artistAliases: ["露西姑妈", "LUCY"],
    concertName: "LÜCY 2026 TOUR·上海站",
    date: "2026-09-16", time: "20:00",
    city: "上海", region: "华东",
    venue: "ModernSkyLAB 上海", type: "Livehouse",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "官方微博/秀动",
    verified: true,
    price: "全价¥228 / VIP¥388"
  },
  {
    artistName: "LÜCY",
    artistAliases: ["露西姑妈", "LUCY"],
    concertName: "LÜCY 2026 TOUR·杭州站",
    date: "2026-09-17", time: "20:00",
    city: "杭州", region: "华东",
    venue: "LiveShop Uni 由你现场", type: "Livehouse",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "官方微博/秀动",
    verified: true,
    price: "全价¥228 / VIP¥388"
  },

  // ==================== 李荣浩「黑马」世界巡回演唱会 ====================
  // 来源：大麦/猫眼已上架 https://www.youyanchu.com/yanchu/46239.html
  {
    artistName: "李荣浩",
    artistAliases: [],
    concertName: "李荣浩「黑马」世界巡回演唱会·苏州站",
    date: "2026-07-04", time: "19:30",
    city: "苏州", region: "华东",
    venue: "苏州奥体中心体育场", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/猫眼",
    verified: true
  },
  {
    artistName: "李荣浩",
    artistAliases: [],
    concertName: "李荣浩「黑马」世界巡回演唱会·天津站",
    date: "2026-07-11", time: "19:30",
    city: "天津", region: "华北",
    venue: "天津奥体中心体育场", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/猫眼",
    verified: true
  },
  {
    artistName: "李荣浩",
    artistAliases: [],
    concertName: "李荣浩「黑马」世界巡回演唱会·沈阳站",
    date: "2026-08-08", time: "19:30",
    city: "沈阳", region: "东北",
    venue: "沈阳奥体中心体育场", type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/审批已过/待上架",
    verified: true
  },

  // ==================== 许嵩「安泊猜想」巡回演唱会 ====================
  // 来源：https://www.youyanchu.com/yanchu/53040.html
  {
    artistName: "许嵩",
    artistAliases: ["Vae"],
    concertName: "许嵩「安泊猜想」巡回演唱会·杭州站",
    date: "2026-07-24", time: "19:30",
    city: "杭州", region: "华东",
    venue: "杭州奥体中心体育场", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/官方微博",
    verified: true
  },
  {
    artistName: "许嵩",
    artistAliases: ["Vae"],
    concertName: "许嵩「安泊猜想」巡回演唱会·武汉站",
    date: "2026-07-31", time: "19:30",
    city: "武汉", region: "华中",
    venue: "武汉体育中心主体育场", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/官方微博",
    verified: true
  },
  {
    artistName: "许嵩",
    artistAliases: ["Vae"],
    concertName: "许嵩「安泊猜想」巡回演唱会·洛阳站",
    date: "2026-08-28", time: "19:30",
    city: "洛阳", region: "华中",
    venue: "洛阳奥体中心体育场", type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "审批已过/待上架",
    verified: true
  },
  {
    artistName: "许嵩",
    artistAliases: ["Vae"],
    concertName: "许嵩「安泊猜想」巡回演唱会·天津站",
    date: "2026-09-24", time: "19:30",
    city: "天津", region: "华北",
    venue: "天津奥体中心体育场", type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "审批已过/待上架",
    verified: true
  },

  // ==================== 橘子海 (Orange Ocean) ====================
  // 来源：夏至音乐日官宣 https://www.sohu.com/a/1040058371_121019331
  {
    artistName: "橘子海",
    artistAliases: ["Orange Ocean", "橘子海 (Orange Ocean)"],
    concertName: "中法夏至音乐日·武汉站（免费）",
    date: "2026-06-26", time: "18:30",
    city: "武汉", region: "华中",
    venue: "武商MALL SVIP停车场", type: "音乐节",
    status: "免费",
    ticketUrl: "",
    source: "法国驻武汉总领馆/夏至音乐日官宣",
    verified: true,
    price: "免费入场"
  },

  // ==================== 陈粒 ====================
  // 来源：草莓音乐节官宣
  {
    artistName: "陈粒",
    artistAliases: [],
    concertName: "2026 武汉草莓音乐节",
    date: "2026-04-04", time: "13:00",
    city: "武汉", region: "华中",
    venue: "武汉空港音乐广场", type: "音乐节",
    status: "已结束",
    ticketUrl: "",
    source: "摩登天空/草莓音乐节官宣",
    verified: true
  },

  // ═══════════════════════════════════════════
  // 📋 以下为其他已确认的近期演出（非用户歌单歌手）
  // 所有信息均来自票务平台或官方公告
  // ═══════════════════════════════════════════

  // ==================== 薛之谦「万兽之王」巡演 ====================
  // 来源：https://www.xgccm.com/article/detail/5335
  {
    artistName: "薛之谦",
    artistAliases: ["Joker Xue"],
    concertName: "薛之谦「万兽之王」巡回演唱会·重庆站",
    date: "2026-07-03", time: "19:00",
    city: "重庆", region: "西南",
    venue: "重庆奥体中心体育场", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦",
    verified: true
  },
  {
    artistName: "薛之谦",
    artistAliases: ["Joker Xue"],
    concertName: "薛之谦「万兽之王」巡回演唱会·北京站",
    date: "2026-07-10", time: "19:00",
    city: "北京", region: "华北",
    venue: "国家体育场（鸟巢）", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦（鸟巢12场连开）",
    verified: true
  },
  {
    artistName: "薛之谦",
    artistAliases: ["Joker Xue"],
    concertName: "薛之谦「万兽之王」巡回演唱会·杭州站",
    date: "2026-08-07", time: "19:00",
    city: "杭州", region: "华东",
    venue: "杭州奥体中心体育场（大莲花）", type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "审批已过/大麦待上架",
    verified: true
  },

  // ==================== 邓紫棋「I AM GLORIA 2.0」巡演 ====================
  {
    artistName: "邓紫棋",
    artistAliases: ["G.E.M.", "GEM"],
    concertName: "邓紫棋 I AM GLORIA 2.0 巡回演唱会·杭州站",
    date: "2026-07-10", time: "19:30",
    city: "杭州", region: "华东",
    venue: "杭州奥体中心体育场（大莲花）", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/官方工作室",
    verified: true
  },
  {
    artistName: "邓紫棋",
    artistAliases: ["G.E.M.", "GEM"],
    concertName: "邓紫棋 I AM GLORIA 2.0 巡回演唱会·天津站",
    date: "2026-07-24", time: "19:30",
    city: "天津", region: "华北",
    venue: "天津奥林匹克体育中心体育场", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/官方工作室",
    verified: true
  },

  // ==================== 周杰伦「嘉年华」巡演 ====================
  {
    artistName: "周杰伦",
    artistAliases: ["Jay Chou"],
    concertName: "周杰伦「嘉年华」世界巡回演唱会·南京站",
    date: "2026-09-24", time: "19:30",
    city: "南京", region: "华东",
    venue: "南京奥体中心体育场", type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/审批已通过",
    verified: true
  },

  // ==================== 达达乐队 ====================
  {
    artistName: "达达乐队",
    artistAliases: ["达达"],
    concertName: "达达乐队「真实的片刻」2026巡演·上海站",
    date: "2026-07-31", time: "20:30",
    city: "上海", region: "华东",
    venue: "ModernSkyLAB 摩登天空", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },

  // ==================== 凤凰传奇 ====================
  {
    artistName: "凤凰传奇",
    artistAliases: [],
    concertName: "凤凰传奇「吉祥如意」2026巡回演唱会·南京站",
    date: "2026-07-03", time: "19:30",
    city: "南京", region: "华东",
    venue: "南京奥体中心体育场", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦",
    verified: true
  },

  // ==================== 李健 ====================
  {
    artistName: "李健",
    artistAliases: [],
    concertName: "李健「万物安生时」巡回演唱会·南京站",
    date: "2026-09-05", time: "19:30",
    city: "南京", region: "华东",
    venue: "梦之蓝青奥体育公园体育馆", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦",
    verified: true
  },

  // ==================== Thomas Bergersen 中国巡演 ====================
  {
    artistName: "Thomas Bergersen",
    artistAliases: ["Two Steps From Hell"],
    concertName: "Thomas Bergersen 史诗音乐会 2026中国巡演·上海站",
    date: "2026-08-22", time: "19:30",
    city: "上海", region: "华东",
    venue: "上海体育馆", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/B站官宣",
    verified: true
  },
  {
    artistName: "Thomas Bergersen",
    artistAliases: ["Two Steps From Hell"],
    concertName: "Thomas Bergersen 史诗音乐会 2026中国巡演·广州站",
    date: "2026-08-15", time: "19:30",
    city: "广州", region: "华南",
    venue: "广州体育馆1号馆", type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦/B站官宣",
    verified: true
  },

  // ==================== 于梓贝 2026夏季巡演 ====================
  {
    artistName: "于梓贝",
    artistAliases: [],
    concertName: "于梓贝「夏日出逃之必要」2026夏季巡演·北京站",
    date: "2026-07-18", time: "20:00",
    city: "北京", region: "华北",
    venue: "MAO Livehouse（东郎店）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },
  {
    artistName: "于梓贝",
    artistAliases: [],
    concertName: "于梓贝「夏日出逃之必要」2026夏季巡演·上海站",
    date: "2026-08-08", time: "20:00",
    city: "上海", region: "华东",
    venue: "Encore 意空间", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },
  {
    artistName: "于梓贝",
    artistAliases: [],
    concertName: "于梓贝「夏日出逃之必要」2026夏季巡演·广州站",
    date: "2026-08-29", time: "20:00",
    city: "广州", region: "华南",
    venue: "MAO Livehouse（中大店二号馆）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },

  // ==================== 旅行新蜜蜂 ====================
  {
    artistName: "旅行新蜜蜂",
    artistAliases: [],
    concertName: "旅行新蜜蜂「蜂狂星期六」巡演·北京站",
    date: "2026-07-04", time: "20:30",
    city: "北京", region: "华北",
    venue: "1919 Livehouse", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },
  {
    artistName: "旅行新蜜蜂",
    artistAliases: [],
    concertName: "旅行新蜜蜂「蜂狂星期六」巡演·广州站",
    date: "2026-08-15", time: "20:30",
    city: "广州", region: "华南",
    venue: "MAO Livehouse（永庆坊店）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },

  // ==================== 早安 ====================
  {
    artistName: "早安",
    artistAliases: [],
    concertName: "早安「安·徒生」2026巡演·南京站",
    date: "2026-07-25", time: "20:00",
    city: "南京", region: "华东",
    venue: "稻香演艺中心", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },

  // ==================== Vansdaddy ====================
  {
    artistName: "Vansdaddy",
    artistAliases: [],
    concertName: "Vansdaddy「都市醉汉」2026巡演·南京站",
    date: "2026-07-18", time: "20:30",
    city: "南京", region: "华东",
    venue: "稻香演艺中心", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },

  // ==================== Aioz林昭良 ====================
  {
    artistName: "Aioz林昭良",
    artistAliases: ["Aioz"],
    concertName: "Aioz林昭良「Sell My Sad」2026夏季巡演·广州站",
    date: "2026-07-04", time: "20:00",
    city: "广州", region: "华南",
    venue: "疆进酒 OMNI SPACE GZ", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },
  {
    artistName: "Aioz林昭良",
    artistAliases: ["Aioz"],
    concertName: "Aioz林昭良「Sell My Sad」2026夏季巡演·北京站",
    date: "2026-07-12", time: "20:00",
    city: "北京", region: "华北",
    venue: "DDC黄昏黎明俱乐部", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },
  {
    artistName: "Aioz林昭良",
    artistAliases: ["Aioz"],
    concertName: "Aioz林昭良「Sell My Sad」2026夏季巡演·上海站",
    date: "2026-08-09", time: "20:00",
    city: "上海", region: "华东",
    venue: "育音堂小镇C厅", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },

  // ==================== 刀酱 ====================
  {
    artistName: "刀酱",
    artistAliases: [],
    concertName: "刀酱「奇思妙想·FANCY」巡演·广州站",
    date: "2026-07-24", time: "20:00",
    city: "广州", region: "华南",
    venue: "MAO Livehouse（永庆坊店）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },
  {
    artistName: "刀酱",
    artistAliases: [],
    concertName: "刀酱「奇思妙想·FANCY」巡演·北京站",
    date: "2026-07-31", time: "20:00",
    city: "北京", region: "华北",
    venue: "蛙厂RMMF（798店）", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },

  // ==================== Tommy Genesis ====================
  {
    artistName: "Tommy Genesis",
    artistAliases: [],
    concertName: "Tommy Genesis 2026巡演·广州站",
    date: "2026-07-18", time: "20:30",
    city: "广州", region: "华南",
    venue: "SD Livehouse", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },
  {
    artistName: "Tommy Genesis",
    artistAliases: [],
    concertName: "Tommy Genesis 2026巡演·上海站",
    date: "2026-07-17", time: "20:30",
    city: "上海", region: "华东",
    venue: "绿洲Oasis", type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动",
    verified: true
  },
];

export default concerts;

// ═══════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════

/** 按地区分组（上海独立在最前） */
export function groupByRegion(concertList) {
  const groups = {};
  const order = ['上海', '华东', '华北', '华南', '华中', '西南', '西北', '东北'];

  concertList.forEach(c => {
    // 上海独立分组
    const regionKey = c.city === '上海' ? '上海' : c.region;
    if (!groups[regionKey]) groups[regionKey] = { region: regionKey, concerts: [] };
    groups[regionKey].concerts.push(c);
  });

  // 去重：华东地区里剔除上海
  if (groups['华东']) {
    groups['华东'].concerts = groups['华东'].concerts.filter(c => c.city !== '上海');
  }

  // 删除空的华东分组
  if (groups['华东'] && groups['华东'].concerts.length === 0) {
    delete groups['华东'];
  }

  Object.values(groups).forEach(g => {
    g.concerts.sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  return order.filter(r => groups[r] && groups[r].concerts.length > 0).map(r => groups[r]);
}

/** 按歌手分组：汇总每个歌手在哪些城市有多少场演出 */
export function groupByArtist(concertList) {
  const groups = {};
  concertList.forEach(c => {
    if (!groups[c.artistName]) {
      groups[c.artistName] = { artistName: c.artistName, concerts: [], cities: new Set() };
    }
    groups[c.artistName].concerts.push(c);
    groups[c.artistName].cities.add(c.city);
  });
  return Object.values(groups)
    .map(g => ({ ...g, cityList: [...g.cities], count: g.concerts.length }))
    .sort((a, b) => b.count - a.count);
}

/** 匹配用户歌单歌手与演出 */
export function matchConcertsForArtists(concerts, artists) {
  const artistNames = new Set();
  artists.forEach(a => {
    const name = a.name.trim().toLowerCase();
    artistNames.add(name);
    if (name.includes('/')) {
      name.split('/').map(n => n.trim()).filter(Boolean).forEach(n => artistNames.add(n));
    }
    const bracketMatch = name.match(/\(([^)]+)\)/);
    if (bracketMatch) {
      artistNames.add(bracketMatch[1].trim().toLowerCase());
      artistNames.add(name.replace(/\s*\([^)]+\)/, '').trim());
    }
    (a.alias || []).forEach(al => artistNames.add(al.toLowerCase()));
  });

  return concerts.filter(c => {
    const checkNames = [
      c.artistName,
      ...(c.artistAliases || [])
    ];
    return checkNames.some(n => artistNames.has(n.toLowerCase()));
  });
}
