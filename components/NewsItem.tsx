/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { NewsItemDetails } from "../types.ts"

type NewsItemProps = {
  item: NewsItemDetails;
}

export default function NewsItem(props: NewsItemProps) {
  const item = props.item;
  return (
    <tr key={item.id} class={tw`text-lg even:bg-amber-100 odd:bg-blue-100`}>
      <td>
        <span class={tw`font-bold text-blue-900`}><a href={item.url} target="_blank">{item.title}</a></span>
        <span class={tw`block`}>{' '}{item.score} points by {item.by} | <a href={`/comments?id=${item.id}`}>{item.descendants} Comments</a></span>
      </td>
    </tr>
  )
}