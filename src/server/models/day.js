'use strict';

module.exports = (sequelize, DataTypes) => {
  var Day = sequelize.define('Day', {
    username: DataTypes.STRING
  });

  Day.associate = function(models) {
    models.Day.hasMany(models.Task);
  };

  return Day;
};
