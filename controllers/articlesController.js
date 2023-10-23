import { Model } from '../models/models'

// 1. Реализовать CRUD для статьи (для body: content-type = application/json)
//         - C - POST /article/
//         - R - GET /article/#ID#/, GET /articles/
//         - U - PATCH /article/#ID#/
//         - D - DELETE /article/#ID#/

class ArticlesController {
  static async createArticle(req, res) {
    const result = await Model.Article.create({
      title: req.body.title,
      body: req.body.body,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    }).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
    return res.json(result)
  }

  static async getArticles(req, res) {
    if (req.body.id) {
      const result = await Model.Article.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => {
        return result
      }).catch((err) => {
        return err
      })
      return res.json(result)
    }
    else {
      const result = await Model.Article.findAndCountAll()
        .then((result) => {
          return result
        }).catch((err) => {
          return err
        })
      return res.json(result)
    }
  }

  static async updateArticle(req, res) {
    const result = await Model.Article.update(
      {
        title: req.body.title,
        body: req.body.body,
        updatedAt: req.body.updatedAt,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
    return res.json(result)
  }

  static async deleteComment(req, res) {
    const result = await Model.Article.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
    return res.json(result)
  }
}
export { ArticlesController }
