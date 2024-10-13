"use client";

import {
  AccordionDetails,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary } from "./AccordionCustom";
import axios from "axios";
import { useEffect, useState } from "react";
import { IBook } from "../../types/book";
import FindBookAutocomplete from "./FindBookAutocomplete";
import { InputListing } from "./InputListing";
import GenreAutocomplete from "./GenreAutocomplete";
import { useStoreAlert } from "../../hooks/alert";
import { onCreateBook, getAllBooksService } from "@/api/create/createBookService";
import { IPostState } from "../../types/params";

const addBookDefault: IBook = {
  title: "Thêm mới sách",
  id: -1,
  isbn: "",
  authors: [],
  languageCode: "",
  genre: [],
  publisher: "",
  publishedDate: "",
  pageCount: undefined,
  size: "",
};
const CreateBook = ({
  updateBookId,
  post,
}: {
  updateBookId: (bookId: IPostState["bookId"]) => void;
  post: IPostState
}) => {
  const [options, setOptions] = useState<readonly IBook[]>([addBookDefault]);
  const [open, setOpen] = useState(false);
  const { callAlert, callErrorAlert } = useStoreAlert();
  const methods = useForm<IBook>();
  const { handleSubmit, getValues, setValue } = methods;
  const id = getValues("id");

  const loading = open && options.length === 0;


  const handleBookSelection = (newValue: IBook | null) => {
    const {
      id, isbn = "", title = "", authors = [], languageCode = "", genre = [], publisher = "", publishedDate = "", pageCount = 0, size = "",
    } = newValue || {};
    setValue("isbn", isbn);
    setValue("title", id == -1 ? "" : title);
    setValue("authors", authors);
    setValue("languageCode", languageCode);
    setValue("genre", genre);
    setValue("publisher", publisher);
    setValue("publishedDate", publishedDate);
    setValue("pageCount", pageCount);
    setValue("size", size);
    setValue("id", id);
  }

  const onSubmit: SubmitHandler<IBook> = async (value) => {
    try {
      // Kiểm tra nếu sách đã tồn tại (ID hợp lệ)
      if (value?.id && value.id > 0) {
        updateBookId(value.id);
        return callAlert("Chọn sách thành công");
      }

      // Destructuring các giá trị từ form
      const {
        authors,
        genre,
        isbn,
        languageCode,
        pageCount,
        publishedDate,
        publisher,
        size,
        title,
      } = value;

      // Chuẩn bị dữ liệu để tạo sách
      const data = JSON.stringify({
        isbn,
        title,
        authors: [authors],
        publisher,
        languageCode,
        genre: genre.map((item) => (typeof item === 'string' ? item : item.name)),
        publishedDate,
        size,
        pageCount,
      });

      // Gọi hàm onCreateBook để tạo sách
      const response = await onCreateBook(data);

      // Kiểm tra kết quả trả về từ onCreateBook
      if (typeof response === 'string') {
        // Nếu có lỗi, gọi hàm callErrorAlert
        callErrorAlert(response);
      } else if (response?.data) {
        // Nếu thành công, cập nhật ID sách và hiển thị thông báo
        updateBookId(response.data.id);
        callAlert("Tạo sách thành công");
      }
    } catch (error) {
      // Xử lý lỗi không mong đợi trong quá trình xử lý
      console.error("Unexpected error during book submission:", error);
      callErrorAlert("Đã xảy ra lỗi trong quá trình gửi sách. Vui lòng thử lại.");
    }
  };
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    const getAllBook = async () => {
      const response = await getAllBooksService();
      if (response) {
        if (active) {
          setOptions([addBookDefault, ...response]);
        }
      }
      else {
        console.log('Error fetching data:', response?.error);
      }
    }
    getAllBook();
    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ borderBottom: 1, borderBottomColor: "lightgray" }}
          >
            Sách
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FindBookAutocomplete
                  open={open}
                  options={options}
                  setOpen={setOpen}
                  setOptions={setOptions}
                  handleBookSelection={handleBookSelection}
                />
              </Grid>

              <Grid item xs={6}>
                <InputListing label="Tiêu đề" name="title" required />
              </Grid>
              <Grid item xs={6}>
                <InputListing label="Tác giả" name="authors" required />
              </Grid>
              <Grid item xs={12}>
                <GenreAutocomplete />
              </Grid>
              <Grid item xs={4}>
                <InputListing label="Nhà xuất bản" name="publisher" required />
              </Grid>
              <Grid item xs={4}>
                <InputListing
                  label="Số trang"
                  name="pageCount"
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={4}>
                <InputListing label="Kích thước" name="size" />
              </Grid>
              <Grid item xs={4}>
                <InputListing label="ISBN" name="isbn" required />
              </Grid>
              <Grid item xs={4}>
                <InputListing
                  label="Ngày phát hành"
                  name="publishedDate"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <InputListing label="Ngôn ngữ" name="languageCode" required />
              </Grid>
            </Grid>
            <Box
              width={"100%"}
              display={"flex"}
              justifyContent={"flex-end"}
              mt={2}
            >
              <Button
                variant="outlined"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                {id == -1 ? `Tạo sách` : `Chọn sách`}
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      </form>
    </FormProvider>
  );
};

export default CreateBook;
