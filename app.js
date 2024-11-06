const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const posts = [];

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/submit', (req, res) => {
  const newPost = {
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    date: new Date()
  };
  posts.push(newPost);
  res.render('confirmation', { post: newPost });
});

app.get('/entries', (req, res) => {
  res.render('entries', { posts });
});

app.get('/recent', (req, res) => {
  const oneMinuteAgo = new Date(Date.now() - 60000);
  const recentPosts = posts.filter(post => post.date > oneMinuteAgo);
  res.render('entries', { posts: recentPosts });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
