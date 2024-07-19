const express = require('express')
const app = express();

app.use(express.static('public'))
const addTwoNumber = (n1, n2) => {
    return n1 + n2;
}

operations = {
    '+': addTwoNumber,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
}

app.get('/addTwoNumber', (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = addTwoNumber(n1, n2)
    res.json({ statuscode: 200, data: result })
})

app.get('/calculate', (req, res) => {
    const a = parseFloat(req.query.a)
    const b = parseFloat(req.query.b)
    try {
        const result = operations[req.query.op](a, b);
        res.json({ statuscode: 200, data : result })
    } catch (e) {
        res.json({ statuscode: 400, error: e.message });
    }
})

app.get("/Display", (req, res) => {
    const n1 = "<html><body><h1>Hello There</h1></body></html>"
    res.set('Content-Type', 'text/html')
    res.send(Buffer.from(n1))
})
const port = 3040;
app.listen(port, () => {
    console.log("hello im listening to port:" + port);
})