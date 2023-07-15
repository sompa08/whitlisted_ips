"use strict";

const app = require('./server.js');

const port = 3000;

// Start the server
app.listen(3000, () => {
    console.log(`Server started on http://localhost:${port}`);
});
