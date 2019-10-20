const mongoose = require('mongoose');

const Entry = require('../models/entry');
const Forum = require('../models/forum');

const getTip = require('../gcp/getTip');

exports.getProfileEntries = function(req, res, next) {
    let tokenData = req.tokenData;
    let username = tokenData.username;

    Entry.find({ username: username})
        .exec()
        .then(function (docs) {
            let entries = [];
            if (docs) {
                for (let doc of docs) {
                    entries.push(doc);
                }
            }
            res.status(200).json({
                entries: entries
            })
        })
        .catch(function(error) {
            res.status(500).json({
                error: true,
                message: err.message
            })
        });
};

exports.addEntry = function(req, res, next) {
    let tokenData = req.tokenData;
    let username = tokenData.username;
    let content = req.body.content;
    let color = req.body.color;
    let title = req.body.title;
    let image = req.body.image;
    let date = req.body.date;

    if (!content || !color || !date || !image || !title) {
        return res.status(500).json({
            error: true,
            message: 'Missing required fields'
        });
    }

    Entry.findOne({ date: date })
        .exec()
        .then(function(doc) {
            if (doc) {
                res.status(500).json({
                    error: true,
                    message: `Entry for date ${date} exists`
                })
            }
            else {
                let entry = new Entry({
                    _id: new mongoose.Types.ObjectId(),
                    username: username,
                    content: content,
                    date: date,
                    image: image,
                    title: title,
                    color: color
                })
                entry
                    .save()
                    .then(function(result) {
                        getTip(content).then(function(tipData) {
                            let json = {
                                entry: result
                            };
                            if (tipData) {
                                json.tipData = tipData;
                            }
                            res.status(201).json(json);
                        })
                        .catch(function(err) {
                            console.log(err);
                            res.status(201).json({
                                entry: result
                            });
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
        });
};

exports.addEntryToForum = function(req, res, next) {
    let tokenData = req.tokenData;
    let username = tokenData.username;
    let entryId = req.body.id;
    let forum = req.body.forum;

    if (!entryId || !forum) {
        return res.status(500).json({
            error: true,
            message: 'Missing required fields'
        });
    }

    Entry.findOne({ _id: entryId, username: username })
        .exec()
        .then(function(entry) {
            if (!entry) {
                res.status(404).json({
                    error: true,
                    message: 'Could not find entry'
                });
            }
            else {
                if (entry.forum) {
                    res.status(500).json({
                        error: true,
                        message: `Entry already belongs to forum ${entry.forum}`
                    });
                }
                else {
                    Forum.findOne({ subject: forum })
                        .exec()
                        .then(function(doc) {
                            if (!doc) {
                                res.status(500).json({
                                    error: true,
                                    message: `Forum ${forum} does not exist`
                                })
                            }
                            else {
                                entry.update({ forum: forum })
                                    .exec()
                                    .then(function(result) {
                                        res.status(200).json({
                                            entry: result
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
                }
            }
        })
        .catch(function(err) {
            res.status(500).json({
                error: true,
                message: err.message
            })
        })
};

exports.deleteEntry = function(req, res, next) {
    let tokenData = req.tokenData;
    let username = tokenData.username;
    let entryId = req.body.id;

    if (!entryId) {
        return res.status(500).json({
            error: true,
            message: 'Missing required fields'
        });
    }
    Entry.findOneAndDelete({ _id: entryId, username: username})
        .exec()
        .then(function(doc) {
            if (doc) {
                res.status(200).json({
                    entry: doc
                });
            }
            else {
                res.status(500).json({
                    error: true,
                    message: "Entry not found"
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