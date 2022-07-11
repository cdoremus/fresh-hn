/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";
import { NewsItemDetails } from "../types.ts";
import NewsItem from "../components/NewsItem.tsx";

type NewsItemListProps = {
  newsItems: NewsItemDetails[]
}

export default function NewsItemList(props: NewsItemListProps) {
  const items = props.newsItems;
  const [page, setPage] = useState<number>(1);
  const incrementPage = () => {
    setPage(() => page + 1);
  }
  return (
    <div>
      <ul class={ tw`list-none` }>
        { items.map( (item: NewsItemDetails, index: number) => {
          return (<NewsItem rank={ index + 1} item={item} />)
        }) }
      </ul>
      <div class={tw`center`}>Page {page}</div>
      <div class={tw`center`}><a onClick={incrementPage}>Next Page</a></div>

    </div>
  )
}