/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "twind";
import { NewsItemDetails } from "../types.ts"

type CommentProps = {
  comment: NewsItemDetails;
}

export default function Comment(props: CommentProps) {
  const comment = props.comment;

  const printCommentHeader = (commentArg: NewsItemDetails) => {
    return (
      <div class={tw`flex flex-row justify-between text-gray-400`}>
        <div class={tw`text-left`}>by {commentArg.by}</div>
        <div class={tw`text-right`}>{commentArg.kids?.length ? `${commentArg.kids.length} subcomments`: ""}</div>
      </div>
    )
  };

  const printComment = (commentArg: NewsItemDetails) => {
    const indent = 20;
    const margin = `ml-${indent}`;
    return (
      <div>
        { printCommentHeader(commentArg) }
        { /*
        //@ts-ignore-next-line */}
        <div class={tw`m-2`} dangerouslySetInnerHTML={{__html: commentArg.text}}>
          {commentArg.text}
        </div>
        <div class={tw`${margin}`}>
          subcomment here</div>
        <hr/>
    </div>
    )
  };

  return (
    printComment(comment)
  //   <Fragment>
  //     <div class={tw`flex flex-row justify-between text-gray-400`}>
  //       <div class={tw`text-left`}>by {comment.by}</div>
  //       <div class={tw`text-right`}>{comment?.kids?.length ? `${comment.kids.length} subcomments`: ""}</div>
  //     </div>
  //     { /*
  //     //@ts-ignore-next-line */}
  //     <div class={tw`m-2`} dangerouslySetInnerHTML={{__html: comment.text}}>
  //       {comment.text}
  //     </div>
  //     {/*
  //     // TODO: display the whole tree of subcomments for each comment */}
  //     <hr/>
  // </Fragment>
  )
}