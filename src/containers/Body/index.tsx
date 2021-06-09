import { FC } from "react";
import { Box, Container } from "@material-ui/core";

export interface BodyProps {}

const Body: FC<BodyProps> = ({ children }) => {
  return (
    <Container>
      <Box marginY={2}>{children}</Box>
    </Container>
  );
};

export default Body;
