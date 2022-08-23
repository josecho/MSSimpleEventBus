const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};


app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {

  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;

    const post = posts[postId];
    post.comments.push({ id, content });
  }

  res.send({});

});

app.listen(4002, async () => {
  console.log('Listening on 4002');
  const res = await axios.get('http://localhost:4005/events').catch((err) => {
    console.log(err.message);
  });

});
