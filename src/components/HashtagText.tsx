"use client";

export function HashtagText({
  className,
  text,
  onClick,
}: {
  className?: string;
  text: string;
  onClick?: (tag: string) => void;
}) {
  const parts = text
    .split(/(\s*)(#[^\s#\n]+)(?=\s|$|\n)/g)
    .filter((part) => part !== "");

  return (
    <div className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("#")) {
          return (
            <a
              key={index}
              className="cursor-pointer text-blue-500 hover:opacity-80"
              onClick={() => onClick?.(part)}
            >
              {part}
            </a>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </div>
  );
}
