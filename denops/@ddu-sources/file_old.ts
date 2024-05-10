import { BaseSource, Item } from "https://deno.land/x/ddu_vim@v4.0.0/types.ts";
import { Denops, fn } from "https://deno.land/x/ddu_vim@v4.0.0/deps.ts";
import { ActionData } from "https://deno.land/x/ddu_kind_file@v0.7.1/file.ts";
import { relative } from "jsr:@std/path@0.224.0";

type Params = Record<string, never>;

export class Source extends BaseSource<Params> {
  override kind = "file";

  override gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        await args.denops.cmd("wviminfo | rviminfo!");

        const cwd = await fn.getcwd(args.denops) as string;

        const oldfiles = await args.denops.call(
          "ddu#source#file_old#_get_oldfiles",
        ) as string[];

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
