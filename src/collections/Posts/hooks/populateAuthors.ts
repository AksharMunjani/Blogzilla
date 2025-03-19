import type { CollectionAfterReadHook } from "payload";
import { User } from "@/payload-types";

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({
  doc,
  req,
  req: { payload },
}) => {
  if (doc?.authors && Array.isArray(doc.authors)) {
    try {
      const authorDocs: User[] = [];

      for (const author of doc.authors) {
        const authorId = typeof author === "object" ? author?.id : author;

        if (authorId) {
          try {
            const authorDoc = await payload.findByID({
              id: authorId,
              collection: "users",
              depth: 0,
              req,
            });

            if (authorDoc) {
              authorDocs.push(authorDoc);
            }
          } catch (findError) {
            console.error(
              `Error finding author with ID ${authorId}:`,
              findError,
            );
          }
        }
      }

      // Create a new field with limited author information
      if (authorDocs.length > 0) {
        doc.populatedAuthors = authorDocs.map((authorDoc) => ({
          id: authorDoc.id,
          name: authorDoc.name,
        }));
      }
    } catch (error) {
      console.error("Error in populateAuthors hook:", error);
    }
  }

  return doc;
};
