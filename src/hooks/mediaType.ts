import { useEffect, useState } from "react";

type MediaType = "sp" | "pc";

export function useMediaType(): MediaType {
  // tailwind breakpoint md
  const [mediaType, setMediaType] = useState<MediaType>("pc");
  const onChange = (matches: boolean) => setMediaType(matches ? "sp" : "pc");

  useEffect(() => {
    const mql = matchMedia("(width <= 768px)");

    mql.onchange = (e) => onChange(e.matches);
    onChange(mql.matches);

    return () => {
      mql.onchange = null;
    };
  }, []);

  return mediaType;
}
