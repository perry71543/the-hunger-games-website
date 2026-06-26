const dispatchItems = [
  {
    code: "D12",
    title: "火種確認",
    body: "第十二區的記憶被標記為主要反抗源，所有相關角色檔案提升為高優先索引。",
  },
  {
    code: "D13",
    title: "地下訊號",
    body: "第十三區節點維持開啟，時間線與人物關係會以反抗網絡角度重新交叉閱讀。",
  },
  {
    code: "CAP",
    title: "宣傳干擾",
    body: "Capitol 敘事被列為不可信廣播，檔案卡加入 counter-record 與 witness note 語氣。",
  },
];

export function RebelDispatch() {
  return (
    <section
      id="rebel-dispatch"
      className="rebel-dispatch mt-6 overflow-hidden p-5 sm:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
        <div>
          <p className="archive-kicker">Rebel Dispatch / Encrypted</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-stone-50">
            反抗軍通訊牆
          </h2>
          <p className="mt-4 text-sm leading-7 text-stone-300/80">
            這一層把網站從單純紀念館推向地下資料站：每份檔案都不是中立陳列，
            而是對 Capitol 版本歷史的反證、補註與重新保存。
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {dispatchItems.map((item) => (
            <article
              key={item.code}
              className="rebel-dispatch-card p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rebel-stamp">{item.code}</span>
                <span className="rebel-pulse h-2 w-2 bg-red-300" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-orange-50">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-300/75">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
