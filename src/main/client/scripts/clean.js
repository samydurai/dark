const path = require("path");
const fs = require("fs");

const dirPath = path.join(__dirname, "../dist");
const files = fs.readdirSync(dirPath);
files.forEach((fileName) => {
  const filePath = path.join(dirPath, fileName);
  fs.unlinkSync(filePath);
});
