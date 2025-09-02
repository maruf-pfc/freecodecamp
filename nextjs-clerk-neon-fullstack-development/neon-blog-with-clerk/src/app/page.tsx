import { getDBVersion } from "@/db/index";

export default async function Home() {
  const { version } = await getDBVersion();

  return (
    <div>
      <h1>Database Version: {version}</h1>
    </div>
  );
}
