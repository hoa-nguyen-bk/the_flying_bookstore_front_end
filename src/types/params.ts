export interface IParamsDetail {
  params: { detail: Array<string> };
}
export interface IParamsEditListing {
  params: { postId: Array<string> };
}

export interface IPostState {
  bookId: number | string | undefined;
  copyId: string | undefined;
  postId: string | undefined;
}
