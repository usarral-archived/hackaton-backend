
import express from 'express'

const app = express()

app.use('/', (_req, res) => {
    res.status(200).send('Hello World')
})
const { SERVER_PORT: port = 5010 } = process.env;

app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://0.0.0.0:${port}`);
});