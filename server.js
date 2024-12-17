const app = require("./app");
const connectdb = require("./database/db");

//add environment variable
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

//uncaught error 
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to an uncaught exception");
    process.exit(1);
});

//connect database
connectdb();

//listen to server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`server is listening at port no ${PORT}...`);
});

//unhandled promice rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log("sutting down the server due to unhandled promice rejection");
    server.close(() => {
        process.exit(1);
    });
});
