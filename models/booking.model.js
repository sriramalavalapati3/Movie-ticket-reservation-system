module.exports = (sequelize, DataTypes) => {
    const bookings = sequelize.define("bookings", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      seatid: {
        type: DataTypes.STRING,
      },
      email:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      Amount: {
        type: DataTypes.DECIMAL(10, 3),
      },
    }, {
      timestamps: false,
    });
  
    return bookings;
  };
  