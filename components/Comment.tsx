/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "twind";
import { NewsItemDetails } from "../types.ts"
import Comments from "./Comments.tsx";

type CommentProps = {
  comment: NewsItemDetails;
}

export default function Comment(props: CommentProps) {
  const comment = props.comment;
  return (
    <Fragment>
      <div>{comment.by}</div>
      { /*
      //@ts-ignore-next-line */}
      <li class={tw`m-2`} dangerouslySetInnerHTML={{__html: comment.text}}>
        {comment.text}
      </li>
      {/* // TODO: kids is an array of ids
      { comment.kids ? <Comments comments={comment.kids}/>: ""} */}
      <hr/>
  </Fragment>
  )
}