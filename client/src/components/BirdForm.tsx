import axios from "axios";
import { useRef } from "react";
import { Avatar, Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IBird } from "@shared/types";
import { addBird } from "src/services/addBird";

interface IProps {
  bird?: IBird;
  onCancel: () => void;
  onSuccess: (bird: IBird) => void;
}

interface IData {
  name: string;
  species: string;
  imgFile: FileList | string;
}

const defaultValues: IData = { name: "", species: "", imgFile: "" };

// TODO: add validation rules

export function BirdForm(props: IProps) {
  const { bird, onCancel, onSuccess } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({ defaultValues });

  const imgFileRef = useRef<HTMLInputElement | null>(null);
  const { ref: registerImgFileRef, ...registerImgFileRest } = register("imgFile");

  const file = watch("imgFile")[0];
  const fileUrl = file ? URL.createObjectURL(file as File) : "";

  function clearFile() {
    setValue("imgFile", "");

    if (imgFileRef.current) {
      imgFileRef.current.value = "";
    }
  }

  async function onSubmit(data: IData) {
    const { imgFile, name, species } = data;

    if (bird) {
    } else {
      addBird({ name, species, imgFile: imgFile ? (imgFile as FileList)[0] : undefined });
    }
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
            <label htmlFor="imgFile">
              <input
                id="imgFile"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={(ref) => {
                  registerImgFileRef(ref);
                  imgFileRef.current = ref;
                }}
                {...registerImgFileRest}
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
