import { Op } from 'sequelize'
import { Articles, Comments } from '../models/models.js'

class CommentsController {
  static async createComment(req, res) {
    const result = await Comments.create({
      articleId: req.params.articleId,
      body: req.body.body,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,

    },
    {
      where: {
        id: req.params.articleId,
      },
    }).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
    return res.json(result)
  }

  static async getCommentsByPeriod(req, res) {
    const { dateFrom, dateTo } = req.query

    const result = await Comments.findAll({
      where: {
        createdAt: {
          [Op.between]: [dateFrom, dateTo],
        },
      },
      include: [
        {
          model: Articles,
          as: 'article',
          attributes: ['id', 'title'],
        },
      ],
      group: ['article.id', 'article.title'],
    }).then((result) => {
      return result
    }).catch((err) => {
      return err
    })

    return res.json(result)
  }

  static async getComments(req, res) {
    if (req.params.commentId) {
      const result = await Comments.findOne({
        where: {
          articleId: req.params.articleId,
          commentId: req.params.commentId,
        },
      }).then((result) => {
        return result
      }).catch((err) => {
        return err
      })
      return res.json(result)
    }
    else {
      const result = await Comments.findAndCountAll({
        where: {
          articleId: req.params.articleId,
        },
      }).then((result) => {
        return result
      }).catch((err) => {
        return err
      })
      return res.json(result)
    }
  }

  static async updateComment(req, res) {
    const result = await Comments.update(
      {
        body: req.body.body,
        updatedAt: req.body.updatedAt,
      },
      {
        where: {
          articleId: req.params.articleId,
          commentId: req.params.commentId,
        },
      },
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
    return res.json(result)
  }

  static async deleteComment(res, req) {
    const result = await Comments.destroy({
      where: {
        articleId: req.params.articleId,
        commentId: req.params.commentId,
      },
    }).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
    return res.json(result)
  }
}

export { CommentsController }
