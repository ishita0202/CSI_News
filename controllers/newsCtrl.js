const News = require('../models/newsModel');

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
    },
    deleteNews: async (req, res) => {
        const news = await News.findByIdAndDelete({_id: req.params.id});

        res.json({
            msg: 'News Removed',
            news: {
                ...news,
                user: req.user
            }
        })
    },
    news: async (req, res) => {
        const news = await News.findById(req.params.id);

        if(!news)
            return res.status(400).json({msg: "This News does not exist"});

        res.json({
            news
        })
    },
    newsCat: async (req, res) => {
        const news = await News.find({category:req.params.id})
        
        if(!news)
            return res.status(400).json({msg: "This News does not exist"});

        res.json({
            news
        })
    },
    search: async (req, res) => {
        try {
            const news = await News.find({title: {$regex: req.query.news}});
            res.json({news});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = newsCtrl;