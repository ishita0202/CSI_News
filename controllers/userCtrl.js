const Users = require('../models/userModel');

const userCtrl = {
    profile: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password');
        
            if(!user)
                return res.status(400).json({msg: "User does not exist"});

            res.json({user});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    edituser: async (req, res) => {
        try {
            const { username, website, avatar } = req.body;
            const user = await Users.findByIdAndUpdate({_id: req.params.id}, {
                username, website, avatar
            });

            if(!username)
                return res.status(400).json({ msg: "Please add Username." });

            if(!avatar)
                return res.status(400).json({ msg: "Please add Avatar." });

            res.json({
                msg: 'Profile Updated'
            });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userCtrl;