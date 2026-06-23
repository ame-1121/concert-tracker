/**
 * 演唱会 & Livehouse 数据库
 *
 * 数据来源（需定期更新）：
 * - 各地文化和旅游局官网 - 营业性演出准予许可公示
 * - 大麦网、秀动、正在现场等票务平台
 * - 小红书 @不止live 等博主
 *
 * 数据结构：
 * {
 *   artistName: string,       // 歌手名称（用于匹配网易云歌单）
 *   artistAliases: string[],  // 别名/外文名
 *   concertName: string,      // 演出名称
 *   date: string,             // 演出日期 YYYY-MM-DD
 *   time: string,             // 演出时间
 *   city: string,             // 城市
 *   region: string,           // 地区（华东/华北/华南/华中/西南/西北/东北）
 *   venue: string,            // 场馆
 *   type: string,             // 演唱会 | Livehouse | 音乐节
 *   status: string,           // 已开票 | 即将开票 | 已售罄 | 待定
 *   ticketUrl: string,        // 购票链接
 *   posterUrl: string,        // 海报图
 *   source: string,           // 信息来源
 * }
 */

const concerts = [
  // ==================== 华东地区 ====================
  // -- 上海 --
  {
    artistName: "周杰伦",
    artistAliases: ["Jay Chou"],
    concertName: "周杰伦2026「嘉年华」世界巡回演唱会·上海站",
    date: "2026-07-18",
    time: "19:30",
    city: "上海",
    region: "华东",
    venue: "上海体育场",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "上海市文旅局营业性演出许可"
  },
  {
    artistName: "陈奕迅",
    artistAliases: ["Eason Chan"],
    concertName: "陈奕迅 FEAR AND DREAMS 世界巡回演唱会·上海站",
    date: "2026-07-25",
    time: "19:30",
    city: "上海",
    region: "华东",
    venue: "梅赛德斯-奔驰文化中心",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "上海市文旅局"
  },
  {
    artistName: "林俊杰",
    artistAliases: ["JJ Lin"],
    concertName: "林俊杰 JJ20 世界巡回演唱会·上海站",
    date: "2026-08-08",
    time: "19:30",
    city: "上海",
    region: "华东",
    venue: "上海体育场",
    type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "大麦网"
  },
  {
    artistName: "五月天",
    artistAliases: ["Mayday"],
    concertName: "五月天「回到那一天」25周年巡回演唱会·上海站",
    date: "2026-09-12",
    time: "18:30",
    city: "上海",
    region: "华东",
    venue: "上海体育场",
    type: "演唱会",
    status: "待定",
    ticketUrl: "",
    source: "上海市文旅局营业性演出许可"
  },
  {
    artistName: "告五人",
    artistAliases: ["Accusefive"],
    concertName: "告五人「宇宙的有趣」2026巡演·上海站",
    date: "2026-07-05",
    time: "20:00",
    city: "上海",
    region: "华东",
    venue: "Modern Sky Lab",
    type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动"
  },
  // -- 杭州 --
  {
    artistName: "邓紫棋",
    artistAliases: ["G.E.M.", "GEM"],
    concertName: "邓紫棋 I AM GLORIA 世界巡回演唱会·杭州站",
    date: "2026-08-15",
    time: "19:30",
    city: "杭州",
    region: "华东",
    venue: "杭州奥体中心体育场",
    type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "浙江省文旅厅"
  },
  {
    artistName: "万能青年旅店",
    artistAliases: ["万青", "Omnipotent Youth Society"],
    concertName: "万能青年旅店 2026夏季巡演·杭州站",
    date: "2026-07-12",
    time: "20:30",
    city: "杭州",
    region: "华东",
    venue: "66 LIVEHOUSE",
    type: "Livehouse",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动"
  },
  // -- 南京 --
  {
    artistName: "薛之谦",
    artistAliases: ["Joker Xue"],
    concertName: "薛之谦「天外来物」巡回演唱会·南京站",
    date: "2026-07-20",
    time: "19:00",
    city: "南京",
    region: "华东",
    venue: "南京奥体中心体育场",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "江苏省文旅厅"
  },
  {
    artistName: "李荣浩",
    artistAliases: [],
    concertName: "李荣浩「纵横四海」世界巡回演唱会·南京站",
    date: "2026-08-22",
    time: "19:30",
    city: "南京",
    region: "华东",
    venue: "南京青奥体育公园体育馆",
    type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "大麦网"
  },

  // ==================== 华北地区 ====================
  // -- 北京 --
  {
    artistName: "张杰",
    artistAliases: ["Jason Zhang"],
    concertName: "张杰 未·LIVE 巡回演唱会·北京站",
    date: "2026-07-26",
    time: "19:00",
    city: "北京",
    region: "华北",
    venue: "国家体育场（鸟巢）",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "北京市文旅局"
  },
  {
    artistName: "朴树",
    artistAliases: [],
    concertName: "朴树「好好地」2026北京演唱会",
    date: "2026-08-01",
    time: "19:30",
    city: "北京",
    region: "华北",
    venue: "凯迪拉克中心",
    type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "北京市文旅局营业性演出许可"
  },
  {
    artistName: "新裤子",
    artistAliases: ["New Pants"],
    concertName: "新裤子「我们最好的时光就是现在」北京专场",
    date: "2026-07-10",
    time: "20:30",
    city: "北京",
    region: "华北",
    venue: "疆进酒·OMNI SPACE",
    type: "Livehouse",
    status: "已售罄",
    ticketUrl: "",
    source: "秀动"
  },
  // -- 天津 --
  {
    artistName: "许嵩",
    artistAliases: ["Vae"],
    concertName: "许嵩「呼吸之野」巡回演唱会·天津站",
    date: "2026-09-05",
    time: "19:30",
    city: "天津",
    region: "华北",
    venue: "天津奥体中心体育场",
    type: "演唱会",
    status: "待定",
    ticketUrl: "",
    source: "天津市文旅局"
  },

  // ==================== 华南地区 ====================
  // -- 广州 --
  {
    artistName: "陈粒",
    artistAliases: [],
    concertName: "陈粒「洄游」2026巡回演唱会·广州站",
    date: "2026-07-19",
    time: "20:00",
    city: "广州",
    region: "华南",
    venue: "广州体育馆",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "广东省文旅厅"
  },
  {
    artistName: "五条人",
    artistAliases: ["Wu Tiao Ren"],
    concertName: "五条人「大时代歌厅」广州专场",
    date: "2026-08-08",
    time: "20:30",
    city: "广州",
    region: "华南",
    venue: "太空间 LIVEHOUSE",
    type: "Livehouse",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "秀动"
  },
  // -- 深圳 --
  {
    artistName: "陶喆",
    artistAliases: ["David Tao"],
    concertName: "陶喆 Soul Power II 巡回演唱会·深圳站",
    date: "2026-07-12",
    time: "19:30",
    city: "深圳",
    region: "华南",
    venue: "深圳湾体育中心",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "大麦网"
  },
  {
    artistName: "草东没有派对",
    artistAliases: ["No Party For Cao Dong"],
    concertName: "草东没有派对 2026巡演·深圳站",
    date: "2026-08-15",
    time: "20:30",
    city: "深圳",
    region: "华南",
    venue: "B10 LIVE",
    type: "Livehouse",
    status: "已售罄",
    ticketUrl: "",
    source: "秀动"
  },

  // ==================== 华中地区 ====================
  // -- 武汉 --
  {
    artistName: "华晨宇",
    artistAliases: ["Hua Chenyu"],
    concertName: "华晨宇 2026 火星演唱会·武汉站",
    date: "2026-07-25",
    time: "19:00",
    city: "武汉",
    region: "华中",
    venue: "武汉体育中心",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "湖北省文旅厅"
  },
  // -- 长沙 --
  {
    artistName: "张惠妹",
    artistAliases: ["aMEI", "A-Mei"],
    concertName: "张惠妹 ASMR 世界巡回演唱会·长沙站",
    date: "2026-08-01",
    time: "19:30",
    city: "长沙",
    region: "华中",
    venue: "长沙贺龙体育中心",
    type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "湖南省文旅厅"
  },

  // ==================== 西南地区 ====================
  // -- 成都 --
  {
    artistName: "赵雷",
    artistAliases: [],
    concertName: "赵雷「没有信号」2026巡演·成都站",
    date: "2026-07-05",
    time: "20:00",
    city: "成都",
    region: "西南",
    venue: "CH8冇独空间",
    type: "Livehouse",
    status: "已售罄",
    ticketUrl: "",
    source: "秀动"
  },
  {
    artistName: "李宇春",
    artistAliases: ["Chris Lee"],
    concertName: "李宇春「周末愉快」演唱会·成都站",
    date: "2026-08-08",
    time: "19:30",
    city: "成都",
    region: "西南",
    venue: "成都凤凰山体育公园",
    type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "四川省文旅厅"
  },
  // -- 重庆 --
  {
    artistName: "GAI周延",
    artistAliases: ["GAI"],
    concertName: "GAI周延 2026「烈火战马」演唱会·重庆站",
    date: "2026-07-18",
    time: "20:00",
    city: "重庆",
    region: "西南",
    venue: "重庆华熙LIVE·鱼洞",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "重庆市文旅委"
  },

  // ==================== 西北地区 ====================
  // -- 西安 --
  {
    artistName: "许巍",
    artistAliases: [],
    concertName: "许巍「无尽光芒」2026西安演唱会",
    date: "2026-07-19",
    time: "19:30",
    city: "西安",
    region: "西北",
    venue: "西安奥体中心",
    type: "演唱会",
    status: "即将开票",
    ticketUrl: "https://damai.cn",
    source: "陕西省文旅厅"
  },

  // ==================== 东北地区 ====================
  // -- 沈阳 --
  {
    artistName: "二手玫瑰",
    artistAliases: ["Second Hand Rose"],
    concertName: "二手玫瑰「玫瑰生活」2026沈阳演唱会",
    date: "2026-07-26",
    time: "19:30",
    city: "沈阳",
    region: "东北",
    venue: "辽宁体育馆",
    type: "演唱会",
    status: "已开票",
    ticketUrl: "https://damai.cn",
    source: "辽宁省文旅厅"
  },
  // -- 哈尔滨 --
  {
    artistName: "梁博",
    artistAliases: [],
    concertName: "梁博 2026 专场演唱会·哈尔滨站",
    date: "2026-08-15",
    time: "19:30",
    city: "哈尔滨",
    region: "东北",
    venue: "哈尔滨国际会展体育中心",
    type: "演唱会",
    status: "待定",
    ticketUrl: "",
    source: "黑龙江省文旅厅"
  },

  // ==================== 音乐节 ====================
  {
    artistName: "痛仰乐队",
    artistAliases: ["Miserable Faith", "痛仰"],
    concertName: "2026 草莓音乐节·杭州",
    date: "2026-07-26",
    time: "13:00",
    city: "杭州",
    region: "华东",
    venue: "杭州太子湾公园",
    type: "音乐节",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "摩登天空"
  },
  {
    artistName: "刺猬乐队",
    artistAliases: ["Hedgehog"],
    concertName: "2026 草莓音乐节·杭州",
    date: "2026-07-27",
    time: "13:00",
    city: "杭州",
    region: "华东",
    venue: "杭州太子湾公园",
    type: "音乐节",
    status: "已开票",
    ticketUrl: "https://www.showstart.com",
    source: "摩登天空"
  },
  {
    artistName: "马思唯",
    artistAliases: ["MaSiWei"],
    concertName: "2026 MDSK音乐节·成都站",
    date: "2026-08-22",
    time: "13:00",
    city: "成都",
    region: "西南",
    venue: "成都非遗博览园",
    type: "音乐节",
    status: "即将开票",
    ticketUrl: "https://www.showstart.com",
    source: "摩登天空"
  },
];

export default concerts;

/** 按地区分组 */
export function groupByRegion(concertList) {
  const groups = {};
  const order = ['华东', '华北', '华南', '华中', '西南', '西北', '东北'];

  concertList.forEach(c => {
    if (!groups[c.region]) {
      groups[c.region] = { region: c.region, concerts: [] };
    }
    groups[c.region].concerts.push(c);
  });

  // 每个地区内按时间排序
  Object.values(groups).forEach(g => {
    g.concerts.sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  // 按地区顺序返回
  return order
    .filter(r => groups[r])
    .map(r => groups[r]);
}

/** 匹配歌手 */
export function matchConcertsForArtists(concerts, artists) {
  const artistNameSet = new Set();
  artists.forEach(a => {
    artistNameSet.add(a.name.toLowerCase());
    (a.alias || []).forEach(al => artistNameSet.add(al.toLowerCase()));
  });

  return concerts.filter(c => {
    const names = [c.artistName, ...(c.artistAliases || [])];
    return names.some(n => artistNameSet.has(n.toLowerCase()));
  });
}
