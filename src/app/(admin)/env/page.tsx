export default function Page() {
  return (
    <>
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
