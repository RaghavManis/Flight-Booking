const {Enums} = require("../utills/common") ;
const {BOOKED , INITIATED , PENDING , CANCELLED} = Enums.BOONIKG_STATUS ;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init({
    flightId:{
      type : DataTypes.INTEGER ,
      allowNull: false ,
    } ,
    userId:{
      type : DataTypes.INTEGER ,
      allowNull : false ,
    },
    status:{
      type : DataTypes.ENUM ,
      values : [BOOKED , INITIATED , PENDING , CANCELLED] ,
      defaultValue : INITIATED ,
      allowNull : false ,
    } ,
    noOfSeats:{
      type:DataTypes.INTEGER ,
      allowNull : false ,
      defaultValue: 1 ,
    } ,
    totalCost:{
      type:DataTypes.INTEGER ,
      allowNull:false ,
    } ,
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};