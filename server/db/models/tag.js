module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");

  class Tag extends Model {}

  Tag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize: connection,
      tableName: "tags"
    }
  );

  return Tag;
};
  
