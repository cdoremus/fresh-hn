/** @jsx h */
import { h } from "preact";
import { asset, Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/src/server/types.ts";
import { tw } from "twind";

export default function App({ Component }: AppProps) {
  return (
    <html data-custom="data">
      <Head>
        {/* <!-- link rel="stylesheet" href={asset("style.css")} / --> */}
      </Head>
      <body class={tw`m-x-50 m-y-0 p-4 mx-auto max-w-screen-md`}>
        <header class={tw`flex flex-row border border-black p-2`}>
          <div class={tw`flex-1 text-3xl font-bold text-center`}>FRESH<img class={tw`inline`} src="logo.svg"/> Hacker News</div>
          <div class={tw`flex-initial mt-3`}><a href="/">Home</a></div>
        </header>
        <Component />
        <footer>
          <div class={tw`text-center border`}>Created with the <a href="https://fresh.deno.dev" target="_blank">FRESH<img class={tw`inline`} src="logo.svg"/></a> framework</div>
        </footer>
      </body>
    </html>
  );
}