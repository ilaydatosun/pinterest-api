const router = require('express').Router()
const createError = require('http-errors')
const { nextTick } = require('process')
const Posts = require('../models/postModel')


router.get('/', async (req, res) => {
    const allPosts = await Posts.find({})
    res.json(allPosts)
})
router.get('/', async (req, ress) => {
    ress.send({
        message: "api merhaba"
    })
})

// router.get('/?search=', async (req, res, next)=>{
//     try{
//         const srchWord= await req.body.params.find({ params: req.body.params}, req.body)
//     }
// })

router.get('/:id', async (req, res, next) => {
    
    try {
        const response = await Posts.findById({ _id: req.params.id }, req.body,
            { new: true, runValidators: true })
        if (response) {
            return res.send(response)
        } else {
            return res.status(404).json({
                message: "Post bulunamadı"
            })
        }
    } catch (err) {
        next(err)
    }
    res.json({ message: "idsi:" + req.params.id + " olan post getirilecek" })
})

router.post('/', async (req, res, next) => {
    try {
        const createPost = new Posts(req.body)
        const { error, value } = createPost.joiValidation(req.body)
        if (error) {
            next(createError(400, error))
        } else {
            const response = await createPost.save()// save db
            res.json(response)
        }
    } catch (err) {
        next(err)
    }
})
router.patch('/:id', async (req, res, next) => {

    const { error, value } = Posts.joiValidationForUpdate(req.body)
    if (error) {
        next(createError(400, error))
    } else {
        try {
            const ptch = await Posts.findByIdAndUpdate({ _id: req.params.id }, req.body,
                { new: true, runValidators: true })
            if (ptch) {
                return res.send(ptch)
            } else {
                return res.status(404).json({
                    message: "Post bulunamadı"
                })
            }
        } catch (err) {
            next(err)
        }
    }

})

router.delete('/:id', async (req, res, next) => {
    try {
        const dlt = await Posts.findByIdAndDelete({ _id: req.params.id })
        if (dlt) {
            return res.json({
                message: "Post silindi"
            })
        } else {
            throw createError(404, 'Post bulunamadı')
        }
    } catch (err) {
        next(createError(400, err))
    }
})


module.exports = router