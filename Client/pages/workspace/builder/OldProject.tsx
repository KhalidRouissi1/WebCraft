import Editor from "./Editor";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function OldProject() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState({});
  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          console.log(id)
          const response = await axios.get(
            `http://127.0.0.1:8000/api/project/${id}`
          );
          const data = response.data;
          setProject(data);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  return (
    <>
      {id && Object.keys(project).length > 0 && (
        <Editor
          id={project.id}
        />
      )}
    </>
  );
}
