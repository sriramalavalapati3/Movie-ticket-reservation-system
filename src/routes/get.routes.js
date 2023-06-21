const express=require("express");
const getRouter=express.Router();
const { Op } = require('sequelize')

//importing models 
const {seats,seatpricing,bookings}=require("../../models/index")

// get route to retrive all seats data

getRouter.get("/SEATS",async(req,res)=>{
    try {
        // getting data from database by selecting what are my requirements.

        let data=await seats.findAll({ attributes: ['id', 'seat_identifier', 'seat_class', 'is_booked']});
        
       // sending response data
       
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})






// get route to get the details of seat as per id and get price of seat as per booking conditions

getRouter.get("/SEATS/:id",async(req,res)=>{

//catching id

let id=req.params.id;
try {
    // finding the seat details as per id
    const data=await seats.findByPk(id,{include:["seatpricing"]});
    const {seat_identifier,seat_class,seatpricing,is_booked}=data;

    // counting the total seats and booked seats to get percentage
    const totalseats=await seats.count({where:{seat_class}});
    const bookedseats=await seats.count({where:{seat_class,is_booked:true}});
    const bookingpercentage=Math.floor(bookedseats/totalseats)*100;
    let ticketprice;

    // using if condition we can get seat price as per bookings percentage

    if(bookingpercentage<40)
    {
       ticketprice= seatpricing.min_price||seatpricing.normal_price
    }else if(bookingpercentage>=40&&bookingpercentage<=60)
    {
       ticketprice=seatpricing.normal_price||seatpricing.max_price
    }else if(bookingpercentage>60)
    {
        ticketprice=seatpricing.max_price||seatpricing.normal_price
    }
    // sending details of seat
   res.send({seat_identifier,seat_class,is_booked,ticketprice})


} catch (error) {
    res.send(error.message)
}
})

// getroute to get details of person who done booking till now, using email or mobile number using query .
//op.or imported from sequelize which can used for either any of option.
getRouter.get("/bookings",async(req,res)=>{
    try {
        //catching mobile or email from query 
        const userIdentifier=req.query.userIdentifier;

        //finding the data of person by his email or mobile number
        let Bookings=await bookings.findAll({
            where: {
                [Op.or]: [
                    { email: userIdentifier },
                    { mobile: userIdentifier },
                  ]
            },
          });
          // sending booking as response
          res.send(Bookings)
    } catch (error) {
        //sending the error resposnse 
        res.send(error.message)
    }
})


module.exports={getRouter}