import { Icon } from "@iconify/react/dist/iconify.js";

export default function Page() {
  return (
    <>
      <div role="alert" className="alert alert-success animate-fade-in">
        <Icon icon="mdi:information-outline" />
        <span>これがないとなぜかSnackbarProviderに反映されない...</span>
      </div>
      <div role="alert" className="alert alert-success animate-fade-out">
        <Icon icon="mdi:information-outline" />
        <span>これがないとなぜかSnackbarProviderに反映されない...</span>
      </div>
    </>
  );
}
