import { NewsItemDetails } from "../types.ts";
// fake data for testing
import * as json_data from "../data.json" assert {type: "json"};

const PAGE_LENGTH = 20;
const SESSION_KEY = "news-items";

export async function fetchNewsItems(page: number): Promise<NewsItemDetails[]> {
  // Cache item ids in sessionStorage
  // console.log("SESSION STORAGE", sessionStorage);
  const storedItems = sessionStorage ? sessionStorage.getItem(SESSION_KEY) : undefined;
  let ids = [];
  // if (!storedItems || storedItems.length < 2) {
    const resp = await fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`);
    ids = await resp.json() as number[];
  //   if (sessionStorage) {
  //     sessionStorage.setItem(SESSION_KEY, JSON.stringify(ids));
  //   }
  // } else {
  //   ids = JSON.parse(storedItems);
  // }
  // console.log(`page ${page} ids ${ids.length}`);
  const items: NewsItemDetails[] = [];
  const sliceStart = PAGE_LENGTH * (page - 1);
  const idSlice = ids.slice(sliceStart, sliceStart + PAGE_LENGTH - 1)
  for(const id of idSlice) {
    const item = await fetchNewsItem(id);
    items.push(item);
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
