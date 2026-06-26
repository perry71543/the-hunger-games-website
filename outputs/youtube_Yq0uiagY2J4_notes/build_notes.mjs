import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/jingmei_g/Documents/the hunger games website/outputs/youtube_Yq0uiagY2J4_notes";
const outputPath = path.join(outputDir, "Codex外掛影片筆記_Yq0uiagY2J4.xlsx");

const palette = {
  ink: "#1F2937",
  muted: "#6B7280",
  green: "#0F766E",
  green2: "#CCFBF1",
  blue: "#2563EB",
  blue2: "#DBEAFE",
  amber: "#B45309",
  amber2: "#FEF3C7",
  rose: "#BE123C",
  rose2: "#FFE4E6",
  gray: "#F3F4F6",
  line: "#D1D5DB",
  white: "#FFFFFF",
};

const video = {
  title: "10個必裝Codex外掛,讓AI強大10倍! 0代碼基礎也能一句話做影片、縮圖、簡報、App、操控你的電腦",
  channel: "七七行銷筆記",
  url: "https://www.youtube.com/watch?v=Yq0uiagY2J4",
  channelUrl: "http://www.youtube.com/@77MediaBook",
  publishDate: "2026-06-23",
  duration: "11:12",
  viewCount: 3031,
  likeCount: 113,
  collectedAt: "2026-06-26",
};

const sectionNotes = [
  ["00:00-01:07", "開場與分類", "影片主張 10 個 Codex 外掛能把內容創作、辦公提效、設計開發流程大幅加速，並強調一鍵安裝、零代碼也能上手。", "先挑和自己日常任務最貼近的 2-3 個外掛試用，不必一次全裝。"],
  ["01:08-03:17", "HyperFrames", "示範用提示詞產出影片、動畫、字幕、轉場等內容。講者提醒只給文字提示時效果有限，素材、腳本、風格描述越完整，成品越好。", "先用 ChatGPT 寫好影片腳本與畫面需求，再把完整 prompt 交給 HyperFrames。"],
  ["03:17-04:51", "Canva", "用 Codex 裡的 Canva 外掛生成縮圖/視覺稿，並透過人物照、過往封面與參考圖來維持品牌風格。可反覆用自然語言修改，也可開啟可視化連結微調。", "把人物、參考封面、主標/副標、風格關鍵字一起提供；第一版後用具體改動指令迭代。"],
  ["04:53-06:31", "Presentations", "做資料型簡報時，講者推薦先讓外掛查資料與規劃每頁結構，再確認後生成完整簡報。成品包含圖表、來源與一致版式。", "不要直接要求成稿；先要求研究、頁面大綱、數據來源與圖表形式。"],
  ["06:31-07:39", "Spreadsheets", "用表格外掛把混亂的開銷紀錄整理為日期、項目、類別、金額欄位，並自動分類、計算總額/比例與產生圖表。", "適合整理記帳、業務名單、銷售數據、問卷資料等不規則原始資料。"],
  ["07:39-08:39", "Computer Use / Chrome", "這組外掛讓 Codex 可操作電腦或瀏覽器，例如打開頁面、輸入文字、點擊、上傳圖片等。講者也提醒要謹慎授權。", "只交辦低風險任務；避免銀行、支付、密碼或敏感個資流程。"],
  ["08:40-09:36", "Product Design", "針對 Codex UI 設計能力補強：輸入想法與參考網站，外掛會先確認偏好，再整理素材、生成 UI 與可用網站示例。", "先給參考風格與受眾/功能需求，讓它在開始前確認視覺方向。"],
  ["09:36-10:42", "App Builders", "講者把 Web、iOS、Android App 建立分成對應外掛。示範番茄鐘應用：先設計 UI，再讓對應外掛做成可點擊、可計時、可記錄的應用。", "先用 Product Design 產出方向，再把選中的畫面交給 Web/iOS/Android 對應外掛開發。"],
  ["10:42-11:12", "結尾與資料包", "總結所有外掛都可一鍵安裝、零代碼使用，並引導觀眾領取外掛指南與加入直播群。", "把影片當作工具地圖；真正落地時要從自己的高頻工作場景挑工具。"],
];

