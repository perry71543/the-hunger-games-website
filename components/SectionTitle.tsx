type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="section-title-band">
      <div className="archive-shell pb-9 pt-10 md:pb-10 md:pt-14">
        <div className="max-w-4xl">
          {eyebrow ? <p className="archive-kicker">{eyebrow}</p> : null}
          <h1 className="mt-4 text-4xl font-black leading-tight text-stone-50 sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300/75">
              {description}
            </p>
          ) : null}
        </div>
        <div className="section-ledger mt-8 grid max-w-3xl grid-cols-3 text-[10px] font-semibold uppercase text-stone-500">
          <span>Counter-record</span>
          <span>Private archive</span>
          <span>Local dataset</span>
        </div>
      </div>
    </div>
  );
}
