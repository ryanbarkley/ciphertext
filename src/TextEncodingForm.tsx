import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {
  transformText,
  AlgorithmMode,
  isSupportedAlgorithmMode,
  AlgorithmName,
  isSupportedAlgorithm,
} from "./Algorithms";

function TextEncodingForm() {
  const [
    selectedAlgorithm,
    setSelectedAlgorithm,
  ] = React.useState<AlgorithmName>("base64");
  const handleSelectedAlgorithmChange = (
    event: React.ChangeEvent<{ value: string }>
  ) => {
    const newValue = event.target.value;
    if (isSupportedAlgorithm(newValue)) {
      setSelectedAlgorithm(newValue as AlgorithmName);
    }
  };

  const [algorithmMode, setAlgorithmMode] = React.useState<AlgorithmMode>(
    "encode"
  );
  const handleAlgorithmModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: string
  ) => {
    if (isSupportedAlgorithmMode(newMode)) {
      setAlgorithmMode(newMode as AlgorithmMode);
    }
  };

  const [sourceText, setSourceText] = React.useState("");
  const handleSourceTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSourceText(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex">
          <Box display="flex">
            <TextField
              id="algorithim-selection"
              label="Algorithm"
              value={selectedAlgorithm}
              select
              variant="filled"
              onChange={handleSelectedAlgorithmChange}
              color="primary"
            >
              <ListSubheader>Basic Encoding</ListSubheader>
              <MenuItem value={"base64"}>Base 64</MenuItem>
              <MenuItem value={"hex"}>Hexadecimal</MenuItem>
              <MenuItem value={"octal"}>Octal</MenuItem>
              <ListSubheader>Substitution Ciphers</ListSubheader>
              <MenuItem value={"caesar"}>Caesar</MenuItem>
              <MenuItem value={"rot13"}>ROT13</MenuItem>
            </TextField>
          </Box>
          <Box marginLeft={3} display="flex">
            <ToggleButtonGroup
              value={algorithmMode}
              exclusive
              aria-label="Algorithim Mode"
              onChange={handleAlgorithmModeChange}
            >
              <ToggleButton value="encode" aria-label="encode source text">
                Encode
              </ToggleButton>
              <ToggleButton value="decode" aria-label="decode source text">
                Decode
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {/* <Box marginLeft={3}>
            <TextField
              id="algorithim-key"
              label="Key"
              placeholder="example"
              variant="filled"
            />
          </Box> */}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="source-text"
          fullWidth
          label="Source message"
          multiline
          variant="filled"
          value={sourceText}
          onChange={handleSourceTextChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="transformed-text"
          fullWidth
          label={
            algorithmMode === "encode" ? "Encoded message" : "Decoded message"
          }
          multiline
          variant="filled"
          value={transformText(sourceText, selectedAlgorithm, algorithmMode)}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default TextEncodingForm;
