import { FC } from "react";
import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Link href="/" underline="none" color="white">
            <Typography variant="h6" noWrap>
              Serind Test
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
