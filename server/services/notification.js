const {Notification} = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function NotificationService() {
  return {
    findAll: async function (filters, options) {
      let dbOptions = {
        where: filters,
      };
      if (options.order) {
        dbOptions.order = Object.entries(options.order);
      }
      if (options.limit) {
        dbOptions.limit = options.limit;
        dbOptions.offset = options.offset;
      }
      return Notification.findAll(dbOptions);
    },
    findOne: async function (filters) {
      return Notification.findOne({ where: filters });
    },
    create: async function (data) {
      try {
        return await Notification.create(data);
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    replace: async function (filters, newData) {
      try {
        const nbDeleted = await this.delete(filters);
        const notification = await this.create(newData);
        return [[notification, nbDeleted === 0]];
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    update: async (filters, newData) => {
      try {
        const [nbUpdated, notifications] = await Notification.update(newData, {
          where: filters,
          returning: true,
          individualHooks: true,
        });

        return notifications;
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    delete: async (filters) => {
      return Notification.destroy({ where: filters });
    }
  }
};
