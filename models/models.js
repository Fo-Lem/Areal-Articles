import { DataTypes } from 'sequelize'
import { bd } from '../bd.js'

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

const Articles = bd.define('articles', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.TEXT, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
})
const Comments = bd.define('comments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  body: { type: DataTypes.TEXT, allowNull: false },
  articleId: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
})

Articles.hasMany(Comments)
Comments.belongsTo(Articles)

export {
  Articles,
  Comments,
}
