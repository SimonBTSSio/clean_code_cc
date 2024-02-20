module.exports = (connection) => {
      const { DataTypes, Model } = require("sequelize");
    const User = require("./user")(connection);
    
    class Notification extends Model {}

    Notification.init(
        {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            time: {
              type: DataTypes.TIME,
              allowNull: false
            },
            message: {
              type: DataTypes.STRING,
              allowNull: true
            }
        }, 
        { 
            sequelize: connection, 
            modelName: 'notification' 
        }
    );
    Notification.belongsTo(User);
  
    return Notification;
};
