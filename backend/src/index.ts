import createServer from "./config/server";

const app = createServer();

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
