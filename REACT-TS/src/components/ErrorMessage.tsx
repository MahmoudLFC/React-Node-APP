import React from "react";
import PropTypes from "prop-types";

// @ts-ignore
const ErrorMessage = ({ message }) => {
    return (
        <p className='text-danger fw-light mt-2 mb-2' style={{ fontSize: "12px" }}>
            <i className='bx bxs-error px-1'></i>
            {message}
        </p>
    );
};

ErrorMessage.propTypes = {
    message: PropTypes.string,
};

export default ErrorMessage;
