import type { NextApiRequest, NextApiResponse } from "next";
import querystring from "querystring";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(
    `http://www.omdbapi.com/?${querystring.stringify(req.query)}`
  );
  const data = await response.json();
  res.status(200).json(data);
};
