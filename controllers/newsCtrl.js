const News = require('../models/newsModel');
const Users = require('../models/userModel');
const Comment = require('../models/cmntModel');

const newsCtrl = {
    addNews: async (req, res) => {
        try {
            const { title, images, content, category, user } = req.body;

            if (images.length === 0)
                return res.status(400).json({ msg: "Please add your photo." })

            if (!title)
                return res.status(400).json({ msg: "Please add title." });

            if (!content)
                return res.status(400).json({ msg: "Please add content." });

            if (!category)
                return res.status(400).json({ msg: "Please add Category." });

            const newNew = new News({
                title, images, content, category, user
            });
            await newNew.save();

            res.json({
                msg: 'News Added XD',
                newNew: {
                    ...newNew._doc,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    allNews: async (req, res) => {
        try {
            const news = await News.find().sort('-createdAt');
            res.json({
                msg: 'Successfully get all News',
                result: news.length,
                news
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    editNews: async (req, res) => {
        try {
            const { title, images, content, category } = req.body;
            const news = await News.findByIdAndUpdate({_id: req.params.id}, {
                title, images, content, category
            });
    
            if (images.length === 0)
                return res.status(400).json({ msg: "Please add your photo." })
    
            if (!title)
                return res.status(400).json({ msg: "Please add title." });
    
            if (!content)
                return res.status(400).json({ msg: "Please add content." });
    
            if (!category)
                return res.status(400).json({ msg: "Please add Category." });    
                
            res.json({
                msg: 'News Updated',
                newNew: {
                    ...news._doc,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteNews: async (req, res) => {
        try {
            const news = await News.findByIdAndDelete({_id: req.params.id});
    
            res.json({
                msg: 'News Removed',
                news: {
                    ...news,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    news: async (req, res) => {
        try {
            const news = await News.findById(req.params.id);
    
            const comments = await Comment.find({postId:req.params.id});
            if(!comments)
                return res.status(400).json({msg: "This News does not exist"});
    
            if(!news)
                return res.status(400).json({msg: "This News does not exist"});
    
            res.json({
                news,
                comments
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    newsCat: async (req, res) => {
        try {
            const news = await News.find({category:req.params.id}).sort('-createdAt');
            
            if(!news)
                return res.status(400).json({msg: "This News does not exist"});
    
            res.json({
                news
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    search: async (req, res) => {
        try {
            const news = await News.find({title: {$regex: req.query.news}});
            res.json({news});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    saveNews: async (req, res) => {
        try {
            const user = await Users.find({_id: req.user._id, saved: req.params.id});

            if(user.length > 0) 
                return res.status(400).json({msg: "You saved this post."});

            const save = await Users.findOneAndUpdate({_id: req.user.id}, {
                $push: {saved: req.params.id}
            }, {new: true})

            if(!save) 
                return res.status(400).json({msg: 'This user does not exist.'})

            res.json({msg: 'News Saved'});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    unSaveNews: async (req, res) => {
        try {
            const save = await Users.findOneAndUpdate({_id: req.params.user_id}, {
                $pull: {saved: req.params.id}
            }, {new: true});

            if(!save) 
                return res.status(400).json({msg: 'This user does not exist.'})

            res.json({msg: 'unSaved news!'})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getSavedNews: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password');
            const saveNews = await News.find({
                _id: {$in: user.saved}
            });
            res.json({
                saveNews
            })
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    addcomment: async (req, res) => {
        try {
            const { content, postId, postUserId } = req.body;

            const news = await News.findById(postId);
            if(!news)
                return res.status(400).json({msg: "This News does not exist."});

            const newCmnt = new Comment({
                content, postId, postUserId, user: req.user.id
            });

            await News.findOneAndUpdate({_id: postId}, {
                $push: {comments: newCmnt._id}
            }, {new: true});

            await newCmnt.save();

            res.json({
                msg: 'News Added XD',
                newCmnt
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    comment: async (req, res) => {
        try {
            const comments = await Comment.find({postId:req.params.id});
            if(!comments)
                return res.status(400).json({msg: "This News does not exist"});
    
            res.json({
                comments
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}

module.exports = newsCtrl;