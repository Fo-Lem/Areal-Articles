import { articlesRouter } from 'express'

import { ArticlesController } from '../controllers/articlesController'

// 1. Реализовать CRUD для статьи (для body: content-type = application/json)
//         - C - POST /article/
//         - R - GET /article/#ID#/, GET /articles/
//         - U - PATCH /article/#ID#/
//         - D - DELETE /article/#ID#/

articlesRouter.get('articles/', ArticlesController.getArticles)
articlesRouter.get('article/:id/', ArticlesController.getArticles)
articlesRouter.post('article/', ArticlesController.createArticle)
articlesRouter.patch('article/:id/', ArticlesController.updateArticle)
articlesRouter.delete('article/:id/', ArticlesController.deleteArticle)

export { articlesRouter }
