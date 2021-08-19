import React from "react";
import { Container, Typography } from "@material-ui/core";

export default function Copyright() {
  return (
    <Container maxWidth="sm">
      <Typography variant="body1" color="textSecondary">
        Created with <span role="img">🔌</span> at home for Kontextsensitive
        Systeme {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}
