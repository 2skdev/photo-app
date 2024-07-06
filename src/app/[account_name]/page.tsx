import { getLoginUser, getUser } from "@/actions/user";

type Props = {
  params: { account_name: string };
};

export default async function Page({ params }: Props) {
  const user = await getUser(params.account_name);
  const me = await getLoginUser();

  return (
    <main>
      <div>{user.account_name}</div>
      <div>{user.display_name}</div>
      <div>{user.id === me.id ? "edit" : "follow"}</div>
    </main>
  );
}
