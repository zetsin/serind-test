import { Fragment } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import querystring from "querystring";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  List,
  ListItem,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from "@material-ui/core";

const MovieDetailPage: NextPage<{}> = () => {
  const router = useRouter();

  const { data: movie } = useSWR<Movie>(() => {
    const { id } = router.query;

    if (!id) {
      return null;
    }

    return `/?${querystring.stringify({
      i: id,
    })}`;
  });

  return (
    <>
      <Stack spacing={2}>
        <Box>
          <Button
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </Box>
        <Card
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
            },
          }}
          raised
        >
          <Box
            sx={{
              flex: 1,
            }}
          >
            <CardHeader
              title={movie?.Title}
              subheader={movie?.Year}
              action={
                <Chip label={movie?.Type} color="secondary" size="small" />
              }
            />
            <CardContent>
              <List disablePadding>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Released"
                    secondary={movie?.Released}
                  />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText primary="Genre" secondary={movie?.Genre} />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemText
                    primary="Ratings"
                    secondary={
                      <>
                        {movie?.Ratings?.map((item, index) => {
                          const [value, max] = item.Value.split("/").map(
                            (item) => Number(item)
                          );

                          return (
                            <Fragment key={index}>
                              <Typography component="legend">
                                {item.Source}
                              </Typography>
                              <Rating
                                name="read-only"
                                value={value}
                                max={max}
                                precision={0.1}
                                readOnly
                              />
                            </Fragment>
                          );
                        })}
                      </>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            src={movie?.Poster}
            style={{
              width: "auto",
            }}
          />
        </Card>
      </Stack>
    </>
  );
};

export default MovieDetailPage;
