const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');

let foods = [];

app.use(express.json());
app.use(cors());

app.get('/foods', (req, res) => {
  res.send(foods);
});

app.get('/foods/:id', (req, res) => {
  const foodId = req.params.id;
  const food = foods.find(food => food.id === foodId);
  if (!food) {
    return res.status(404).json({ message: 'Food not found' });
  }
  res.json(food);
});

app.post('/foods', (req, res) => {
  const { name, calories } = req.body;
  const newFood = { id: Date.now().toString(), name, calories };
  foods.push(newFood);
  res.status(201).json(newFood);
});

app.put('/foods/:id', (req, res) => {
  const foodId = req.params.id;
  const { name, calories } = req.body;
  const foodIndex = foods.findIndex(food => food.id === foodId);
  if (foodIndex === -1) {
    return res.status(404).json({ message: 'Food not found' });
  }
  foods[foodIndex] = { ...foods[foodIndex], name, calories };
  res.json(foods[foodIndex]);
});

app.delete('/foods/:id', (req, res) => {
  const foodId = req.params.id;
  foods = foods.filter(food => food.id !== foodId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
