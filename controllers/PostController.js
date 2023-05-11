
import PostModel from '../models/post.js'

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({createdAt : -1}).populate('user').exec()
        res.json(posts)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed, dont give posts!'
        })
    }
}
export const getAllAndSort = async (req, res) => {
    try {
        const posts = await PostModel.find().sort(({ viewCount: -1 })).populate('user').exec()
        res.json(posts)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed, getAllAndSort'
        })
    }
}
export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()
        const tags = posts.map(e => e.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed, dont give post'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findById(postId).populate('user').exec()
        res.status(200).json(post)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed, dont give this posts'
        })
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findByIdAndDelete(postId)

        res.json({ post })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed, dont give posts'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(', '),
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed to create object'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId
            },

        )

        res.json({
            success: post
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'failed, dont update posts'
        })
    }
}