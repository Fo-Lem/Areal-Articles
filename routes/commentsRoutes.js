import { commentsRouter } from 'express'

import { CommentsController } from '../controllers/commentsController'

//     1. Реализовать CRUD для комментария (для body: content-type = application/json)
//         - C - POST /article/#ID#/comment/
//         - R - GET /article/#ID#/comment/#COMMENT_ID#/, GET /article/#ID#/comments/
//         - U - PATCH /article/#ID#/comment/#COMMENT_ID#/
//         - D - DELETE /article/#ID#/comment/#COMMENT_ID#/

//     1. Реализовать метод получения комментариев за период с группировкой по статьям в которых они были оставлены

//        GET /analytic/comments/?dateFrom=#timestamp#&dateTo=#timestamp#

commentsRouter.get('article/:id/comment/:commentId/', CommentsController.getComments)
commentsRouter.get('article/:id/comments/', CommentsController.getComments)
commentsRouter.get('analytic/comments/?dateFrom&dateTo', CommentsController.getCommentsByPeriod)
commentsRouter.post('article/:id/comment/', CommentsController.createComment)
commentsRouter.patch('article/:id/comment/:commentId/', CommentsController.updateComment)
commentsRouter.delete('article/:id/comment/:commentId/', CommentsController.deleteComment)

export { commentsRouter }
