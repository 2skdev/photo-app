type Place = {
  name: string;
  lat: number;
  lon: number;
};

export async function searchPlace(query: string): Promise<Array<Place>> {
  const ret = await fetch(
    `http://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=jp`,
    {
      mode: "cors",
    },
  );
  const json: Array<any> = await ret.json();

  return json.map<Place>((data) => ({
    name: data.name as string,
    lat: parseFloat(data["lat"]),
    lon: parseFloat(data["lon"]),
  }));
}

export async function getAddress(lat: number, lon: number): Promise<string> {
  const ret = await fetch(
    `http://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    {
      mode: "cors",
    },
  );
  const json: any = await ret.json();

  return `${json.address.province ?? ""}${json.address.city ?? ""}${json.address.neighbourhood ?? ""}`;
}
