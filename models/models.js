const { DataTypes } = require('sequelize')
const sequelize = require('../db')

// Статьи:
//        - ID
//        - Название
//        - Текст статьи
//        - Дата создания
//        - Дата модификации

//        Комментарии:
//        - ID
//        - Текст комментария
//        - ID Статьи
//        - Дата создания
//        - Дата модификации

const Articles = sequelize.define('articles', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
})
const Comments = sequelize.define('comments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  body: { type: DataTypes.STRING, allowNull: false },
  articleId: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
})

Articles.hasMany(Comments)
Comments.belongsTo(Articles)

module.exports = {
  Articles,
  Comments,
}
