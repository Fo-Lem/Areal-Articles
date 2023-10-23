import { Op } from 'sequelize'
import { Model } from '../models/models'

//     1. Реализовать CRUD для комментария (для body: content-type = application/json)
//         - C - POST /article/#ID#/comment/
//         - R - GET /article/#ID#/comment/#COMMENT_ID#/, GET /article/#ID#/comments/
//         - U - PATCH /article/#ID#/comment/#COMMENT_ID#/
//         - D - DELETE /article/#ID#/comment/#COMMENT_ID#/

//     1. Реализовать метод получения комментариев за период с группировкой по статьям в которых они были оставлены

//        GET /analytic/comments/?dateFrom=#timestamp#&dateTo=#timestamp#

class CommentsController {
  static async createComment(req, res) {
    const result = await Model.Comment.create({
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
    const { dateFrom, dateTo } = req.params

    const result = await Model.Comment.findAll({
      where: {
        createdAt: {
          [Op.between]: [dateFrom, dateTo],
        },
      },
      include: [
        {
          model: Model.Article,
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
      const result = await Model.Comment.findOne({
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
      const result = await Model.Comment.findAndCountAll({
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
    const result = await Model.Comment.update(
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
    const result = await Model.Comment.destroy({
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
