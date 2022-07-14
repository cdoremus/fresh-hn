/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { NewsItemDetails } from "../types.ts";
import NewsItem from "./NewsItem.tsx";

type NewsItemListProps = {
  newsItems: NewsItemDetails[];
}

export default function NewsItemList(props: NewsItemListProps) {
  const items = props.newsItems;
  return (
    <table class={tw`w-full`}>
        { items.map( (item: NewsItemDetails) => {
          return (<NewsItem item={item} />)
        }) }
    </table>
  )
}