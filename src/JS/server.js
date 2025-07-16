"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const shortid_1 = __importDefault(require("shortid"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.use((0, express_2.urlencoded)({ extended: true }));
app.use(express_1.default.static("public"));
const DATA_FILE = "./data/data.json";
function loadUrls() {
    if (!fs_1.default.existsSync(DATA_FILE))
        return [];
    const data = fs_1.default.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
}
function saveUrls() {
    fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(shortUrls));
}
let shortUrls = loadUrls();
app.get("/", (req, res) => {
    res.render("index.ejs", { shortUrls });
});
app.post("/shortUrls", (req, res) => {
    const fullUrl = req.body.fullUrl;
    const normalizedFullUrl = fullUrl.startsWith("http://") || fullUrl.startsWith("https://")
        ? fullUrl
        : "http://" + fullUrl;
    const short = shortid_1.default.generate();
    shortUrls.push({
        full: normalizedFullUrl,
        short: short,
        clicks: 0,
    });
    saveUrls();
    res.redirect("/");
});
app.get("/:short", (req, res) => {
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
