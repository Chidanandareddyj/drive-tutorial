import React from 'react'
import { db } from '~/server/db'
import { mockFiles,mockFolders } from '~/lib/mock-data'
import { files_tables, folders_tables } from '~/server/db/schema'
import { mock } from 'node:test'


const page = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1>Sandbox Page</h1>
      <form action={async()=>{
        "use server"
        // const users = await db.user.findMany()
        const folderinsert=await db.insert(folders_tables).values(

            mockFolders.map((folder,index)=>({
                id: index+1,
                name: folder.name,
                parent:index || 0
            }))
        )
        console.log("folders", folderinsert)
        const fileinsert=await db.insert(files_tables).values(

            mockFiles.map((file,index)=>({
                id: index+1,
                name: file.name,
                size: file.size,
                url: file.url,
                parent:index || 0,
                folder:index || 0
            }))
        )

        console.log("files", fileinsert)
      }}>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default page
