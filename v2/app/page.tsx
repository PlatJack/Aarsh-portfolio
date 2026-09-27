import { CommandPalette } from '@/components/pipeline/CommandPalette';
import { Embed } from '@/components/pipeline/Embed';
import { Evaluate } from '@/components/pipeline/Evaluate';
import { Extract } from '@/components/pipeline/Extract';
import { Ingest } from '@/components/pipeline/Ingest';
import { Motion } from '@/components/pipeline/Motion';
import { Retrieve } from '@/components/pipeline/Retrieve';
import { Spotlight } from '@/components/pipeline/Spotlight';
import { StageNav } from '@/components/pipeline/StageNav';

export default function Home() {
  return (
    <Motion>
      <div className="pipeline min-h-screen overflow-x-clip">
        <div className="grain" aria-hidden />
        <StageNav />
        <main>
          <Ingest />
          <Extract />
          <Embed />
          <Evaluate />
          <Retrieve />
        </main>
        <CommandPalette />
        <Spotlight />
      </div>
    </Motion>
  );
}
