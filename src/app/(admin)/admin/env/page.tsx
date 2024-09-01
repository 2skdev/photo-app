import { MdiInformationOutline } from "@/components/Icons";
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

      <div role="alert" className="alert alert-success animate-fade-in">
        <MdiInformationOutline />
        <span>これがないとなぜかSnackbarProviderに反映されない...</span>
      </div>
      <div role="alert" className="alert alert-success animate-fade-out">
        <MdiInformationOutline />
        <span>これがないとなぜかSnackbarProviderに反映されない...</span>
      </div>
    </>
  );
}
