module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define(
    "State",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "states",
      timestamps: false,
      paranoid: true,
      underscored: true,
    }
  );

  return State;
};
