import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi, UploadThingError } from "uploadthing/server";
import { getServerAuthSession } from "../auth";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const session = await getServerAuthSession();

      // If you throw, the user will not be able to upload
      if (!session) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { session };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const deleteFile = async (fileUrl: string | null) => {
  "use server";
  if (!fileUrl) {
    return;
  }

  const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
  const utapi = new UTApi();

  try {
    await utapi.deleteFiles(fileName);
  } catch (e) {
    console.log(`Error deleting file ${fileUrl}`, e);
  }
};
