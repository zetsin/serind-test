import { FC } from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap>
            Serind Test
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
