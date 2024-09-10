type PlaceLatLon = {
  name: string;
  lat: number;
  lon: number;
};

type PlaceAddress = {
  name: string;
  address: string;
};

export async function searchPlace(query: string): Promise<Array<PlaceLatLon>> {
  const ret = await fetch(
    `http://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=jp`,
    {
      mode: "cors",
    },
  );
  const json: Array<any> = await ret.json();

  return json.map<PlaceLatLon>((data) => ({
    name: data.name as string,
    lat: parseFloat(data["lat"]),
    lon: parseFloat(data["lon"]),
  }));
}

export async function getAddress(
  lat: number,
  lon: number,
): Promise<PlaceAddress> {
  const ret = await fetch(
    `http://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    {
      mode: "cors",
    },
  );
  const json: any = await ret.json();

  return {
    name: json.name,
    address: `${json.address.province ?? ""}${json.address.city ?? ""}${json.address.neighbourhood ?? ""}`,
  };
}
