const Joi = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        // required: true,
        trim: true,
        minLength: 1,
        maxLength: 500,
    },
    userName: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        minLength: 5,
        maxLength: 50
    },
    photoURL: {
        type: String,
        // data: Buffer,
        contentType: String,
        // photoURL: String
    },
    comments: [{
        type: String
    }]
}, { collection: 'blogs', timestamps: true })

const schema = Joi.object({
    title: Joi.string().min(1).max(500).trim(),
    userName: Joi.string().min(5).max(50).trim(),
    photoURL: Joi.binary(),
    comments: Joi.string().trim()
})

PostSchema.methods.joiValidation = function (postObject) {
    schema.required()
    return schema.validate(postObject)
}

// PostSchema.methods.toJSON = function () {
//     // const post = this.toObject()
//     // delete post._id
//     // delete post.createdAt
//     // delete post.updatedAt
//     // delete post.__v

//     // return post
// }
PostSchema.statics.joiValidationForUpdate = function (postObject) {
    return schema.validate(postObject)
}
const Posts = mongoose.model('Posts', PostSchema)

module.exports = Posts