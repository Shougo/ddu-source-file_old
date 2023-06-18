import {
  BaseSource,
  Item,
} from "https://deno.land/x/ddu_vim@v3.2.1/types.ts";
import { Denops, fn } from "https://deno.land/x/ddu_vim@v3.2.1/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.5.0/file.ts";
import { relative } from "https://deno.land/std@0.192.0/path/mod.ts";

type Params = Record<never, never>;

export class Source extends BaseSource<Params> {
  override kind = "file";

  override gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        // Note: rviminfo! is broken in Vim8 before 8.2.2494
        if (
          await fn.has(args.denops, "nvim") ||
          await fn.has(args.denops, "patch-8.2.2494")
        ) {
          await args.denops.cmd("wviminfo | rviminfo!");
        }

        const cwd = await fn.getcwd(args.denops) as string;

        const oldfiles =
          (await args.denops.call(
            "ddu#source#file_old#_get_oldfiles",
          )) as string[];

        controller.enqueue(oldfiles.map((f) => ({
          word: f.startsWith(cwd) ? relative(cwd, f) : f,
          action: {
            path: f,
          },
        })));

        controller.close();
      },
    });
  }

  override params(): Params {
    return {};
  }
}
