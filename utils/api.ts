import { NewsItemDetails, NewsItemComments } from "../types.ts";
// fake data for testing
import * as json_data from "../data.json" assert {type: "json"};

const PAGE_LENGTH = 20;

export async function fetchNewsItems(page: number): Promise<NewsItemDetails[]> {
  const resp = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
  const ids = await resp.json() as number[];
  const items: NewsItemDetails[] = [];
  const sliceStart = PAGE_LENGTH * (page - 1);
  const idSlice = ids.slice(sliceStart, sliceStart + PAGE_LENGTH - 1)
  for(const id of idSlice) {
    const item = await fetchNewsItem(id);
    items.push(item);
  }
  return items;
}

export async function fetchComments(id: number): Promise<NewsItemComments> {
  const item = await fetchNewsItem(id);
  const commentIds = item.kids;
  const comments = []
  for (const cid of commentIds) {
    const comment = await fetchNewsItem(cid);
    comments.push(comment);
  }
  return {comments, newsItem: item};
}

export async function fetchNewsItem(itemId: number): Promise<NewsItemDetails>  {
  const resp = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json?print=pretty`);
  const item: NewsItemDetails = await resp.json() as NewsItemDetails;
  return item;
}


export function fetchNewsItemsFromJson(): NewsItemDetails[] {
  // @ts-ignore-next-line
  return json_data.default as NewsItemDetails[];
}
