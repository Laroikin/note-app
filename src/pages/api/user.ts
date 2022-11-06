import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const postNote = async () => {
    const { title, content } = req.body;
    const response = await fetch(
      "http://127.0.0.1:8090/api/collections/notes/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  };
  const requestMethod = req.method;
  switch (requestMethod) {
    case "POST":
      postNote();
  }
};

export default handler;
