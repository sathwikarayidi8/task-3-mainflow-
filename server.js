const express = require('express');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
    body('email').isEmail().withMessage('Invalid email format.'),
    body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters long.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Form submitted successfully!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
