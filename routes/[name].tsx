/** @jsx h */
import { h, Fragment } from "preact";
import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return (
    <Fragment>
      <div>Hello {props.params.name}, you must be lost...</div>;
      <div><a href="/">Home</a></div>
    </Fragment>
  );
}
