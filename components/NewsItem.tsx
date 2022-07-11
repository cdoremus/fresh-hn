/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { NewsItemDetails } from "../types.ts"

type NewsItemProps = {
  item: NewsItemDetails;
  rank: number;
}

export default function NewsItem(props: NewsItemProps) {
  const item = props.item;
  const rank = props.rank;
  // if ( rank == 1) {
  //   console.log("ITEM", item);
  // }
  return (
    <li key={item.id} class={tw`text-lg`}>
      <span>{rank}. </span>
      <span class={tw`font-bold text-blue-900`}><a href={item.url} target="_blank">{item.title}</a></span>
      <span class={tw`block`}>{' '}{item.score} points by {item.by} | <a href={`https://news.ycombinator.com/item?id=${item.id}`}>{item.descendants} Comments</a></span>
    </li>
  )
}