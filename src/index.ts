import express from "express";
import path from "path";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

import { passport, database } from "./modules";
import { authRouter, dashboardRouter, publicRouter } from "./routes";

const app = express();

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded());
app.use(cookieParser("yusufbek"));
app.use(session({ secret: "yusufbek", cookie: { maxAge: 60 * 60 * 1000 } }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/", publicRouter, authRouter);
app.use("/dashboard", dashboardRouter);

(async function main() {
  await database.connect();
  console.log("Successfuly connected to DB!");

  app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
})();