const plugins = [
  [1, "內容創作", "HyperFrames", "影片、動畫、短片、字幕/轉場", "用一句話或完整 prompt 生成影片檔，適合社群短片與教學動畫。", "安裝後在對話框 @ 外掛；先準備腳本、畫面、風格、比例、時長。", "只給文字提示時，畫面可能平淡；素材越完整越好。", "01:08-03:17", "高"],
  [2, "內容創作", "Canva", "縮圖、封面、社群視覺、簡報視覺", "比直接在 Canva AI 裡生成更能結合 Codex 的上下文與迭代。", "上傳人物圖/參考圖，明確主標、副標、風格，再要求修改。", "第一版需人工審稿；細節可用可視化連結或框選修改。", "03:17-04:51", "高"],
  [3, "辦公提效", "Presentations", "商業簡報、週報、月報、提案", "可查資料、搭架構、生成圖表與完整簡報；適合資料型簡報。", "先讓它規劃每頁主張、數據、圖表與來源，再生成簡報。", "資料型內容要查證來源；不要跳過大綱確認。", "04:53-06:31", "高"],
  [4, "辦公提效", "Spreadsheets", "整理亂資料、分類、計算、圖表", "可把不規則紀錄轉成乾淨表格，自動分類並產生圖表。", "貼上原始紀錄，指定欄位、分類規則、統計與圖表需求。", "需要抽查分類是否符合你的口徑。", "06:31-07:39", "高"],
  [5, "辦公提效", "Computer Use", "操作桌面應用、搬運資料、跨工具流程", "讓 Codex 能像人一樣操作電腦介面。", "初次使用需授權；從低風險、可回復任務開始。", "不要用於銀行、支付、密碼或敏感資訊。", "07:39-08:39", "中"],
  [6, "辦公提效", "Chrome", "瀏覽器操作、填表、貼文、網站任務", "可直接控制瀏覽器，執行開頁、輸入、點擊、上傳等動作。", "明確指定網址、欄位、操作順序和完成標準。", "網站登入與發布前仍要人工確認。", "07:39-08:39", "中"],
  [7, "設計開發", "Product Design", "UI 設計、視覺探索、產品頁/電商頁", "改善 Codex 做 UI 時的視覺品質，可先確認風格再生成。", "提供想法、目標用戶、參考網站、品牌/配色偏好。", "先對齊風格與資訊架構，再要求產出。", "08:40-09:36", "高"],
  [8, "設計開發", "Build Web Apps", "網頁工具、互動網站、Web App", "把設計或想法變成可點可用的網頁應用。", "選定 Product Design 產出的畫面後，交給 Web App 外掛實作。", "第一版常有細節待修；要保留迭代清單。", "09:36-10:42", "中"],
  [9, "設計開發", "Build iOS Apps", "iPhone App 原型/應用", "將同一個想法轉成 iOS App 方向。", "用相同需求調用 iOS 對應外掛，指定手機操作流程。", "仍需檢查平台互動與發布要求。", "09:45-10:29", "中"],
  [10, "設計開發", "Build Android Apps", "Android App 原型/應用", "將同一個想法轉成 Android App 方向。", "用相同需求調用 Android 對應外掛，指定手機操作流程。", "不同裝置尺寸與權限需要另外驗證。", "09:45-10:29", "中"],
];

