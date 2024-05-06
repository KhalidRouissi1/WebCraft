import { useEffect } from "react";
import Editor from "./Editor";
import axios from "axios";

export default function NewProject() {
  useEffect(() => {
    const res = axios.post("127.0.0.1:7");
  });

  return (
    <>
      <Editor projectID={1} urlLoad={"ddqsds"} urlStore={"qsdqsdqs"} />
    </>
  );
}
