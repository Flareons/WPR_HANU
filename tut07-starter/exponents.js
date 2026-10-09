const express = require('express');
const app = express();
const PORT = 8000;

app.get('/math/power/:base/:exponent', (req, res) => {
    const base = Number(req.params.base);
    const exponent = Number(req.params.exponent);

    const result = {
        result: Math.pow(base, exponent)
    };

    if (req.query.root === 'true') {
        result.root = Math.sqrt(base);
    }

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});