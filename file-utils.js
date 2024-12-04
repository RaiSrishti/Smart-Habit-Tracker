const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data', 'habits.json');


const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading the file:", err);
    return [];
  }
};


const writeDataToFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("Error writing to the file:", err);
  }
};

module.exports = { readDataFromFile, writeDataToFile };
