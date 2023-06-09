const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const listingPath = path.join(__dirname, "shaders");

app.get("*", (req, res) => {
    // Build the path of the file using the URL pathname of the request.
    const filePath = path.join(listingPath, req.path);

    // If the path does not exist, return a 404.
    if (!fs.existsSync(filePath)) {
        return res.status(404).end();
    }

    // Check if the existing item is a directory or a file.
    if (fs.statSync(filePath).isDirectory()) {
        const filesInDir = fs.readdirSync(filePath);
        // If the item is a directory: show all the items inside that directory.
        return res.send(filesInDir);
    } else {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        // If the item is a file: show the content of that file.
        return res.send(fileContent);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("EManager Bot application listening on port", PORT);
});