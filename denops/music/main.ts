import { Denops } from "https://deno.land/x/denops_std@v1.0.0/mod.ts";
import { execute } from "https://deno.land/x/denops_std@v1.0.0/helper/mod.ts";
import { ensureString } from "https://deno.land/x/unknownutil@v1.0.0/mod.ts";
import * as fn from "https://deno.land/x/denops_std@v2.0.1/function/mod.ts";
import * as vars from "https://deno.land/x/denops_std@v2.0.1/variable/mod.ts";

export async function main(denops: Denops): Promise<void> {
    let ps: Deno.Process;

    const debug = await vars.g.get(denops, "music_debug", true);
    const debugLog = (...data: any[]): void => {
        if (debug) console.log(...data);
    };

    denops.dispatcher = {
        async play(title: unknown): Promise<unknown> {
            ensureString(title);
            // TODO
            const cwd = await fn.getcwd(denops) as string;
            const cmd = ["C:\\Windows\\explorer.exe", cwd + "\\open.mp3"] as string [];
            debugLog( { cmd, cwd });
            ps = Deno.run({
                cmd: cmd,
            });
            return await Promise.resolve(`call play api. start to play ${title}.`);
        },

        async stop(): Promise<unknown> {
            // TODO
            return await Promise.resolve("call stop api. stop playing music.");
        },

        async info(): Promise<unknown> {
            // TODO
            return await Promise.resolve("call info api. return playing music information.");
        },
    };

    await denops.cmd(`command! -nargs=1 MusicPlay echomsg denops#request('${denops.name}', 'play', [<q-args>])`);
    await denops.cmd(`command! -nargs=0 MusicStop echomsg denops#request('${denops.name}', 'stop', [])`);
    await denops.cmd(`command! -nargs=0 MusicInfo echomsg denops#request('${denops.name}', 'info', [])`);
};
