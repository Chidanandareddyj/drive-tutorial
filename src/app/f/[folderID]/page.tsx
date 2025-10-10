import Drivecontents from "../../drive-content";
import {QUERIES} from "~/server/db/queries";



export default async function Page(props: {
  params: Promise<{ folderID: string }>;
}) {
  const params = await props.params;
  const parsedFolderID = parseInt(params.folderID, 10);
  if (isNaN(parsedFolderID)) {
    return <div>Invalid folder ID</div>;
  }

  //   const safeParams = z
  //     .object({
  //       folderID: z.number(),
  //     })
  //     .parse({ folderID: parsedFolderID });

  console.log("params", params);
  const filesPromise = QUERIES.getfiles(parsedFolderID);
  const foldersPromise = QUERIES.getfolders(parsedFolderID);

  const parentsPromise = QUERIES.getallParentsForFolder(parsedFolderID);
  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);
  return <Drivecontents files={files} folders={folders} parents={parents} />;
}
