
export type NewsItemDetails = {
  id: number; // The item's unique id.
  deleted?: boolean; // true if the item is deleted.
  type: "job" | "story" | "comment" | "poll" | "pollopt"; // The type of item. One of "job", "story", "comment", "poll", or "pollopt".
  by: string; // The username of the item's author.
  time: number; // Creation date of the item, in Unix Time.
  text?: string; // The comment, story or poll text. HTML.
  dead?: boolean; // true if the item is dead.
  parent?: number[]; // The comment's parent: either another comment or the relevant story.
  poll?: string; // The pollopt's associated poll.
  kids?: number[]; // The ids of the item's comments, in ranked display order.
  url: string; // The URL of the story.
  score: number; // The story's score, or the votes for a pollopt.
  title: string; // The title of the story, poll or job. HTML.
  parts?: []; // A list of related pollopts, in display order.
  descendants: number; // In the case of stories or polls, the total comment count.
}

export type NewsItemComment = {
  id: number; // id when type="comment"
  author: string // comment author
  level: number; // 0,1,2,3... 0 is top level
  content: string; // comment text
  parentId?: number; // the comment if of the parent
  subcomments?: NewsItemComment[] // comments on the comment
}
