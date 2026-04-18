import fs from 'fs';   
import { sendJSONResponse, parseJsonBody } from '../utils/helper.js';
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dataPath = path.join(__dirname, "../data/entries.json");


// GET all entries
export const getEntries = async (req, res) => {
  try {
    const data = await fs.promises.readFile(dataPath, "utf-8");
    const entries = JSON.parse(data);
    sendJSONResponse(res, 200, entries);
  } catch (err) {
    sendJSONResponse(res, 500, { error: "Could not read entries" });
  }
};

// POST a new entry
export const createEntry = async (req, res) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk.toString()));

  req.on("end", async () => {
    try {
      const parsedData = parseJsonBody(body);
      if (!parsedData) return sendJson(res, 400, { error: "Invalid JSON" });
      if (!parsedData.title || !parsedData.content) {
        return sendJSONResponse(res, 400, { error: "Title and content are required" });
      }

      const data = await fs.promises.readFile(dataPath, "utf-8");
      const entries = JSON.parse(data);

      const newEntry = {
        id: Date.now(),
        title: parsedData.title,
        content: parsedData.content,
        date: new Date().toLocaleDateString("en-GB"),
      };

      entries.push(newEntry);

      await fs.promises.writeFile(dataPath, JSON.stringify(entries, null, 2));
      sendJSONResponse(res, 201, { message: "Entry saved", data: newEntry });
    } catch (err) {
      sendJSONResponse(res, 500, { error: "Could not save entry" });
    }
  });
};