"use client";

import { Post } from "@prisma/client";
import { useRef } from "react";
import { MdiSend } from "../icons";
import { addComment } from "./actions";

type Props = {
  post: Post;
};

export default function CommentForm(props: Props) {
  const ref = useRef<HTMLFormElement>(null);

  const submit = async (form: FormData) => {
    await addComment(form);
    ref.current?.reset();
  };

  return (
    <form ref={ref}>
      <input
        name="comment"
        required
        type="text"
        className="input input-bordered"
        placeholder="コメントを追加"
      ></input>

      <input name="postId" value={props.post.id} required type="hidden"></input>

      <button className="btn btn-ghost ml-1" formAction={submit}>
        <MdiSend />
      </button>
    </form>
  );
}
