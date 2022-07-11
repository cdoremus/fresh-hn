import { NewsItemDetails } from "../types.ts";
import * as json_data from "../data.json" assert {type: "json"};

const PAGE_LENGTH = 20;

export async function fetchNewsItems(): Promise<NewsItemDetails[]> {
  const resp = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
  const ids = await resp.json() as number[];
  const items: NewsItemDetails[] = [];
  let count = 1;
  for(const id of ids) {
    const item = await fetchNewsItem(id);
    items.push(item);
    // show only top 20
    if (count >= PAGE_LENGTH) {
      break;
    }
    count++;
  }
  return items;
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
