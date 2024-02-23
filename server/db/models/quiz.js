module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");    
    const User = require("./user")(connection);
    
    class Quiz extends Model {}

    Quiz.init(
        {
            id: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            date: {
              type: DataTypes.DATE,
              allowNull: false
            },
            completed: {
              type: DataTypes.BOOLEAN,
              allowNull: true
            }
        }, 
        { 
            sequelize: connection, 
            modelName: 'quiz' 
        }
    );
    Quiz.belongsTo(User);
  
    return Quiz;
};
