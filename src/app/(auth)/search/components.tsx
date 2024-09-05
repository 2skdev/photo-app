"use client";

import { getHashtagPosts } from "@/actions/hashtag";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { searchPlace } from "@/libs/osm";
import { Post } from "@/models/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function MapResult({ q }: { q: string }) {
  const [place, setPlace] = useState<[number, number]>();

  useEffect(() => {
    (async () => {
      const places = await searchPlace(q);
      if (places.length > 0) {
        setPlace([places[0].lat, places[0].lon]);
      }
    })();
  }, []);

  return (
    <Map
      center={place ?? [35.6811673, 139.7670516]}
      marker={place}
      className="md:mt-4"
    ></Map>
  );
}

function HashtagResult({ q }: { q: string }) {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    (async () => {
      setPosts(await getHashtagPosts(q.slice(1)));
    })();
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <div key={index}>{post.text}</div>
      ))}
    </>
  );
}

export function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") ?? "";

  const [text, setText] = useState(q);

  const onSearch = async () => {
    if (text.length === 0) return;
    router.push(`/search?q=${encodeURIComponent(text)}`);
  };

  return (
    <>
      <Header>
        <div className="flex w-full items-center">
          <input
            type="text"
            placeholder="検索"
            className="input input-sm w-full rounded-full bg-neutral"
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing || e.key !== "Enter") return;
              onSearch();
            }}
          />
          <button
            className="btn btn-primary btn-sm ml-2 rounded-full"
            onClick={() => onSearch()}
          >
            検索
          </button>
        </div>
      </Header>

      {q.startsWith("#") ? <HashtagResult q={q} /> : <MapResult q={q} />}
    </>
  );
}
