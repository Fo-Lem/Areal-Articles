import { Router } from 'express'

import { CommentsController } from '../controllers/commentsController'

//     1. Реализовать CRUD для комментария (для body: content-type = application/json)
//         - C - POST /article/#ID#/comment/
//         - R - GET /article/#ID#/comment/#COMMENT_ID#/, GET /article/#ID#/comments/
//         - U - PATCH /article/#ID#/comment/#COMMENT_ID#/
//         - D - DELETE /article/#ID#/comment/#COMMENT_ID#/

//     1. Реализовать метод получения комментариев за период с группировкой по статьям в которых они были оставлены

//        GET /analytic/comments/?dateFrom=#timestamp#&dateTo=#timestamp#

Router.get('/article/:id/comment/:commentId/', CommentsController.getComments)
Router.get('/article/:id/comments/', CommentsController.getComments)
Router.get('/analytic/comments/?dateFrom&dateTo', CommentsController.getCommentsByPeriod)
Router.post('/article/:id/comment/', CommentsController.createComment)
Router.patch('/article/:id/comment/:commentId/', CommentsController.updateComment)
Router.delete('/article/:id/comment/:commentId/', CommentsController.deleteComment)

module.exports = Router
