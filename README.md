# Тестовое задание: Статьи

## Комментарий

Комититься нужно как можно чаще, при проверке будет учитываться содержательность сообщений коммита и порции которыми коммиты осуществляются,
время по задаче будет оцениваться как время между первым(инициализационным коммитом и последним)

## Подготовительные работы
1. Создать новый репозиторий на GitHub (ссылку на него будет необходимо отправить после выполнения задания)

## Backend приложение

### Этапы выполнения задания:

2. Проинициализировать новое nodejs приложение и установить пакеты express, sequelize, остальное по желанию

    1. Описать с помощью библиотеки sequelize модели, миграции и сиды для 2 сущностей, в качестве бд использовать PostgreSQL:
       Статьи:
       - ID
       - Название
       - Текст статьи
       - Дата создания
       - Дата модификации

       Комментарии:
       - ID
       - Текст комментария
       - ID Статьи
       - Дата создания
       - Дата модификации

    2. Реализовать CRUD для статьи (для body: content-type = application/json)
        - C - POST /article/
        - R - GET /article/#ID#/, GET /articles/
        - U - PATCH /article/#ID#/
        - D - DELETE /article/#ID#/

    3. Реализовать CRUD для комментария (для body: content-type = application/json)
        - C - POST /article/#ID#/comment/
        - R - GET /article/#ID#/comment/#COMMENT_ID#/, GET /article/#ID#/comments/
        - U - PATCH /article/#ID#/comment/#COMMENT_ID#/
        - D - DELETE /article/#ID#/comment/#COMMENT_ID#/

    4. Реализовать метод получения комментариев за период с группировкой по статьям в которых они были оставлены

       GET /analytic/comments/?dateFrom=#timestamp#&dateTo=#timestamp#

    
