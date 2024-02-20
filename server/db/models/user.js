module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  const bcrypt = require("bcryptjs");

  class User extends Model {
    isPasswordValid(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING(320),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          len: [1, 320],
        },
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: {
          len: [8, 256],
        },
      },
    },
    {
      sequelize: connection,
      tableName: "users",
    }
  );

  function updatePassword(user) {
    if (user.password) {
      return bcrypt.genSalt(10).then((salt) =>
        bcrypt.hash(user.password, salt).then((hash) => {
          user.password = hash;
        })
      );
    }
  }

  User.addHook("beforeCreate", updatePassword);
  User.addHook("beforeUpdate", (user, options) => {
    if (options.fields.includes("password")) {
      return updatePassword(user);
    }
  });

  return User;
};
