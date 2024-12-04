const fs = require('fs');
const path = require('path');


const habitsFilePath = path.join(__dirname, '../data/habits.json');

const readHabits = () => {
  const habitsData = fs.readFileSync(habitsFilePath);
  return JSON.parse(habitsData);
};

const writeHabits = (habits) => {
  fs.writeFileSync(habitsFilePath, JSON.stringify(habits, null, 2));
};


exports.addHabit = (req, res) => {
  const newHabit = req.body;
  const habits = readHabits();

  newHabit.id = Date.now().toString();
  habits.push(newHabit);
  writeHabits(habits);

  res.status(201).json({ status: 'success', data: newHabit });
};


exports.updateHabit = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const habits = readHabits();

  const habit = habits.find(h => h.id === id);
  if (!habit) {
    return res.status(404).json({ status: 'error', error: 'Habit not found' });
  }

  habit.completed = completed; 
  habit.date = new Date().toISOString(); 
  writeHabits(habits);

  res.json({ status: 'success', data: habit });
};

exports.getHabits = (req, res) => {
  const habits = readHabits();
  res.json({ status: 'success', data: habits });
};


exports.getWeeklyReport = (req, res) => {
  const habits = readHabits();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const weeklyHabits = habits.filter(h => new Date(h.date) > weekAgo);
  res.json({ status: 'success', data: weeklyHabits });
};
