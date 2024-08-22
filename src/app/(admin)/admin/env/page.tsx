import { BASE_URL } from "@/constants/url";

export default function Page() {
  return (
    <>
      <div>BASE_URL = {BASE_URL}</div>
      {Object.entries(process.env)
        .filter(([key]) => key.startsWith("NEXT_PUBLIC"))
        .map(([key, value]) => (
          <div key={key}>
            {key} = {value}
          </div>
        ))}
    </>
  );
}
