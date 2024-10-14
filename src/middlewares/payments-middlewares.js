const { ErrorResponse } = require('../utils/common');
// const { message } = require('../utils/common/error-response');

const { StatusCodes } = require("http-status-codes")

const AppError = require('../utils/errors/app-error');


function validateMakePaymentsRequest(req, res, next) {
    console.log(req.body);
    //console.log(req.params.id);
 
    if(!req.body.userId) {
        ErrorResponse.message = 'Something went wrong while making payment';
        ErrorResponse.error = new AppError(['userId for payment not found in request '], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.bookingId) {
        ErrorResponse.message = 'Something went wrong while making payment';
        ErrorResponse.error = new AppError(['bookingId for payment of booking not found in request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    if(!req.body.totalCost) {
        ErrorResponse.message = 'Something went wrong while making payment';
        ErrorResponse.error = new AppError(['totalCost for payment of not found in request'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)    
                .json(ErrorResponse);               
    }

    next();

}

module.exports = {
    validateMakePaymentsRequest
}