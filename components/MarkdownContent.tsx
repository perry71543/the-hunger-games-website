type MarkdownContentProps = {
  body: string;
};

export function MarkdownContent({ body }: MarkdownContentProps) {
  const blocks = body.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={block}
              className="border-t border-orange-200/10 pt-6 text-2xl font-bold text-stone-50"
            >
              {block.replace(/^## /, "")}
            </h2>
          );
        }

        return (
          <p key={block} className="text-base leading-8 text-stone-200/85">
            {block}
          </p>
        );
      })}
    </div>
  );
}
