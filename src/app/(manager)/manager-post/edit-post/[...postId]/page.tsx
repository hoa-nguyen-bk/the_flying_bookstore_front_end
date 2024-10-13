"use client";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CreateBook from "@/components/createPost/CreateBook";
import CreateDocument from "@/components/createPost/CreateDocument";
import CreatePost from "@/components/createPost/CreatePost";
import { IParamsEditListing, IPostState } from "../../../../../types/params";
import { getBookDetailService } from "../../../../../api/bookListService";
import { useStoreStep } from "../../../../../hooks/step";
import { useStoreAlert } from "../../../../../hooks/alert";

const EditPost = ({ params }: IParamsEditListing) => {
  const [post, setPost] = useState<IPostState>({
    bookId: undefined,
    copyId: undefined,
    postId: undefined,
  });
  const {callErrorAlert} = useStoreAlert()

  useEffect(() => {
    const makeRequest = async () => {
      const response = await getBookDetailService(params.postId[0]);
      if (typeof response !== 'string') {
        setPost({
          bookId: response?.book?.id,
          copyId: response.copy.id.toString(),
          postId: response?.id.toString()
        })
      } else {
        callErrorAlert(response);
      }
    }
    makeRequest();
  }, [callErrorAlert, params.postId]);

  const updateBookId = (bookId: IPostState["bookId"]): void =>
    setPost((state) => ({ ...state, bookId }));
  const updateDocumentId = (copyId: IPostState["copyId"]): void =>
    setPost((state) => ({ ...state, copyId }));

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Sửa bài đăng #{post.postId}
      </Typography>

      <CreateBook post={post} updateBookId={updateBookId} />
      <CreateDocument
        bookId={post.bookId}
        updateDocumentId={updateDocumentId}
      />
      <CreatePost copyId={post.copyId} />
    </>
  );
};

export default EditPost;
