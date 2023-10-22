import { NewsItemDetails, NewsItemComment } from "../types.ts";
// fake data for testing
import * as json_data from "../data.json" assert {type: "json"};

const PAGE_LENGTH = 20;
const QUERY_STRING = "?print=pretty";
const STORY_URL = `https://hacker-news.firebaseio.com/v0/topstories.json${QUERY_STRING}`;
const ITEM_URL = `https://hacker-news.firebaseio.com/v0/item/`;

export async function fetchNewsItems(page: number): Promise<NewsItemDetails[]> {
  const resp = await fetch(STORY_URL);
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

export async function fetchComments(commentId: number, level: number = 0): Promise<NewsItemComment> {
  const item  = await fetchNewsItem(commentId);
  const {id, by, text, kids} = item;
  const subcommentIds = kids ?? [];

  for (const cid of subcommentIds) {
    const child = await fetchNewsItem(cid);
  }
  // TODO: continue to fetch the whole tree of subcomments
  //  for each comment
  return {id, author: by, content: text ?? "", level};
}

export async function fetchSubcommentTree(commentIds: number[]) {
  // const commentTree: NewsItemComment = [];
  for ( const cid of commentIds) {
    const child: NewsItemDetails = await fetchNewsItem(cid);
    const {id, by, text} = child;
    let subcomment = {id, author: by, content: text};
    if (child.kids) {
      for (const kid of child.kids) {
        const subs = await fetchComment(kids);
        subcomment;
      }
    }
  }
}


export async function fetchNewsItem(itemId: number): Promise<NewsItemDetails>  {
  const resp = await fetch(`${ITEM_URL}${itemId}.json${QUERY_STRING}`);
  const item: NewsItemDetails = await resp.json() as NewsItemDetails;
  return item;
}


export function fetchNewsItemsFromJson(): NewsItemDetails[] {
  // @ts-ignore-next-line
  return json_data.default as NewsItemDetails[];
}
