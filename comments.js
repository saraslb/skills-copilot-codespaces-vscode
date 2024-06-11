// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Read comments from file
const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
// Function to save comments to file
function saveComments() {
  fs.writeFileSync('comments.json', JSON.stringify(comments), 'utf8');
}
// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});
// Add a comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  saveComments();
  res.json(newComment);
});
// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
