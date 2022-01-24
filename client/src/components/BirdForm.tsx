import { useCallback, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { IBird } from "@shared/types";
import { useAddBirdMutation } from "src/api";
import { IHaveFormHandlers } from "src/types";

interface IProps extends IHaveFormHandlers<IBird> {
  bird?: IBird;
}

interface IData {
  name: string;
  species: string;
  imgFileList?: FileList;
}

const defaultValues: IData = { name: "", species: "", imgFileList: undefined };

// TODO: add validation rules

export function BirdForm(props: IProps) {
  const { bird, onCancel, onSuccess } = props;
  const addBirdMutation = useAddBirdMutation();
  const isLoading = addBirdMutation.isLoading;

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm({ defaultValues });

  const imgFileRef = useRef<HTMLInputElement | null>(null);
  const { ref: registerImgFileListRef, ...registerImgFileListRest } = register("imgFileList");

  const file = watch("imgFileList")?.[0];
  const fileUrl = file ? URL.createObjectURL(file as File) : "";

  const clearFile = useCallback(() => {
    setValue("imgFileList", undefined);

    if (imgFileRef.current) {
      imgFileRef.current.value = "";
    }
  }, [setValue]);

  const onSubmit = useCallback(
    async (data: IData) => {
      const { imgFileList, name, species } = data;
      const imgFile = imgFileList?.[0];

      if (bird) {
        // TODO: update existing bird
      } else {
        addBirdMutation.mutate({ imgFile, name, species }, { onSuccess });
      }
      // TODO: set max file size
    },
    [addBirdMutation, bird, onSuccess]
  );

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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <label htmlFor="imgFileList">
              <input
                id="imgFileList"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                disabled={isLoading}
                ref={(ref) => {
                  registerImgFileListRef(ref);
                  imgFileRef.current = ref;
                }}
                {...registerImgFileListRest}
              />
              <Button variant="outlined" component="span" disabled={isLoading}>
                Upload photo
              </Button>
            </label>

            {fileUrl && (
              <Button sx={{ marginLeft: 2 }} onClick={clearFile} disabled={isLoading}>
                Clear
              </Button>
            )}

            {fileUrl && <Avatar src={fileUrl} sx={{ height: 200, width: 200, marginTop: 2 }} />}
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={4} mt={5}>
          <Button disabled={isLoading} onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress color="inherit" size={20} sx={{ mx: 2 }} /> : "Submit"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
