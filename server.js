import app from "./src/app.js";

const port = process.env.Port || 5000;

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
