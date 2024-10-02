import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IBook } from "../../types/book";
import axios from "axios";
import { Autocomplete, Box, Chip, CircularProgress, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import DoneIcon from '@mui/icons-material/Done';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const FindBookAutocomplete = ({
  setOptions,
  options,
  open,
  setOpen,
}: {
  setOptions: Dispatch<SetStateAction<readonly IBook[]>>;
  options: readonly IBook[];
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) => {
  const { control, setValue } = useFormContext();
  const loading = open && options.length === 0;

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open, setOptions]);
  return (
    <Controller

      rules={{ required: `Trường tìm sách cần phải điển` }}
      render={(props) => (
        <Autocomplete
          {...props}
          disablePortal
          id="combo-box-demo"
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(event: React.ChangeEvent<{}>, newValue: IBook | null) => {
            props.field.onChange(event);
            const {
              id = null,
              isbn = "",
              title = "",
              authors = "",
              languageCode = "",
              genre = [],
              publisher = "",
              publishedDate = "",
              pageCount = 0,
              size = "",
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
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option) => {
            if (option.id == -1) {
              return (
                <Box component="li" {...props}>
                  <Chip
                    label={option.title}
                    icon={<AddOutlinedIcon />}
                    variant="outlined"
                  />
                </Box>
              );
            }
            return (
              <Box component="li" {...props}>
                #{option.id}: {option.title} - {option.authors}
              </Box>
            );
          }}
          getOptionKey={(option) => (option?.id ? option?.id : 0)}
          options={options}
          loading={loading}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Tìm sách *"
              error={!!props.fieldState.error}
              helperText={
                props.fieldState.error ? props.fieldState.error.message : null
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
      name="id"
      control={control}
    />
  );
};

export default FindBookAutocomplete;