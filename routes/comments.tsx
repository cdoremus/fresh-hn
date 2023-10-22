/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "twind";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { NewsItemDetails, NewsItemComments } from "../types.ts";
import { fetchComments } from "../utils/api.ts";
import Comments from "../components/Comments.tsx";

export const handler: Handlers<NewsItemDetails[] | null> = {
  //@ts-ignore-next-line
  async GET(req: Request, ctx: HandlerContext) {
    const url =  new URL(req.url);
    console.log("URL", url);
    const search = new URLSearchParams(url.search);
    const pageParamVal = search.get("id") ?? "";
    if (!pageParamVal) {
      ctx.render({comments: null});
    }
    const id = parseInt(pageParamVal);
    // TODO: fetch the whole tree of subcomments for each comment
    const comments = await fetchComments(id);
    const pageData: NewsItemComments = {comments: comments.comments, newsItem: comments.newsItem}
    return await ctx.render(pageData);
  }
}



export default function Page({ data }: PageProps<NewsItemComments | null>) {

  if (!data || !data.comments) {
    return <h1>Comments not found: <a href="/">Home</a></h1>;
  }
  const comments = data.comments;
  return (
    <Fragment>
      <div class={tw`text-3xl`}>{data.newsItem.title}</div>
      <div class={tw`text-l mb-3`}>{data.newsItem.score} points by {data.newsItem.by}</div>
      <hr/>
      <Comments comments={comments} />
    </Fragment>
  );
}