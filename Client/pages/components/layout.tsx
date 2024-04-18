import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function GuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const router = useRouter();
  //   const [name, setName] = useState("");
  //   const [idUser, setIdUser] = useState("");
  //   useEffect(() => {
  //     (async () => {
  //       const respose = await fetch("http://localhost:8000/api/user", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         credentials: "include", // Include cookies in the request
  //       });
  //       const content = await respose.json();
  //       setName(content.name);
  //       setIdUser(content.id);
  //     })();
  //   });
  //   console.log(name);
  return <main>{children}</main>;
}
