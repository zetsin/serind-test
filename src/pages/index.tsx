import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import useSWR from "swr";
import querystring from "querystring";
import {
  Button,
  Chip,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Theme,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import DatePicker from "@material-ui/lab/DatePicker";

const MovieListPage: NextPage<{}> = () => {
  const router = useRouter();

  const { data: movies } = useSWR<{
    Search: Movie[];
    totalResults: string;
  }>(() => {
    if (!router.query.s) {
      return null;
    }

    return `/?${querystring.stringify(router.query)}`;
  });

  const [form, setForm] = useState({
    s: "",
    type: "",
    y: "",
    page: 1,
  });

  useEffect(() => {
    setForm({
      ...form,
      ...router.query,
      page: Number(router.query.page ?? 1),
    });
  }, [router]);

  const search = (query?: Partial<typeof form>) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...Object.entries({
          ...form,
          ...query,
        }).reduce(
          (acc, [key, val]) => ({
            ...acc,
            ...(val
              ? {
                  [key]: val,
                }
              : {}),
          }),
          {}
        ),
      },
    });
  };

  const count = Number((Number(movies?.totalResults ?? 0) / 10).toFixed());

  const theme = useTheme();
  const smDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down("md"));
  const lgDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down("lg"));

  return (
    <>
      <Stack spacing={2}>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1}
        >
          <TextField
            label="Search"
            value={form.s}
            onChange={(event) => {
              setForm({
                ...form,
                s: event.currentTarget.value,
              });
            }}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="Type"
            value={form.type}
            onChange={(event) => {
              setForm({
                ...form,
                type: event.target.value,
              });
            }}
            style={{
              minWidth: theme.spacing(10),
            }}
            select
            InputLabelProps={{
              shrink: true,
            }}
            SelectProps={{
              displayEmpty: true,
            }}
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"movie"}>Movie</MenuItem>
            <MenuItem value={"series"}>Series</MenuItem>
            <MenuItem value={"episode"}>Episode</MenuItem>
          </TextField>
          <DatePicker
            label="Year"
            views={["year"]}
            value={new Date(form.y)}
            onChange={(date) => {
              setForm({
                ...form,
                y: String(date?.getUTCFullYear() ?? ""),
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: true,
                }}
                helperText={null}
                error={false}
              />
            )}
          />
          <Button
            variant="contained"
            onClick={() => {
              search();
            }}
            disabled={!form.s}
          >
            Search
          </Button>
        </Stack>
        <ImageList
          variant="masonry"
          cols={smDown ? 1 : mdDown ? 3 : lgDown ? 4 : 5}
          gap={8}
        >
          {(movies?.Search ?? []).map((item) => (
            <NextLink key={item.imdbID} href={`/${item.imdbID}`} passHref>
              <Link>
                <ImageListItem>
                  <img
                    src={
                      item.Poster !== "N/A"
                        ? item.Poster
                        : `https://picsum.photos/300/450?random=${item.imdbID}`
                    }
                  />
                  <ImageListItemBar title={item.Title} subtitle={item.Year} />
                  <Chip
                    label={item.Type}
                    color="secondary"
                    size="small"
                    sx={{
                      margin: 1,
                      position: "absolute",
                      top: 0,
                      right: 0,
                      "& *": {
                        overflow: "initial !important",
                      },
                    }}
                  />
                </ImageListItem>
              </Link>
            </NextLink>
          ))}
        </ImageList>
        {count > 0 && (
          <Stack alignItems="center">
            <Pagination
              page={form.page}
              onChange={(event, page) => {
                search({
                  page,
                });
              }}
              count={count}
              color="secondary"
            />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default MovieListPage;
