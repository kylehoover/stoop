import axios from "axios";
import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

interface IData {
  name: string;
  species: string;
  uploadFile?: any;
}

const defaultValues: IData = { name: "", species: "" };

export function BirdForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({ defaultValues });

  const [file] = watch("uploadFile") ?? [];
  const fileUrl = file ? URL.createObjectURL(file) : "";

  function clearFile() {
    setValue("uploadFile", undefined);
  }

  function onSubmit(data: any) {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("species", data.species);
    formData.append("photo", data.uploadFile[0]);
    axios.post("/api/birds", formData);
    // TODO: set max file size
  }

  return (
    <Box className="BirdForm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add bird
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack direction={{ xs: "column", sm: "column" }} spacing={2} sx={{ width: "100%" }}>
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
          </Stack>

          <Stack alignItems="center" spacing={2} sx={{ width: "100%" }}>
            <Stack direction="row" spacing={2}>
              <label htmlFor="uploadFile">
                <input
                  id="uploadFile"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  {...register("uploadFile")}
                />
                <Button variant="contained" component="span">
                  Upload photo
                </Button>
              </label>

              {fileUrl && (
                <Button variant="outlined" color="error" onClick={clearFile}>
                  Clear
                </Button>
              )}
            </Stack>

            {fileUrl && <Avatar src={fileUrl} sx={{ height: 200, width: 200 }} />}
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={4} mt={5}>
          <Button color="error">Cancel</Button>
          <Button variant="contained" type="submit" color="success">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
