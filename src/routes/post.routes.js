const express=require("express");
const postRouter=express.Router();
const {seats,seatpricing,bookings}=require("../../models/index")

postRouter.post("/booking", async (req, res) => {
    try {
      // Destructuring data from req.body which is coming from the client
      // As per my knowledge, MySQL can't store arrays in a table
      // Since we are receiving data in JSON format for the array of seatids, we are parsing it
      let { Seats, name, mobile, amount, email } = req.body;
      Seats = JSON.parse(Seats);
      amount = JSON.parse(amount);
  
      // Checking whether any empty details are there or not
      if (Seats.length === 0 || name === "" || mobile === "") {
        return res.status(400).json({ error: "Please select all details." });
      }
  
      // Getting the details of seats in an array
      let data = await seats.findAll({ where: { id: [...Seats] } });
      let bookedSeats = [];
  
      // Checking whether any seats are already booked or not, if booked, adding them to the bookedSeats array
      for (let i = 0; i < data.length; i++) {
        if (data[i].is_booked === true) {
          bookedSeats.push(data[i].id);
        }
      }
  
      // Checking if any seats are already booked, if so, sending an appropriate error response
      if (bookedSeats.length > 0) {
        return res.status(400).json({
          error: `${bookedSeats} Seats are already booked. Please select another.`,
        });
      }
  
      // Updating the seats table to mark the selected seats as booked
      await seats.update({ is_booked: true }, { where: { id: [...Seats] } });
  
      // Calculating the total amount by using array.reduce()
      const sum = amount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
  
      // Creating a new booking entry in the bookings table
      let createdBooking = await bookings.create({
        seatid: JSON.stringify(Seats), // Storing the seatid as a JSON string in the bookings table
        name,
        mobile,
        Amount: sum,
        email,
      });
  
      // Sending the created booking as a JSON response
      res.json(createdBooking);
    } catch (error) {
      // Handling any errors that occur and sending an appropriate error response
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports={postRouter}