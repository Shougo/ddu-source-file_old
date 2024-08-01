import { BaseSource, type Item } from "jsr:@shougo/ddu-vim@^5.0.0/types";

import { type ActionData } from "jsr:@shougo/ddu-kind-file@^0.8.0";

import type { Denops } from "jsr:@denops/core@^7.0.0";
import * as fn from "jsr:@denops/std@^7.0.1/function";

import { relative } from "jsr:@std/path@1.0.2";

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
