import "server-only";

import { int, bigint, text, singlestoreTable, index } from "drizzle-orm/singlestore-core";


export const files_tables = singlestoreTable("files_table", {
  id:int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  url: text("url").notNull(),
  parent: int("parent").notNull(),
},
(t) => {
  return [index('parent_index').on(t.parent)]
});

export const folders_tables = singlestoreTable("folders_table", {
  id:int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),

  parent: int("parent").notNull(),
},
(t) => {
  return [index('parent_index').on(t.parent)]
});