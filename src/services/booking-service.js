const axios = require ('axios');
const { StatusCodes } = require('http-status-codes');

const { BookingRepository } = require('../repositories');
const db = require('../models');
const { ServerConfig } = require('../config');
const AppError = require('../utils/errors/app-error');
const { error } = require('../utils/common/error-response');

async function createBooking(data) {
    return new Promise((resolve, reject) => {
       
            const result = db.sequelize.transaction(async function bookingImplementation(t) {
            //console.log(`localhost:/3000/api/v1/flights/${data.flightId}`);
            const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
            console.log(flight.data);
            const flightData = flight.data.data;
            if(data.noOfSeats > flightData.totalSeats) {
                reject(new AppError('Enough seats not available',StatusCodes.BAD_REQUEST));
            }
            resolve(true);
            });
    });
     
}

//  async function createBooking(data) {
//               try{
//                 const result = db.sequelize.transaction(async function bookingImplementation(t) {
//                     //console.log(`localhost:/3000/api/v1/flights/${data.flightId}`);
//                     const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
//                     //console.log(flight.data);
//                     const flightData = flight.data.data;
//                     console.log("galti",error);
//                     if(data.noOfSeats > flightData.totalSeats) {
//                         throw new AppError('Enough seats not available',StatusCodes.BAD_REQUEST);
//                     }
//                     console.log("galti",error);
//                     return true;
//                     });
//                     // console.log('The result is :: ', result);
//                     // return result;
//               }
//               catch(error) {
//                 //console.log(error);
//                 throw error;
//               }
//             }
        
    
         
//     }

    // async function createBooking(data) {
    //     try{
    //       const result = db.sequelize.transaction(async function bookingImplementation(t) {
    //           //console.log(`localhost:/3000/api/v1/flights/${data.flightId}`);
    //           try{
    //             const flight = await axios.get(`${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`);
    //             //console.log(flight.data);
    //             const flightData = flight.data.data;
    //             if(data.noOfSeats > flightData.totalSeats) {
    //                 throw new AppError('Enough seats not available',StatusCodes.BAD_REQUEST);
    //             }
    //             return true;
    //         }
    //           catch(error) {
    //             //console.log(error);
    //             throw error;
    //           }
    //     });
    // }
    //     catch(error) {
    //       //console.log(error);
    //       throw error;
    //     }
    // }
  




module.exports = {
    createBooking
}