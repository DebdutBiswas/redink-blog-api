// router.get('/', postsController.getAllPosts);
// router.post('/', postsController.addNewPost);
// router.get('/:authorid', postsController.getPostsByAuthorId);
// router.put('/:id', postsController.updatePostById);
// router.delete('/:id', postsController.deletePostById);

const { Op } = require('sequelize');
const db = require('../configs/database');
const { checkDateFormat, getISOTimeStamp, getISODate } = require('../utils/timelib');
const { sendNotifyMail } = require('../utils/notifylib');
const initModels = require('../models/initModels');

const { postsModel, usersModel } = initModels(db);

exports.getAllPosts = async (req, res) => {
    await postsModel.findAll({order: [['creation_date', 'DESC']]})
    .then(posts => {
        if (posts === null || posts.length === 0) {
            res.status(500).send({
                message: 'No posts exist!'
            });
        } else {
            res.send({'data': posts});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of posts!'
        });
    });
};

exports.addNewPost = async (req, res) => {
    const currentTimestamp = getISOTimeStamp();

    const {
        author_id,
        title,
        description,
        creation_date,
        last_updated
    } = {
        author_id: req.body?.author_id ?? req.body.author_id ? req.body.author_id : '',
        title: req.body?.title ?? req.body.title ? req.body.title?.trim?.() : '',
        description: req.body?.description ?? req.body.description ? req.body.description?.trim?.() : '',
        creation_date: checkDateFormat(req.body?.creation_date?.trim?.() ?? '') ? getISODate(req.body.creation_date.trim?.()) : currentTimestamp,
        last_updated: checkDateFormat(req.body?.creation_date?.trim?.() ?? '') ? getISODate(req.body.creation_date.trim?.()) : currentTimestamp,
    };

    if (!author_id || !title) {
        return res.status(400).send({
            message: 'Please upload valid JSON format!'
        });
    }

    await postsModel.create({
        author_id,
        title,
        description,
        creation_date,
        last_updated
    }, { fields: ['author_id', 'title', 'description', 'creation_date', 'last_updated'] })
    .then(async queryResult => {
        await postsModel.findOne({where: {id: queryResult.id}})
        .then(async post => {
            if (post !== null) {
                await usersModel.findAll({where: {id: {[Op.ne]: post.dataValues.author_id}, role: 3}, attributes: ['id', 'name', 'email'], order: [['id', 'ASC']]})
                .then(async users => {
                    if (users === null || users.length === 0) {
                        res.send({
                            data: {...post.dataValues},
                            message: 'Mail not sent to others, only the author of the added post exist!'
                        });
                    } else {
                        res.send({'data': post});

                        for (const currentUser of users) {
                            const mailParams = {
                                receipent: currentUser.dataValues.email,
                                subject: `${post.dataValues.title} - Post Added`,
                                bodyTxt: `Checkout new post!\nPost Link: https://blog.redink.app/blogs/${post.dataValues.id}`,
                                bodyHtml: `<b>Checkout new post!</b>\n<a href="https://blog.redink.app/blogs/${post.dataValues.id}">${post.dataValues.title}<a>`
                            };

                            const currentNotifyResult = await sendNotifyMail(mailParams);
                        }
                    }
                })
                .catch(err => {
                    res.send({
                        data: {...post.dataValues},
                        message: err.message || 'Something went wrong while getting details of other authors!'
                    });
                });
            }
            else {
                res.status(500).send({
                    message: 'The post does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the newly created post!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while creating new post!'
        });
    });
};

exports.getPostsByAuthorId = async (req, res) => {
    await postsModel.findAll({where: {author_id: req.params.authorid}, attributes: {exclude: ['author_id']}, order: [['creation_date', 'DESC']]})
    .then(posts => {
        if (posts === null || posts.length === 0) {
            res.status(500).send({
                message: 'No posts exist!'
            });
        } else {
            res.send({'data': posts});
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting list of posts!'
        });
    });
};

exports.updatePostById = async (req, res) => {
    const {
        title,
        description,
        last_updated
    } = {
        title: req.body?.title ?? req.body.title ? req.body.title?.trim?.() : '',
        description: req.body?.description ?? req.body.description ? req.body.description?.trim?.() : '',
        last_updated: getISOTimeStamp()
    };

    if (!title || !description) {
        return res.status(400).send({
            message: 'Please upload valid JSON format!'
        });
    }

    await postsModel.update({
        title,
        description,
        last_updated
    }, {where: {id: req.params.id}}, { fields: ['title', 'description', 'last_updated'] })
    .then(async queryResult => {
        [ updateResult ] = queryResult;
        await postsModel.findOne({where: {id: req.params.id}})
        .then(async post => {
            if (post !== null) {
                await usersModel.findAll({where: {id: {[Op.ne]: post.dataValues.author_id}, role: 3}, attributes: ['id', 'name', 'email'], order: [['id', 'ASC']]})
                .then(async users => {
                    if (users === null || users.length === 0) {
                        res.send({
                            data: {...post.dataValues, 'updated': updateResult},
                            message: 'Mail not sent to others, only the author of the updated post exist!'
                        });
                    } else {
                        res.send({'data': {...post.dataValues, 'updated': updateResult}});

                        for (const currentUser of users) {
                            const mailParams = {
                                receipent: currentUser.dataValues.email,
                                subject: `${post.dataValues.title} - Post Updated`,
                                bodyTxt: `Checkout updated post!\nPost Link: https://blog.redink.app/blogs/${post.dataValues.id}`,
                                bodyHtml: `<b>Checkout updated post!</b>\n<a href="https://blog.redink.app/blogs/${post.dataValues.id}">${post.dataValues.title}<a>`
                            };

                            const currentNotifyResult = await sendNotifyMail(mailParams);
                        }
                    }
                })
                .catch(err => {
                    res.send({
                        data: {...post.dataValues, 'updated': updateResult},
                        message: err.message || 'Something went wrong while getting details of other authors!'
                    });
                });
            } else {
                res.status(500).send({
                    message: 'The post does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while getting the updated post!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while updating the post!'
        });
    });
};

exports.deletePostById = async (req, res) => {
    await postsModel.findOne({where: {id: req.params.id}})
    .then(async post => {
        await postsModel.destroy({where: {id: req.params.id}})
        .then(async queryResult => {
            if (queryResult) res.send({'data': {...post.dataValues, 'deleted': queryResult}});
            else {
                res.status(500).send({
                    message: 'The post does not exist!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Something went wrong while deleting the post!'
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong while getting the post to be deleted!'
        });
    });
};