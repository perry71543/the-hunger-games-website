# Mockingjay Memorial Archive

一個私人使用的《飢餓遊戲 / The Hunger Games》紀念網站。風格方向是 Mockingjay Memorial + Archive：深色背景、檔案卡、紀念館、Panem 歷史資料館與地下反抗軍資料庫的混合氛圍。

本專案使用 Next.js App Router、TypeScript 與 Tailwind CSS。第一版不使用資料庫，內容放在本地 JSON 與 Markdown 檔案中，方便直接上傳 GitHub 並部署到 Vercel。

## 本機啟動方式

```bash
npm install
npm run dev
```

預設開發網址：

```bash
http://localhost:3000
```

正式建置檢查：

```bash
npm run build
```

完整檢查：

```bash
npm run check
```

## 資料檔案說明

資料都位於 `data/`：

- `data/characters.json`：角色檔案，提供角色列表與角色詳細頁使用。
- `data/districts.json`：District 1 到 District 13 的分區資料。
- `data/timeline.json`：Panem 相關事件時間線。
- `data/quotes.json`：少量短句或自行改寫的閱讀筆記，避免大量引用原作文字。
- `data/gallery.json`：視覺檔案牆使用的本地圖片索引。
- `data/relationships.json`：人物關係索引，提供 Relations 頁面使用。

Markdown 筆記位於 `content/notes/`，由 `lib/notes.ts` 讀取。JSON 資料讀取集中在 `lib/data.ts`。

主要頁面包含：

- `/characters`：角色搜尋與篩選。
- `/districts`：分區搜尋與狀態篩選。
- `/timeline`：時間線搜尋與 era 篩選。
- `/quotes`：短句與改寫筆記。
- `/gallery`：原創檔案館與地下反抗通訊風格圖片牆。
- `/notes`：本地 Markdown 私人筆記與 counter-record。
- `/relationships`：人物關係與反抗網絡索引。
- `/favorites`：只存在瀏覽器本機的收藏櫃。

## Python 驗證資料方式

專案提供 `scripts/validate_data.py`，會檢查 JSON 是否可解析、是否為陣列、必要欄位是否存在、列表欄位格式是否正確，也會檢查圖片路徑、角色關係引用與 Markdown 筆記 frontmatter。

```bash
npm run validate:data
```

目前 npm script 會優先使用 `python`，若系統沒有這個指令，會 fallback 到 `/usr/bin/python3`。若你的系統使用其他 Python 路徑，可以在 `package.json` 中調整這一行。

成功時會看到：

```bash
validation passed
```

另有一個輕量 smoke test：

```bash
npm run smoke
```

## GitHub 上傳方式

```bash
git init
git add .
git commit -m "Initial Mockingjay Memorial Archive"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

如果已經在 GitHub 建好空 repository，把 `<your-username>` 與 `<your-repo>` 換成你的帳號與 repo 名稱即可。

## Vercel 部署方式

1. 登入 Vercel。
2. 選擇 Import Project。
3. 選取這個 GitHub repository。
4. Framework Preset 選 Next.js。
5. Build Command 使用預設的 `npm run build`。
6. Install Command 使用預設的 `npm install`。
7. 按下 Deploy。

本專案沒有 API key、資料庫或 CMS，因此不需要設定額外環境變數。

若要讓 sitemap、robots 與 Open Graph 使用正式網址，可以在 Vercel 加上：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## 私人與非官方說明

Mockingjay Memorial Archive 是私人 fan archive，用於個人紀念、心得整理與資料索引。它不是官方網站，也未與 The Hunger Games 相關權利方、出版社或影視作品官方單位建立關聯。

網站內容避免大量引用受版權保護的原文，第一版文字以自行撰寫的繁體中文簡介、短句與改寫筆記為主。視覺素材使用原創生成的檔案館風格圖片與 CSS 裝飾，沒有放入官方圖片、電影截圖、海報或 logo。
