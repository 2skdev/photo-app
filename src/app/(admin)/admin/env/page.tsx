import { baseUrl } from "@/constants/url";

export default function Page() {
  return (
    <>
      <div>baseUrl = {baseUrl}</div>
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
