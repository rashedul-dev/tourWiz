import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("connect to DB ✅");

    server = app.listen(envVars.PORT, () => {
      console.log(`server is listing on port, ${envVars.PORT} 🚀`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

//Unhandled Rejection error Handler
process.on("unhandledRejection", () => {
  console.log("Unhandled Rejection detected... server is shutting down... ");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//Uncaught Exception error Handler
process.on("unhandledRejection", () => {
  console.log("Unhandled Exception detected... server is shutting down... ");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//SIGTERM Exception error Handler
process.on("SIGTERM", () => {
  console.log("TIGTERM signal received... server is shutting down... ");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Promise.reject(new Error("I forogot to catch this promise"));
// throw new Error("i forgot to handle this local errror");
// SIGINT -
