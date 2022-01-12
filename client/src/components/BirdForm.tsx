import axios from "axios";
import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

interface IData {
  birdName: string;
  birdPhoto?: any;
  birdSpecies: string;
}

const defaultValues: IData = { birdName: "", birdSpecies: "" };

export function BirdForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({ defaultValues });

  const [file] = watch("birdPhoto") ?? [];
  const fileUrl = file ? URL.createObjectURL(file) : "";

  function clearFile() {
    setValue("birdPhoto", undefined);
  }

  function onSubmit(data: any) {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.birdName);
    formData.append("species", data.birdSpecies);
    formData.append("photo", data.birdPhoto[0]);
    axios.post("/api/birds", formData);
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
              name="birdName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="birdName"
                  variant="outlined"
                  label="Name"
                  error={!!errors.birdName}
                  fullWidth
                  required
                  {...field}
                />
              )}
            />

            <Controller
              name="birdSpecies"
              control={control}
              render={({ field }) => (
                <TextField
                  id="birdSpecies"
                  variant="outlined"
                  label="Species"
                  error={!!errors.birdSpecies}
                  fullWidth
                  {...field}
                />
              )}
            />
          </Stack>

          <Stack alignItems="center" spacing={2} sx={{ width: "100%" }}>
            <Stack direction="row" spacing={2}>
              <label htmlFor="birdPhoto">
                <input
                  id="birdPhoto"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  {...register("birdPhoto")}
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
