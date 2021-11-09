const express = require('express')
const router = express.Router()
const Joi = require('joi');

let posts = [
    {id: '1', topic: 'test1', text: 'test text1'},
    {id: '2', topic: 'test2', text: 'test text2'},
    {id: '3', topic: 'test3', text: 'test text3'},
]

// GET /api/posts => [...posts]
router.get('/', (req, res) => {
   res.json({posts, status: 'succesdds'}) 
})

// GET /api/posts/<123> => {post with id 123}
router.get('/:id', (req, res) => {
  const {id} = req.params
    const [post] = posts.filter(it => it.id === req.params.id)

if (!post) {
 return res.status(400).json({ status: `don't have id ${id}`})
}
    res.json({post, status: 'successsss'})
})

// POST /api/posts => [changePost, ...posts]
router.post('/', (req, res) => {
  const schema = Joi.object({
    topic: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    text: Joi.string()
    .alphanum()
    .min(10)
    .max(400)
    .required(),
    
    // password: Joi.string()
    //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  })
  
  const validationResoult = schema.validate(req.body)
  
  if (validationResoult.error) {
    return res.status(400).json({ status: validationResoult.error.details})
  }
  const {topic, text} = req.body;
  
  posts.push({ id: new Date().getTime().toString(), topic, text });
  res.json({status: 'success'});
})

// PUT /api/posts/123 => [newPost, ...posts]
router.put('/:id', (req, res) => {
  const schema = Joi.object({
    topic: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    text: Joi.string()
    .alphanum()
    .min(10)
    .max(400)
    .required(),
    
    // password: Joi.string()
    //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  })
  
  const validationResoult = schema.validate(req.body)
  
  if (validationResoult.error) {
    return res.status(400).json({ status: validationResoult.error.details})
  }
  const {topic, text} = req.body;

  posts.forEach(post => {
    if (post.id === req.params.id) {
      post.topic = topic
      post.text = text
    }
  })
  res.json({status: 'success'});
})

router.patch('/:id', (req, res) => {
  const schema = Joi.object({
    topic: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
    text: Joi.string()
    .alphanum()
    .min(10)
    .max(400)
    .optional(),
    
    // password: Joi.string()
    //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  })
  
  const validationResoult = schema.validate(req.body)
  
  if (validationResoult.error) {
    return res.status(400).json({ status: validationResoult.error.details})
  }
  const {topic, text} = req.body;

  posts.forEach(post => {
    if (post.id === req.params.id) {
      if (topic) {
        post.topic = topic
      }
      if (text) {
        post.text = text
      }
    }
  })
  res.json({status: 'success'});
})

// DELETE /api/posts/123 => [posts without post id]
router.delete('/:id', (req, res) => {
  posts = posts.filter(it => it.id !== req.params.id)
  res.json({status: 'success'});
})

module.exports = {postsRouter: router}