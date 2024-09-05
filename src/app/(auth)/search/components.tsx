"use client";

import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { searchPlace } from "@/libs/osm";
import { useState } from "react";

export function SearchForm() {
  const [text, setText] = useState("");
  const [place, setPlace] = useState<[number, number]>();

  const onSearch = async () => {
    const places = await searchPlace(text);
    if (places.length > 0) {
      setPlace([places[0].lat, places[0].lon]);
    }
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
            onClick={onSearch}
          >
            検索
          </button>
        </div>
      </Header>

      <Map
        center={place ?? [35.6811673, 139.7670516]}
        marker={place}
        className="md:mt-4"
      ></Map>
    </>
  );
}
