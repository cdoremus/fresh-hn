// @ts-nocheck handler type checks

/** @jsx h */
import { h } from 'preact';
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import NewsItemList from "../islands/NewsItemList.tsx";
import { NewsItemDetails } from "../types.ts";
import { fetchNewsItems, fetchNewsItemsFromJson } from "../utils/api.ts"
import { tw } from "twind";

export const handler: Handlers<NewsItemDetails[] | null> = {
  async GET(req: Request, ctx: HandlerContext) {
    const url =  new URL(req.url);
    // console.log("URL", url);
    const search = new URLSearchParams(url.search);
    const page = search.get("page") ? search.get("page") : 1;
    const items = await fetchNewsItems(parseInt(page));
    // const items = fetchNewsItemsFromJson();
    if (items.size === 0) {
      return await ctx.render(null);
    }
    const pageData = {items: items, page: parseInt(page)};
    return await ctx.render(pageData);
  },
};

export default function Page({ data }: PageProps<NewsItemDetails[] | null>) {
  // console.log("ITEMS: ", data);

  if (!data) {
    return <h1>News not found</h1>;
  }

  return (
    <div  class={tw`p-4 mx-auto max-w-screen-md`}>
      <div class={tw`flex flex-row border border-black p-2`}>
        <div class={tw`flex-1 text-3xl font-bold text-center m-2`}>Hacker News</div>
        <div class={tw`flex-initial mt-3`}>Page { data.page }</div>
      </div>
      <NewsItemList newsItems={data.items} page={data.page} />
      <footer class={tw`flex flex-row p-2 m-4 bg-gray-100`}>
        { data.page > 1 ?
          <div class={tw`flex-initial`}><a href={`/?page=${data.page - 1}`}>Prev Page</a></div>
          : <div class={tw`flex-initial`}>{' '}</div>
        }
        <div class={tw`flex-1 text-center`}>Page { data.page }</div>
        <div class={tw`flex-initial center`}><a href={`/?page=${data.page + 1}`}>Next Page</a></div>
      </footer>

    </div>
  );
}
