import { URL } from "url";
import path from "path";
import { fileURLToPath } from "url";
import { serveStaticFile, sendJSONResponse } from "./utils/helper.js";
import { getEntries, createEntry } from "./controllers/entryController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handleRoutes = (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname;

  //API ROUTES
  if (pathname === "/api/entries" && req.method === "GET") {
    return getEntries(req, res);
  } else if (pathname === "/api/entries" && req.method === "POST") {
    return createEntry(req, res);
  }
  //STATIC FILES

  if (pathname === "/") {
    return serveStaticFile(
      res,
      path.join(__dirname, "public", "index.html"),
      "text/html",
    );
  } else if (pathname === "/entries.html") {
    return serveStaticFile(
      res,
      path.join(__dirname, "public", "entries.html"),
      "text/html",
    );
  } else if (pathname === "/style.css") {
    return serveStaticFile(
      res,
      path.join(__dirname, "public", "style.css"),
      "text/css",
    );
  } else {
    return sendJSONResponse(res, 404, { error: "Route not found" });
  }
};
