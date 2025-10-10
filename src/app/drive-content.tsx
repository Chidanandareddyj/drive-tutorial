"use client";

import { useMemo, useState } from "react";
import { mockFiles, mockFolders } from "../lib/mock-data";
import { Folder, FileIcon, Upload, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { FileRow, FolderRow } from "./file-row";
import type { files_tables, folders_tables } from "~/server/db/schema";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";

export default function Drivecontents(props: {
  files: (typeof files_tables.$inferSelect)[];
  folders: (typeof folders_tables.$inferSelect)[];
  parents: (typeof folders_tables.$inferSelect)[];
}) {


  const navigate=useRouter();
  // const [currentFolder, setCurrentFolder] = useState<number>(1); // Start at root folder with id 1

  // const getCurrentFiles = () => {
  //   return mockFiles.filter((file) => file.parent === currentFolder)
  // }

  // const getCurrentFolders = () => {
  //   return mockFolders.filter((folder) => folder.parent === currentFolder)
  // }

  // const handleFolderClick = (folderId: number) => {
  //   setCurrentFolder(folderId);
  // };

  // const breadcrumbs = useMemo(() => {
  //   const breadcrumbs = [];
  //   let currentId = currentFolder;

  //   while (currentId !== 1) {
  //     const folder = props.folders.find((folder) => folder.id === currentId);
  //     if (folder) {
  //       breadcrumbs.unshift(folder);
  //       currentId = folder.parent ?? 1;
  //     } else {
  //       break;
  //     }
  //   }

  //   return breadcrumbs;
  // }, [currentFolder, props.folders]);

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4 flex items-center">
              
                My Drive
              </Link>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
           <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
            {props.folders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                
              />
            ))}
          </ul>
        </div>
        <UploadButton endpoint="imageUploader" onClientUploadComplete={() => navigate.refresh()} onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)} />
      </div>
    </div>
  );
}
