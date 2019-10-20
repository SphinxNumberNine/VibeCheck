const Entry = require('../models/entry');
const Forum = require('../models/forum');

const getTS = function() {
    return Math.floor(Date.now() / 1000);
}
exports.getAll = function(req, res, next) {
    Forum.find()
        .exec()
        .then(function (docs) {
            let forums = [];
            if (docs) {
                for (let doc of docs) {
                    forums.push(doc);
                }
            }
            res.status(200).json({
                forums: forums
            })
        })
        .catch(function(error) {
            res.status(500).json({
                error: true,
                message: err.message
            })
        });
};

exports.getForumEntries = function(req, res, next) {
    let forum = req.body.forum

    if (!forum) {
        return res.status(500).json({
            error: true,
            message: 'Missing required fields'
        });
    }

    Entry.find({ forum: forum })
        .exec()
        .then(function(docs) {
            let entries = [];
            for (let doc of docs) {
                entries.push(doc);
            }
            res.status(200).json({
                "forum": forum,
                "entries": entries
            })
        })
        .catch(function(err) {
            res.status(500).json({
                error: true,
                message: err.message
            })
        });
};

exports.addComment = function(req, res, next) {
    let tokenData = req.tokenData;
    let username = tokenData.username;
    let entryId = req.body.id;
    let content = req.body.content;
    let forum = req.body.forum;

    if (!entryId || !forum) {
        return res.status(500).json({
            error: true,
            message: 'Missing required fields'
        });
    }

    Entry.findOne({ _id: entryId, forum: forum })
        .exec()
        .then(function(entry) {
            if (!entry) {
                res.status(404).json({
                    error: true,
                    message: 'Could not find entry'
                });
            }
            else {
                let updateOps = {
                    $push: {
                        comments: {
                            username: username,
                            content: content,
                            createdAt: getTS()+''
                        }
                    }
                }
                entry.update(updateOps)
                    .exec()
                    .then(function(res) {
                        res.status(201).json({
                            message: 'Comment created'
                        });
                    })
                    .catch(function(err) {
                        res.status(500).json({
                            error: true,
                            message: err.message
                        })
                    })
            }
        })
        .catch(function(err) {
            res.status(500).json({
                error: true,
                message: err.message
            })
        })
};