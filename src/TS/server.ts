import express, { Request, Response } from "express";
import { urlencoded } from "express";
import shortid from "shortid";
import fs from "fs";

const app = express();

app.set("view engine", "ejs");
app.use(urlencoded({ extended: true }));

type ShortUrl = {
  full: string;
  short: string;
  clicks: number;
};

const DATA_FILE = "./data/data.json";

function loadUrls(): ShortUrl[] {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

function saveUrls() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(shortUrls));
}

let shortUrls: ShortUrl[] = loadUrls();

app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrls });
});

app.post("/shortUrls", (req: Request, res: Response) => {
  const fullUrl = req.body.fullUrl;
  const normalizedFullUrl =
    fullUrl.startsWith("http://") || fullUrl.startsWith("https://")
      ? fullUrl
      : "http://" + fullUrl;

  const short = shortid.generate();

  shortUrls.push({
    full: normalizedFullUrl,
    short: short,
    clicks: 0,
  });

  saveUrls();
  res.redirect("/");
});

app.get("/:short", (req: Request, res: Response) => {
  const short = req.params.short;
  const found = shortUrls.find((url) => url.short === short);

  if (!found) {
    res.status(404).send("URL not found");
    return;
  }

  found.clicks++;
  saveUrls();
  res.redirect(found.full);
});

app.listen(3200, () => {
  console.log("Server started on port 3200");
});
