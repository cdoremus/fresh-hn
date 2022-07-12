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
    <div>
      <table>
        { items.map( (item: NewsItemDetails) => {
          return (<NewsItem item={item} />)
        }) }
      </table>
      <div class={tw`center`}>Page {page}</div>
      { page > 1 ?
        <div class={tw`center`}><a href={`/?page=${page - 1}`}>Prev Page</a></div>
        : ""
      }
      <div class={tw`center`}><a href={`/?page=${page + 1}`}>Next Page</a></div>
    </div>
  )
}