"use client";
import {
  AccordionDetails,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import NoImage from "./../../assets/images/noimg.png";
import { Accordion, AccordionSummary } from "./AccordionCustom";
import { useAuthStore } from "../../hooks/user";
import { useStoreAlert } from "../../hooks/alert";
import Link from "next/link";
import { handleError } from "../../api/handleError";
import { onCreateCopy, uploadFileService } from "../../api/create/createDocumentService";
import { IPostState } from "../../types/params";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export type TFieldDocumentValue = {
  damagePercent: string;
  linkImage: string;
};

const CreateDocument = ({
  updateDocumentId,
  bookId,
}: {
  updateDocumentId: (documentId: IPostState["copyId"]) => void;
  bookId: IPostState["bookId"];
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFieldDocumentValue>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState<string>();
  const { profile } = useAuthStore();
  const { callAlert, callErrorAlert } = useStoreAlert()

  const uploadFile = async (formData: FormData) => {
    try {
      const response = await uploadFileService(formData, setUploadProgress);
      if (typeof response == "string") {
        callErrorAlert(response);
      } else if (response && response?.data?.display_url) {
        setImgUrl(response?.data?.display_url);
      }
    } catch (error) {
      callErrorAlert(handleError(error))
    }
  }

  const resetStatus = () => {
    if (uploadProgress == 100 || imgUrl !== "") {
      setImgUrl("");
      setUploadProgress(0);
    }
  }

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      return await uploadFile(formData);
    } catch (error: unknown) {
      callErrorAlert(handleError(error))
    }
  };

  const onSubmit: SubmitHandler<TFieldDocumentValue> = async (value) => {
    if(!profile || !profile?.id) {
      callErrorAlert("Bạn chưa đăng nhập");
      return;
    };
    let data = ({
      bookId,
      ownerId: profile.id,
      quantity: 1,
      imageLink: imgUrl,
      damagePercent: parseFloat(value.damagePercent),
      updatedDate: "",
      deletedDate: "",
      copyStatus: "UNLISTED",
    });
    try {

      const response = await onCreateCopy(data);
      if (typeof response != "string" ) {
        updateDocumentId(response.data.id)
        callAlert(`Tạo tài liệu #${response.data.id} thành công`)
      } else {
        callErrorAlert(response)
      }
    } catch (error) {
      callErrorAlert(handleError(error))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Accordion sx={{ my: 2 }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Tài liệu
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                required
                type="number"
                label="Phần trăm hư hại (%)"
                variant="standard"
                {...register("damagePercent", {
                  required: "Cần phải điền trường này",
                })}
                error={!!errors?.damagePercent}
                helperText={
                  errors.damagePercent && errors.damagePercent?.message
                }
              />
            </Grid>
            <Grid item xs={4} sx={{
              alignContent: "flex-end",
              height: "full-height"
            }}>
              <Typography variant="body1" gutterBottom>Đọc về phần trăm hư hại sách <Link href={`/book-condition-guide`} target="_blank"><span className="text-primary font-semibold"> tại đây</span></Link></Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                onClick={resetStatus}
                startIcon={<CloudUploadIcon />}
              >
                Tải hình ảnh
                <VisuallyHiddenInput
                  onChange={handleFileUpload}
                  type="file"
                  multiple={false}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Grid>
            <Grid item xs={12}>
              <div className="relative w-full h-52 border rounded-lg">
                <Image
                  src={imgUrl ? imgUrl : NoImage}
                  alt="img"
                  sizes="52"
                  fill
                  className="object-contain"
                />
              </div>
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
              Tạo tài liệu
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </form>
  );
};
export default CreateDocument;
