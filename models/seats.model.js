module.exports = (sequelize, DataTypes) => {
    const seats = sequelize.define("seats", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      seat_identifier: {
        type: DataTypes.STRING,
      },
      seat_class: {
        type: DataTypes.CHAR,
        
      },

      is_booked:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }
      
    },{
      timestamps: false,
    });
  
    seats.associate = (models) => {
      seats.belongsTo(models.seatpricings, { foreignKey: 'seat_class', targetKey: 'seat_class' });
    };
    return seats;
  };
  