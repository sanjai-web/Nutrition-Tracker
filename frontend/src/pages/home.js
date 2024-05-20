import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/home.css"
export default function NutritionTracker() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    fetchFoods();
  }, []);
 
  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/foods');
      setFoods(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateFood = async () => {
    try {
      await axios.post('http://127.0.0.1:3001/foods', { name, calories });
      fetchFoods();
      setName('');
      setCalories(0);
      alert('Food created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create food');
    }
  };

  const handleEditFood = async (foodId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3001/foods/${foodId}`);
      const { name, calories } = response.data;
      setName(name);
      setCalories(calories);
    } catch (error) {
      console.error(error);
      alert('Failed to edit food');
    }
  };

  const handleUpdateFood = async (foodId) => {
    try {
      await axios.put(`http://127.0.0.1:3001/foods/${foodId}`, { name, calories });
      fetchFoods();
      setName('');
      setCalories(0);
      alert('Food updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update food');
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/foods/${foodId}`);
      fetchFoods();
      alert('Food deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete food');
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFoods = foods.filter(food => {
    return food.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <>
    <div className='container'>
      <h2>Nutrition Tracker</h2>
      <form>
        <div>
          <label>Food</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        </div>
        <div>
          <label>Calories</label>
          <input type="number" value={calories} onChange={(e) => setCalories(parseInt(e.target.value))} /><br />
          <button className='but1' type="button" onClick={handleCreateFood}>Create Food</button>
        </div>
      </form>
      <div>
  <input
    type="text"
    className="sear"
    placeholder="Search food..."
    value={searchTerm}
    onChange={handleSearch}
  />
  {filteredFoods.map(food => (
    <div key={food.id} style={{ margin: '20px' }}>
      <div>
        <strong>Name:</strong> {food.name}<br />
        <strong>Calories:</strong> {food.calories}<br />
        <span id="calorieStatus">
          {food.calories >= 100 ? "It is harmful" : "It is not harmful"}
        </span>
      </div>
      <div>
        <button className='but2' onClick={() => handleEditFood(food.id)}>Edit</button>
        <button className='but3' onClick={() => handleUpdateFood(food.id)}>Update</button>
        <button className='but4' onClick={() => handleDeleteFood(food.id)}>Delete</button>
      </div>
    </div>
  ))}
</div>

    </div>
    </>
  );
}
