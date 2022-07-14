/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "twind";
import { NewsItemDetails } from "../types.ts";
import Comment from "./Comment.tsx";

type CommentsProps = {
  comments: NewsItemDetails[];
}

export default function Comments(props: CommentsProps) {
  const comments = props.comments;
  return (
    <ul class={tw`list-none`}>
    { comments.map((comment: NewsItemDetails) => {
        return <Comment comment={comment} />
      })
    }
    </ul>
  )
}