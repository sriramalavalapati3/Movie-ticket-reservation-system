const express=require("express");
const postRouter=express.Router();
const {seats,seatpricing,bookings}=require("../../models/index")

postRouter.post("/booking",async(req,res)=>{
    try {
        // destructuring data from req.body which is coming from client;
        //As per my knowledge mysql cant store arrays in table 
        //as we know we getting data in json format for array of seatids for that iam parsing it

        let {Seats,name,mobile,amount,email}=req.body;
         Seats=JSON.parse(Seats);
         amount=JSON.parse(amount);
         //checking weather any empty details are there  or not. 

         if(Seats.length==0||name==""||mobile=="")
         {
            res.send("please select all details")
         }
      
         // getting the details of seats in an array

        let data=await seats.findAll({where:{id:[...Seats]}})
        let bookedseats=[]

        //checking wheather any seats are booked or not ,if booked we are sending response

        for(let i=0;i<data.length;i++)
        {
            if(data[i].is_booked==true)
            {
                bookedseats.push(data[i].id)
            }
        }

        // By putting condition wheather empty or not we are sending the response 

        if(bookedseats.length>0)
        {
            res.send(`${bookedseats} these seats are booked already please select another`)
        }
        
        // updating the seats table 

        let booking= await seats.update({is_booked:true},{where:{id:[...Seats]}})

        //Iam taking amount in the array as per the user selection which is coming from client 
        //amount is calculated by using array.reduce()

        const sum = amount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
        //updated the bookings table

        let Data=await bookings.create({
           seatid:`${Seats}`,name,mobile,Amount:sum,email
        })

        // send the resposnse 
        res.json(Data)

    } catch (error) {
        res.send(error.message)
    }
})

module.exports={postRouter}