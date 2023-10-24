import { Articles } from '../models/models.js'

class ArticlesController {
  static async createArticle(req, res) {
    const result = await Articles.create({
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
      const result = await Articles.findOne({
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
      const result = await Articles.findAndCountAll()
        .then((result) => {
          return result
        }).catch((err) => {
          return err
        })
      return res.json(result)
    }
  }

  static async updateArticle(req, res) {
    const result = await Articles.update(
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

  static async deleteArticle(req, res) {
    const result = await Articles.destroy({
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
