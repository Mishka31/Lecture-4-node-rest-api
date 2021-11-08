const express = require('express')
const router = express.Router()
const posts = [
    {id: '1', topic: 'test1', test: 'test text1'},
    {id: '2', topic: 'test2', test: 'test text2'},
    {id: '3', topic: 'test3', test: 'test text3'},
]

// GET /api/posts => [...posts]
router.get('/', (req, res) => {
   res.json({posts, status: 'succesdds'}) 
})

// GET /api/posts/<123> => {post with id 123}
router.get('/:id', (req, res) => {
    const [post] = posts.filter(it => it.id === req.params.id)
    res.json({post, status: 'successsss'})
})

// GET /api/posts => [newPost, ...posts]
router.post('/', (req, res) => {
  const {topic, text} = req.body
  posts.push({id: new Date.getTime().toString(), topic, text})
  res.json({status: 'success'})
})

router.put('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

module.exports = {postsRouter: router}