import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import database from "./database/config.js";

const PORT = process.env.PORT || 3011;

database();

app.listen(PORT, () => {
  console.log(`Server started at => ${PORT}`);
});









// just a normal comment
// https://www.freecodecamp.org/news/vimrc-configuration-guide-customize-your-vim-editor/
