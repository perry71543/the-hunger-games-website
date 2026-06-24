type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="archive-shell pb-10 pt-14 md:pt-16">
      {eyebrow ? <p className="archive-kicker">{eyebrow}</p> : null}
      <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-stone-50 sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300/75">
          {description}
        </p>
      ) : null}
    </div>
  );
}
