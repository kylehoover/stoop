import { useRef, useState } from "react";
import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";

export function BirdForm() {
  const [fileUrl, setFileUrl] = useState("");
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  function clearFile() {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
      setFileUrl("");
    }
  }

  function onUpload(e: any) {
    const [file] = e.target.files;

    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
  }

  return (
    <Box className="BirdForm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add bird
      </Typography>

      <form
        onSubmit={(e: any) => {
          console.log(e);
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Stack direction={{ xs: "column", sm: "column" }} spacing={2} sx={{ width: "100%" }}>
            <TextField id="birdName" variant="outlined" label="Name" fullWidth required />
            <TextField id="birdSpecies" variant="outlined" label="Species" fullWidth />
          </Stack>

          <Stack alignItems="center" spacing={2} sx={{ width: "100%" }}>
            <Stack direction="row" spacing={2}>
              <label htmlFor="uploadInput">
                <input
                  id="uploadInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={onUpload}
                  ref={inputFileRef}
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
          <Button>Cancel</Button>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
