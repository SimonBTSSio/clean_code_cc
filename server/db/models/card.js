module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");
    const User = require("./user")(connection);
    const Tag = require("./tag")(connection);

    class Card extends Model {}
  
    Card.init(
      {
          id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
          },
        question: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        category: {
          type: DataTypes.ENUM,
          values: ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'DONE'],
          defaultValue: 'FIRST',
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'users',
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
        tableName: 'cards',
      }
    );

    Card.belongsTo(User);
    User.hasMany(Card);

    Card.belongsTo(Tag);
    Tag.hasMany(Card);
  
    return Card;
  };
  