const actions = [
  ["今天就能做", "選 2 個外掛", "根據你的工作挑最痛的場景：影片/設計選 HyperFrames 或 Canva；資料/辦公選 Presentations 或 Spreadsheets。", "高", "今天"],
  ["今天就能做", "建立素材包", "把品牌圖、人物照、過往作品、參考風格、常用文案放成資料夾，供 Canva/Product Design/HyperFrames 使用。", "高", "今天"],
  ["簡報流程", "先規劃再生成", "資料型簡報先讓 Presentations 查資料、列頁面主張、圖表形式與來源，確認後再做成稿。", "高", "下次簡報前"],
  ["資料流程", "把亂資料交給 Spreadsheets", "將開銷、名單、銷售、問卷等原始內容貼入，要求統一欄位、分類、計算、視覺化。", "中", "本週"],
  ["安全控管", "限制可操作範圍", "Computer Use/Chrome 只用於非敏感任務；登入、付款、刪除、發布前保留人工確認。", "高", "每次使用前"],
  ["開發流程", "先設計 UI，再做 App", "先用 Product Design 取得視覺方向，再交給 Web/iOS/Android 外掛實作，可降低返工。", "中", "做 App 前"],
  ["品質控管", "建立驗收清單", "檢查文字、來源、圖片授權、按鈕功能、資料計算、手機/桌面顯示，再交付或發布。", "高", "每次輸出後"],
];

const promptTemplates = [
  ["HyperFrames", "請根據以下主題產出一支 9:16、約 30 秒的短片。目標觀眾是 [受眾]，風格是 [風格]，語言使用繁體中文。請包含每一幕畫面、字幕文案、轉場、音效/節奏建議，並輸出可生成影片的完整 prompt。"],
  ["Canva", "請用我提供的人物圖與參考封面，設計一張 [平台/尺寸] 封面。主標是「[主標]」，副標是「[副標]」。風格參考 [參考圖特徵]，人物需去背，標題要大且易讀，請先給第一版並保留可調整連結。"],
  ["Presentations", "我要做一份 [主題] 的 [頁數] 頁簡報。請先不要直接生成簡報，先幫我查資料、建立每頁架構，列出每頁主張、需要的數據、圖表形式、資料來源與設計建議，等我確認後再生成。"],
  ["Spreadsheets", "以下是混亂的原始資料，請整理成表格，欄位包含 [欄位清單]。請統一日期/格式、補上合理分類、計算總額與比例，並建立一張適合閱讀的圖表。請保留可追溯的原始資料欄。"],
  ["Computer Use / Chrome", "請幫我在 [網站/應用] 完成 [任務]。限制：不要處理密碼、付款或敏感資料；送出/發布前先停下來讓我確認。請逐步操作並在完成後回報你做了哪些事。"],
  ["Product Design", "請為 [產品/網站/App] 設計 UI。目標用戶是 [受眾]，核心任務是 [任務]，參考風格是 [參考網站/截圖]。開始前先確認資訊架構、視覺方向、互動狀態與需要的素材。"],
  ["Build Web/iOS/Android Apps", "請根據我選定的第 [編號] 個設計，製作一個 [Web/iOS/Android] 應用。必備功能包括 [功能清單]，需要支援 [互動/資料保存/圖表]。完成後請提供可測試版本並列出待修細節。"],
];

const terms = [
  ["HyperFrames", "轉錄曾出現 HypeFriends，依 Codex 外掛脈絡校正為 HyperFrames。"],
  ["ChatGPT", "轉錄曾出現 GBT，語境為請 ChatGPT 協助撰寫 prompt。"],
  ["生成", "轉錄多處出現「深層」，語境為 AI 生成內容。"],
  ["程式碼", "轉錄曾出現「城市碼」，語境為不需要寫程式碼。"],
  ["Computer Use / Chrome", "轉錄音近為 Compute to Use Crown，依段落內容推定為 Computer Use 與 Chrome 兩個操控類外掛。"],
  ["Product Design", "轉錄曾出現 Perdad/Predactor Design，依 Codex 外掛名稱校正。"],
  ["Build Web Apps / Build iOS Apps / Build Android Apps", "影片最後三個 App 建立外掛的名稱由語境推定；不同 Codex 版本可能顯示略有差異。"],
];

