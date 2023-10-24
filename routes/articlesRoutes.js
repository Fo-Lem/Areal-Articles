import { Router } from 'express'

import { ArticlesController } from '../controllers/articlesController'

// 1. Реализовать CRUD для статьи (для body: content-type = application/json)
//         - C - POST /article/
//         - R - GET /article/#ID#/, GET /articles/
//         - U - PATCH /article/#ID#/
//         - D - DELETE /article/#ID#/

Router.get('/articles/', ArticlesController.getArticles)
Router.get('/article/:id/', ArticlesController.getArticles)
Router.post('/article/', ArticlesController.createArticle)
Router.patch('/article/:id/', ArticlesController.updateArticle)
Router.delete('/article/:id/', ArticlesController.deleteArticle)

module.exports = Router
