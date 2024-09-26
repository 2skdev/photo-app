import { BASE_URL } from "@/constants/url";

export default function Page() {
  const table: { [key: string]: string | undefined } = {
    BASE_URL: BASE_URL,
  };

  Object.entries(process.env)
    .filter(([key]) => key.startsWith("NEXT_PUBLIC"))
    .forEach(([key, value]) => (table[key] = value));

  return (
    <>
      <div className="overflow-x-scroll">
        <table className="table">
          <thead>
            <tr>
              <th>変数名</th>
              <th>値</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(table).map(([key, value], index) => (
              <tr key={index}>
                <th>{key}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
