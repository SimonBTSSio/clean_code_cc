module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");
    const User = require("./user")(connection);

    class Card extends Model {}
  
    Card.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
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
        tag: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize: connection,
        tableName: 'cards',
      }
    );

    Card.belongsTo(User);
    User.hasMany(Card);
  
    return Card;
  };
  
