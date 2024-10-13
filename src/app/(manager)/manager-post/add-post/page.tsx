"use client";
import { useState } from "react"; 
import { Typography } from "@mui/material";
import CreateBook from "@/components/createPost/CreateBook";
import CreateDocument from "@/components/createPost/CreateDocument";
import CreatePost from "@/components/createPost/CreatePost";
import { IPostState } from "../../../../types/params";

const AddPost = () => {
  const [post, setPost] = useState<IPostState>({
    bookId: undefined,
    copyId: undefined,
    postId: undefined,
  });
  const updateBookId = (bookId: IPostState["bookId"]): void =>
    setPost((state) => ({ ...state, bookId }));
  const updateDocumentId = (copyId: IPostState["copyId"]): void =>
    setPost((state) => ({ ...state, copyId }));

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Đăng bài mới
      </Typography>

      <CreateBook  post={post}  updateBookId={updateBookId} />
      <CreateDocument
        bookId={post.bookId}
        updateDocumentId={updateDocumentId}
      />
      <CreatePost copyId={post.copyId}/>
    </>
  );
};

export default AddPost;
