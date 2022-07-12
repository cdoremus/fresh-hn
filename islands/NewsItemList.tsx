/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";
import { NewsItemDetails } from "../types.ts";
import NewsItem from "../components/NewsItem.tsx";

type NewsItemListProps = {
  newsItems: NewsItemDetails[];
  page: number;
}

export default function NewsItemList(props: NewsItemListProps) {
  const items = props.newsItems;
  const page= props.page;
  return (
    <table class={tw`ml-3`}>
      { items.map( (item: NewsItemDetails) => {
        return (<NewsItem item={item} />)
      }) }
    </table>
  )
}