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
    const items = await fetchNewsItems();
    // const items = fetchNewsItemsFromJson();
    // console.log("ITEMS: ", JSON.stringify(items));
    if (items.size === 0) {
      return await ctx.render(null);
    }
    const pageData = {items: items}
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
      <h1 class={tw`text-xl font-bold`}>Hacker News</h1>
      <NewsItemList newsItems={data.items} />
    </div>
  );
}
