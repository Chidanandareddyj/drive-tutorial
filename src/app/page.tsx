import { db } from "~/server/db";
import { files as fileSchema, folders as folderSchema } from "~/server/db/schema";
import Drivecontents from "./drive-content";

export default async function Page() {

  const  files=await db.select().from(fileSchema);
  const  folders=await db.select().from(folderSchema);
  return <Drivecontents files={files} folders={folders}/>;
}