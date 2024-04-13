import ExpressConfig from "./config/express.config.js"

const app = ExpressConfig()
const PORT = process.env.PORT || 3000

app.get('/', (_req, res) => {
    res.send('Hi, The API is working!');
});

app.listen(PORT, () => console.log("\n Server Running on Port " + PORT))