function setColWidths(sheet, widths) {
  widths.forEach((width, idx) => {
    sheet.getRangeByIndexes(0, idx, 1, 1).format.columnWidth = width;
  });
}

function styleTitle(sheet, range, title) {
  const r = sheet.getRange(range);
  r.merge();
  r.values = [[title]];
  r.format = {
    fill: palette.green,
    font: { bold: true, color: palette.white, size: 16 },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
  r.format.rowHeight = 30;
}

function styleHeader(range, fill = palette.blue) {
  range.format = {
    fill,
    font: { bold: true, color: palette.white },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
  };
  range.format.borders = { preset: "outside", style: "thin", color: palette.line };
}

function styleBody(range) {
  range.format = {
    font: { color: palette.ink, size: 10 },
    verticalAlignment: "top",
    wrapText: true,
  };
  range.format.borders = {
    insideHorizontal: { style: "thin", color: "#E5E7EB" },
    insideVertical: { style: "thin", color: "#EEF2F7" },
    top: { style: "thin", color: palette.line },
    bottom: { style: "thin", color: palette.line },
  };
}

function addNote(sheet, range, value, fill = palette.amber2) {
  const r = sheet.getRange(range);
  r.merge();
  r.values = [[value]];
  r.format = {
    fill,
    font: { color: palette.ink, italic: true },
    wrapText: true,
    verticalAlignment: "top",
  };
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const workbook = Workbook.create();

const overview = workbook.worksheets.add("影片總覽");
overview.showGridLines = false;
setColWidths(overview, [16, 46, 18, 22, 18, 18]);
styleTitle(overview, "A1:F1", "Codex 外掛影片筆記");
overview.getRange("A3:B12").values = [
  ["影片標題", video.title],
  ["頻道", video.channel],
  ["影片網址", video.url],
  ["頻道網址", video.channelUrl],
  ["發布日期", video.publishDate],
  ["影片長度", video.duration],
  ["觀看數", video.viewCount],
  ["喜歡數", video.likeCount],
  ["整理日期", video.collectedAt],
  ["轉錄方式", "影片無字幕/自動字幕；以音訊轉錄後整理為摘要筆記。"],
];
overview.getRange("A3:A12").format = { fill: palette.gray, font: { bold: true, color: palette.ink }, verticalAlignment: "top" };
overview.getRange("B3:B12").format = { wrapText: true, verticalAlignment: "top", font: { color: palette.ink } };
overview.getRange("A3:B12").format.borders = { preset: "all", style: "thin", color: palette.line };
overview.getRange("A14:F14").values = [["核心結論", "內容創作外掛", "辦公提效外掛", "設計開發外掛", "總外掛數", "最適合先試"]];
styleHeader(overview.getRange("A14:F14"), palette.green);
overview.getRange("A15:F15").values = [[
  "先從高頻任務切入：影片/封面/簡報/表格能最快看到效率差異；能控制電腦的外掛則要特別注意授權與安全界線。",
  null,
  null,
  null,
  null,
  "Canva、Presentations、Spreadsheets、Product Design",
]];
overview.getRange("B15").formulas = [["=COUNTIF('外掛速查'!B2:B11,\"內容創作\")"]];
overview.getRange("C15").formulas = [["=COUNTIF('外掛速查'!B2:B11,\"辦公提效\")"]];
overview.getRange("D15").formulas = [["=COUNTIF('外掛速查'!B2:B11,\"設計開發\")"]];
overview.getRange("E15").formulas = [["=COUNTA('外掛速查'!C2:C11)"]];
overview.getRange("A15:F15").format = { fill: palette.green2, font: { color: palette.ink }, wrapText: true, verticalAlignment: "top" };
overview.getRange("A15:F15").format.borders = { preset: "all", style: "thin", color: palette.line };
overview.getRange("B15:E15").format = { fill: palette.blue2, font: { bold: true, color: palette.ink, size: 14 }, horizontalAlignment: "center" };
overview.getRange("A17:F17").values = [["使用提醒", "本筆記為影片內容摘要與整理，非完整逐字稿。外掛名稱以影片語境與 Codex 常見命名校正；若你的 Codex 介面顯示略不同，請以實際插件商店名稱為準。", "", "", "", ""]];
overview.getRange("B17:F17").merge();
overview.getRange("A17:F17").format = { fill: palette.amber2, font: { color: palette.ink }, wrapText: true, verticalAlignment: "top" };
overview.getRange("A17").format.font = { bold: true, color: palette.amber };

const pluginSheet = workbook.worksheets.add("外掛速查");
pluginSheet.showGridLines = false;
setColWidths(pluginSheet, [6, 12, 22, 24, 38, 38, 34, 14, 10]);
pluginSheet.getRange("A1:I1").values = [["#", "分類", "外掛", "主要用途", "影片重點", "建議用法", "注意事項", "時間碼", "優先度"]];
pluginSheet.getRange("A2:I11").values = plugins;
styleHeader(pluginSheet.getRange("A1:I1"), palette.blue);
styleBody(pluginSheet.getRange("A2:I11"));
pluginSheet.getRange("A2:A11").format.horizontalAlignment = "center";
pluginSheet.getRange("I2:I11").format.horizontalAlignment = "center";
pluginSheet.freezePanes.freezeRows(1);
pluginSheet.tables.add("A1:I11", true, "PluginQuickLookup").style = "TableStyleMedium2";

const sectionSheet = workbook.worksheets.add("時間碼筆記");
sectionSheet.showGridLines = false;
setColWidths(sectionSheet, [16, 20, 62, 48]);
sectionSheet.getRange("A1:D1").values = [["時間碼", "段落", "重點摘要", "可採取行動"]];
sectionSheet.getRange(`A2:D${sectionNotes.length + 1}`).values = sectionNotes;
styleHeader(sectionSheet.getRange("A1:D1"), palette.green);
styleBody(sectionSheet.getRange(`A2:D${sectionNotes.length + 1}`));
sectionSheet.freezePanes.freezeRows(1);
sectionSheet.tables.add(`A1:D${sectionNotes.length + 1}`, true, "SectionNotes").style = "TableStyleMedium4";

const actionSheet = workbook.worksheets.add("行動清單");
actionSheet.showGridLines = false;
setColWidths(actionSheet, [16, 26, 64, 12, 16]);
actionSheet.getRange("A1:E1").values = [["情境", "行動", "做法", "優先度", "時機"]];
actionSheet.getRange(`A2:E${actions.length + 1}`).values = actions;
styleHeader(actionSheet.getRange("A1:E1"), palette.amber);
styleBody(actionSheet.getRange(`A2:E${actions.length + 1}`));
actionSheet.freezePanes.freezeRows(1);
actionSheet.tables.add(`A1:E${actions.length + 1}`, true, "ActionList").style = "TableStyleMedium7";

const promptSheet = workbook.worksheets.add("提示詞模板");
promptSheet.showGridLines = false;
setColWidths(promptSheet, [24, 96]);
promptSheet.getRange("A1:B1").values = [["適用外掛", "可複用提示詞模板"]];
promptSheet.getRange(`A2:B${promptTemplates.length + 1}`).values = promptTemplates;
styleHeader(promptSheet.getRange("A1:B1"), palette.rose);
styleBody(promptSheet.getRange(`A2:B${promptTemplates.length + 1}`));
promptSheet.getRange(`A2:B${promptTemplates.length + 1}`).format.rowHeight = 42;
promptSheet.freezePanes.freezeRows(1);
promptSheet.tables.add(`A1:B${promptTemplates.length + 1}`, true, "PromptTemplates").style = "TableStyleMedium3";

const termsSheet = workbook.worksheets.add("校正與來源");
termsSheet.showGridLines = false;
setColWidths(termsSheet, [28, 82]);
termsSheet.getRange("A1:B1").values = [["校正詞", "說明"]];
termsSheet.getRange(`A2:B${terms.length + 1}`).values = terms;
styleHeader(termsSheet.getRange("A1:B1"), palette.green);
styleBody(termsSheet.getRange(`A2:B${terms.length + 1}`));
addNote(termsSheet, `A${terms.length + 3}:B${terms.length + 7}`, [
  "來源：YouTube 影片頁面與音訊轉錄整理。\n",
  `影片：${video.url}\n`,
  `頻道：${video.channelUrl}\n`,
  "限制：原影片未提供字幕/自動字幕；本檔以語音轉錄後做摘要與名詞校正，非完整逐字稿。"
].join(""));
termsSheet.getRange(`A${terms.length + 3}:B${terms.length + 7}`).format.rowHeight = 24;

const statsSheet = workbook.worksheets.add("分類統計");
statsSheet.showGridLines = false;
setColWidths(statsSheet, [18, 14, 32]);
statsSheet.getRange("A1:C1").values = [["分類", "外掛數", "代表外掛"]];
statsSheet.getRange("A2:C4").values = [
  ["內容創作", null, "HyperFrames、Canva"],
  ["辦公提效", null, "Presentations、Spreadsheets、Computer Use、Chrome"],
  ["設計開發", null, "Product Design、Build Web/iOS/Android Apps"],
];
statsSheet.getRange("B2").formulas = [["=COUNTIF('外掛速查'!B2:B11,A2)"]];
statsSheet.getRange("B2:B4").fillDown();
styleHeader(statsSheet.getRange("A1:C1"), palette.blue);
styleBody(statsSheet.getRange("A2:C4"));
statsSheet.tables.add("A1:C4", true, "CategoryStats").style = "TableStyleMedium2";
const chart = statsSheet.charts.add("bar", statsSheet.getRange("A1:B4"));
chart.title = "影片提到的外掛分類";
chart.hasLegend = false;
chart.xAxis = { axisType: "textAxis", textStyle: { fontSize: 10 } };
chart.yAxis = { numberFormatCode: "#,##0" };
chart.setPosition("E1", "L18");

for (const sheet of [overview, pluginSheet, sectionSheet, actionSheet, promptSheet, termsSheet, statsSheet]) {
  const used = sheet.getUsedRange(true);
  if (used) {
    used.format.font = { name: "Aptos", color: palette.ink };
    used.format.autofitRows();
  }
}

// Re-apply prominent title/header styles after setting global font.
styleTitle(overview, "A1:F1", "Codex 外掛影片筆記");
styleHeader(overview.getRange("A14:F14"), palette.green);
styleHeader(pluginSheet.getRange("A1:I1"), palette.blue);
styleHeader(sectionSheet.getRange("A1:D1"), palette.green);
styleHeader(actionSheet.getRange("A1:E1"), palette.amber);
styleHeader(promptSheet.getRange("A1:B1"), palette.rose);
styleHeader(termsSheet.getRange("A1:B1"), palette.green);
styleHeader(statsSheet.getRange("A1:C1"), palette.blue);
promptSheet.getRange(`A2:B${promptTemplates.length + 1}`).format.rowHeight = 42;
termsSheet.getRange(`A${terms.length + 3}:B${terms.length + 7}`).format.rowHeight = 24;

const inspectOverview = await workbook.inspect({
  kind: "table",
  range: "影片總覽!A14:F15",
  include: "values,formulas",
  tableMaxRows: 4,
  tableMaxCols: 8,
  maxChars: 3000,
});
console.log(inspectOverview.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
  maxChars: 3000,
});
console.log(errors.ndjson);

for (const sheetName of ["影片總覽", "外掛速查", "時間碼筆記", "行動清單", "提示詞模板", "校正與來源", "分類統計"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(path.join(outputDir, `${sheetName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(`SAVED ${outputPath}`);
