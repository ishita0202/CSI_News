const Feedback = require('../models/feedbackModel');

const feedbackCtrl = {
    addfeedback: async (req, res) => {
        try {
            const { email, msg } = req.body;

            const feedback = new Feedback({
                email, msg
            });
            await feedback.save();

            res.json({
                msg: 'Feed back added',
                feedback
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

module.exports = feedbackCtrl;