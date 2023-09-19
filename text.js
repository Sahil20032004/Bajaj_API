const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Dummy user information
const user = {
  full_name: 'sahil_srivastava',
  dob: '02032003',
  email: 'sahil.srivastava2020@vitbhopal.ac.in',
  roll_number: '20BCE10417',
};

app.get('/', (req, res) => {
  res.send('Hey, this is my API running 🥳');
});

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input data' });
  }

  // Calculate the highest alphabet in the input array of alphabets
  const alphabets = data.filter((item) => isNaN(item));
  const highestAlphabet = alphabets.reduce((max, alphabet) => {
    return alphabet > max ? alphabet : max;
  }, '');

  const response = {
    is_success: true,
    user_id: `${user.full_name}_${user.dob}`,
    email: user.email,
    roll_number: user.roll_number,
    numbers: data.filter((item) => !isNaN(item)),
    alphabets: alphabets,
    highest_alphabet: highestAlphabet,
  };

  res.status(200).json(response);
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
