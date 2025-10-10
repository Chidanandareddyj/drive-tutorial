import { db } from "~/server/db";
import {
  files_tables as fileSchema,
  folders_tables as folderSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";
import type { get } from "http";

export const QUERIES = {
  getallParentsForFolder: async function (folderID: number) {
    const parents = [];
    let currentID = folderID;
    while (currentID !== 1) {
      const folder = await db
        .selectDistinct()
        .from(folderSchema)
        .where(eq(folderSchema.id, currentID));
      if (!folder[0]) {
        throw new Error("Folder not found");
      }
      parents.unshift(folder[0]);
      currentID = folder[0]?.parent ?? 1;
    }
    return parents;
  },

  getfolders: function (folderID: number) {
    return db
      .select()
      .from(folderSchema)
      .where(eq(folderSchema.parent, folderID));
  },

  getfiles: function (folderID: number) {
    return db.select().from(fileSchema).where(eq(fileSchema.parent, folderID));
  },
};
