module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");  
  const Tag = require('./tag')(connection, DataTypes);
  const Card = require('./card')(connection, DataTypes);

  class CardTag extends Model {}

  CardTag.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      cardId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'cards',
          key: 'id',
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tags',
          key: 'id',
        },
      },
    },
    {
      sequelize: connection,
      tableName: 'card_tags',
    }
  );

  CardTag.belongsTo(Card, { foreignKey: 'cardId' });
  CardTag.belongsTo(Tag, { foreignKey: 'tagId' });

  return CardTag;
};
