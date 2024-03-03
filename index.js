import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://bank-apis.justinclicks.com/API/V1/";


//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "e8547dca-e9dc-4461-905d-842011d0524e";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Search bank details by IFSC Code" });
});

app.post("/bank-details", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/IFSC/" + searchId);
    res.render("index.ejs", { content: JSON.stringify(result.data)});
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
