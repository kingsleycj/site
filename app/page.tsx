import { HomePanel } from "@/components/panels/HomePanel";
import { Shell } from "@/components/shell/Shell";

export default function HomePage() {
  return (
    <Shell panel="home">
      <HomePanel />
    </Shell>
  );
}
