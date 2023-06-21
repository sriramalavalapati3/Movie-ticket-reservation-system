module.exports = (sequelize, DataTypes) => {
    const seatpricing = sequelize.define("seatpricings", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      seat_class: {
        type: DataTypes.STRING,
        unique: true
      },
      min_price
: {
        type: DataTypes.STRING,
      },
      normal_price
: {
        type: DataTypes.STRING,
      },
      max_price
: {
        type: DataTypes.STRING,
      },
    },{
      timestamps: false,
    });
    seatpricing.associate = (models) => {
      seatpricing.hasMany(models.seats, { foreignKey: 'seat_class', sourceKey: 'seat_class' });
    };
    return seatpricing;
  };
  