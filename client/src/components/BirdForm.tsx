import axios from "axios";
import { Avatar, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useRef } from "react";

interface IProps {
  onCancel: () => void;
}

interface IData {
  name: string;
  species: string;
  uploadFile: any;
}

const defaultValues: IData = { name: "", species: "", uploadFile: "" };

// TODO: add validation rules

export function BirdForm(props: IProps) {
  const { onCancel } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({ defaultValues });

  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const { ref: registerUploadFileRef, ...registerUploadFileRest } = register("uploadFile");

  const [file] = watch("uploadFile");
  const fileUrl = file ? URL.createObjectURL(file) : "";

  function clearFile() {
    setValue("uploadFile", "");

    if (uploadFileRef.current) {
      uploadFileRef.current.value = "";
    }
  }

  function onSubmit(data: any) {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("species", data.species);
    formData.append("photo", data.uploadFile[0]);
    axios.post("/api/birds", formData);
    // TODO: set max file size
    // TODO: disable submit and cancel buttons
    // TODO: route to bird page on success
  }

  return (
    <Box className="BirdForm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add bird
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="name"
                  variant="outlined"
                  label="Name"
                  error={!!errors.name}
                  fullWidth
                  required
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="species"
              control={control}
              render={({ field }) => (
                <TextField
                  id="species"
                  variant="outlined"
                  label="Species"
                  error={!!errors.species}
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="uploadFile">
              <input
                id="uploadFile"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={(ref) => {
                  registerUploadFileRef(ref);
                  uploadFileRef.current = ref;
                }}
                {...registerUploadFileRest}
                // {...register("uploadFile")}
              />
              <Button variant="outlined" component="span">
                Upload photo
              </Button>
            </label>

            {fileUrl && (
              <Button sx={{ marginLeft: 2 }} onClick={clearFile}>
                Clear
              </Button>
            )}

            {fileUrl && <Avatar src={fileUrl} sx={{ height: 200, width: 200, marginTop: 2 }} />}
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={4} mt={5}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
