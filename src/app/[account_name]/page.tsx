type Props = {
  params: { account_name: string };
};

export default async function Page({ params }: Props) {
  return (
    <main>
      <div>{params.account_name}</div>
    </main>
  );
}
