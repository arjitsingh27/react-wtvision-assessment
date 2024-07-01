const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./middleware/auth');
const { dummyList } = require('./constant/dummy-json-data');

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = '4fa3b3e27b9e4e19d93b3aab3c95c1e74c7b9ef1dbd9d5932e7463a4c2b7a9f8f8d9f8c3a7e4f9a2d7c7f9b3a5c4d2e3'

app.use(cors());
app.use(bodyParser.json());

app.post('/auth/token', (req, res) => {
    const { username, password } = req.body;
    const accessToken = jwt.sign({ username: username }, secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username: username }, secretKey);
    res.send({ access: accessToken, refresh: refreshToken })
});

app.get('/api/items', authenticateToken, (req, res) => {
    res.json(dummyList);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
