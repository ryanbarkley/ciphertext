import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Algorithms, {
  transformText,
  AlgorithmMode,
  isSupportedAlgorithmMode,
  AlgorithmName,
  isSupportedAlgorithm,
} from "./Algorithms";

function TextEncodingForm(props: BoxProps) {
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
    <Box display="flex" {...props}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            Select an algorithm below to encode or decode messages or{" "}
            <Link component={RouterLink} to={"/supported-algorithms"}>
              learn more about the supported algorithms
            </Link>
            .
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex">
            <Box display="flex">
              <TextField
                id="algorithm-selection"
                label="Algorithm"
                value={selectedAlgorithm}
                select
                variant="filled"
                onChange={handleSelectedAlgorithmChange}
                color="primary"
              >
                <ListSubheader>Basic Encoding</ListSubheader>
                {Object.keys(Algorithms)
                  .filter(
                    (name) =>
                      Algorithms[name as AlgorithmName].type ===
                      "basic-encoding"
                  )
                  .map((name) => (
                    <MenuItem key={name} value={name}>
                      {Algorithms[name as AlgorithmName].title}
                    </MenuItem>
                  ))}
                <ListSubheader>Substitution Ciphers</ListSubheader>
                {Object.keys(Algorithms)
                  .filter(
                    (name) =>
                      Algorithms[name as AlgorithmName].type ===
                      "substitution-cipher"
                  )
                  .map((name) => (
                    <MenuItem key={name} value={name}>
                      {Algorithms[name as AlgorithmName].title}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
            <Box marginLeft={3} display="flex">
              <ToggleButtonGroup
                value={algorithmMode}
                exclusive
                aria-label="Algorithm Mode"
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
              id="algorithm-key"
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
    </Box>
  );
}

export default TextEncodingForm;
