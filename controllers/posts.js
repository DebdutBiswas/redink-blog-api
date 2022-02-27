// router.get('/', postsController.getAllPosts);
// router.post('/', postsController.addNewPost);
// router.get('/:authorid', postsController.getPostsByAuthorId);
// router.put('/:id', postsController.updatePostById);
// router.delete('/:id', postsController.deletePostById);

const { Op } = require('sequelize');
const db = require('../configs/database');
const { checkDateFormat, getISOTimeStamp, getISODate } = require('../utils/timelib');
const initModels = require('../models/initModels');

const { postsModel } = initModels(db);

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
        creation_date: checkDateFormat(req.body?.creation_date?.trim?.() ?? '') ? getISODate(req.body.creation_date.trim?.()) : getISOTimeStamp(),
        last_updated: creation_date
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
        .then(post => {
            if (post !== null) res.send({'data': post});
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
    await postsModel.findAll({where: {author_id: req.params.authorid}, order: [['creation_date', 'DESC']]})
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
        .then(post => {
            if (post !== null) res.send({'data': {...post.dataValues, 'updated': updateResult}});
            else {
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