import app from "./app.js";
const { PORT } = process.env;

const startApp = async () => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    })
}

await startApp();