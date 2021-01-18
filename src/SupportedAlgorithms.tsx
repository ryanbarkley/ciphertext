import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import Algorithms, { AlgorithmName } from "./Algorithms";

type AlgorithmInfoProps = {
  name: AlgorithmName;
};
function AlgorithmInfo({ name }: AlgorithmInfoProps) {
  const algorithm = Algorithms[name];
  return (
    <Box marginTop={3} marginBottom={3}>
      <Typography variant="h5" component="h3">
        <Link href={algorithm.url} target="_blank" rel="noopener noreferrer">
          {algorithm.title}
        </Link>
      </Typography>
      <Typography>{algorithm.description}</Typography>
    </Box>
  );
}

function SupportedAlgorithms(props: BoxProps) {
  return (
    <Box {...props}>
      <Typography variant="h4" component="h2">
        Basic Encoding
      </Typography>
      {Object.keys(Algorithms)
        .filter(
          (name) => Algorithms[name as AlgorithmName].type === "basic-encoding"
        )
        .map((name) => (
          <AlgorithmInfo key={name} name={name as AlgorithmName} />
        ))}
      <Typography variant="h4" component="h2">
        Substitution Ciphers
      </Typography>
      {Object.keys(Algorithms)
        .filter(
          (name) =>
            Algorithms[name as AlgorithmName].type === "substitution-cipher"
        )
        .map((name) => (
          <AlgorithmInfo key={name} name={name as AlgorithmName} />
        ))}

      <Typography>
        <Link component={RouterLink} to={"/"}>
          Ready encode or decode a message?
        </Link>
      </Typography>
    </Box>
  );
}

export default SupportedAlgorithms;
