/**
 * This module contains the implementation of the error types used in the HTTP
 * environment, such as ActionHandlerNotFoundError, etc.
 *
 * @module caligula.errors.http
 */
Condotti.add('caligula.errors.http', function (C) {
    /**
     * ERROR CODE TABLE
     *
     * - BAD REQUEST = 400
     *   - BadRequestError = 40000
     *   - InvalidArgumentError = 40001
     *   - 
     * - INTERNAL SERVER ERROR = 500
     *   - InternalServerError = 50000
     *   - 
     *
     * - NOT FOUND = 404
     *   - NotFoundError = 40400
     *   - ActionHandlerNotFoundError = 40401
     *   - ActionHandlerNotCallableError = 40402
     *   - GroupNotFoundError = 40403
     *   - FileNotFoundError = 40404
     *   - PackageNotFoundError = 40405
     *   - JobNotFoundError = 40406
     *   - JobDataNotFoundError = 40407
     *   - LoadBalancerIspNotFoundError = 40408
     *   - LoadBalancerPropertyNotFoundError = 40409
     *
     * - CONFLICT = 409
     *   - ConflictError = 40900
     *   - OperationConflictError = 40901
     *   - GroupAlreadyExistError = 40902
     *   - FileAlreadyExistError = 40903
     *   - PackageAlreadyExistError = 40904
     *   - JobAlreadyExecutedError = 40905
     *   - JobNotCancelledError = 40906
     *
     * - GONE = 410
     *   - GoneError = 41000
     *   - GroupGoneError = 41001
     *
     * - REQUESTED RANGE NOT SATISFIABLE = 416
     *   - RequestedRangeNotSatisfiableError = 41600
     *   - ResourceNotEnoughError = 41601
     *
     * - NOT IMPLEMENTED = 501
     *   - NotImplementedError = 50100
     *   -
     *
     * - PRECONDITION FAILED = 412
     *   - PreconditionFailedError = 41200
     *   - UploadedFileCorruptedError = 41201
     *
     * - REQUEST TIMEOUT = 408
     *   - RequestTimeoutError = 40800
     *
     * - UNSUPPORTED MEDIA TYPE = 415
     *   - UnsupportedTypeError = 41500
     *   - UnsupportedCommandTypeError = 41501
     *   - UnsupportedStrategyTypeError = 41502
     */
    
    /**
     * This HttpError class is the abstract base class of all HTTP errors
     * the HTTP API server may thrown. Normally it contains the HTTP status
     * code for the HTTP response, and the error code and message to construct
     * the response payload.
     *
     * @class HttpError
     * @constructor
     * @param {Number} status the status code of the HTTP response
     * @param {Number} code the error code for this error
     * @param {String} message the error message for this error
     */
    function HttpError(status, code, message) {
        /**
         * The status code for the HTTP response
         * 
         * @property status
         * @type Number
         * @deafult status
         */
        this.status = status;
        
        /**
         * The error code for this error
         * 
         * @property code
         * @type Number
         * @deafult code
         */
        this.code = code;
        
        /**
         * The error message for this error
         * 
         * @property message
         * @type String
         * @deafult message
         */
        this.message = message;
        
        /**
         * The name of this error type
         * 
         * @property name
         * @type String
         */
        this.name = C.lang.reflect.getFunctionName(this.constructor);
    }
    
    C.lang.inherit(HttpError, Error);
    
    
    C.namespace('caligula.errors').HttpError = HttpError;
    
    /**********************************************************************
     *                                                                    *
     *                       STANDARD HTTP ERRORS                         *
     *                                                                    *
     **********************************************************************/
    
    /**
     * Bad request.
     *
     * @class BadRequestError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the error message
     */
    function BadRequestError (code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(400, 40000 + code, message);
    }
    
    C.lang.inherit(BadRequestError, HttpError);
    
    C.namespace('caligula.errors').BadRequestError = BadRequestError;
    
    /**
     * This type of error is thrown when the incoming HTTP request or the 
     * required action can not be handled successfully due to the invalid
     * passed-in parameters.
     *
     * @class InvalidArgumentError
     * @constructor
     * @extends BadRequestError
     */
    function InvalidArgumentError (message) {
        /* inheritance */
        this.super(1, message);
    }
    
    C.lang.inherit(InvalidArgumentError, BadRequestError);
    
    C.namespace('caligula.errors').InvalidArgumentError = InvalidArgumentError;
    
    /**
     * This type of error is thrown when something wrong happens internal the
     * server, such as the connection to the database broken, etc.
     *
     * @class InternalServerError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the message describes this error
     */
    function InternalServerError(code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(500, 50000 + code, message);
    }
    
    C.lang.inherit(InternalServerError, HttpError);
    
    C.namespace('caligula.errors').InternalServerError = InternalServerError;
    
    /**
     * Not found
     *
     * @class NotFoundError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the message describes this error
     */
    function NotFoundError (code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(404, 40400 + code, message);
    }
    
    C.lang.inherit(NotFoundError, HttpError);
    
    C.namespace('caligula.errors').NotFoundError = NotFoundError;
    
    /**
     * This type of error is thrown when the action handler can not be found
     * in the routing tree by the router
     *
     * @class ActionHandlerNotFoundError
     * @constructor
     * @extends NotFoundError
     * @param {String} message the message describes this error
     */
    function ActionHandlerNotFoundError (message) {
        /* inheritance */
        this.super(1, message);
    }
    
    C.lang.inherit(ActionHandlerNotFoundError, NotFoundError);
    
    C.namespace('caligula.errors').ActionHandlerNotFoundError = 
        ActionHandlerNotFoundError;
    
    /**
     * This type of error is thrown when the action handler is found not be
     * a callable, because it's not a function, nor an object with a member
     * function 'call'.
     *
     * @class ActionHandlerNotCallableError
     * @constructor
     * @extends NotAcceptableError
     * @param {String} message the message describes this error
     */
    function ActionHandlerNotCallableError (message) {
        /* inheritance */
        this.super(2, message);
    }
    
    C.lang.inherit(ActionHandlerNotCallableError, NotFoundError);
    
    C.namespace('caligula.errors').ActionHandlerNotCallableError = 
        ActionHandlerNotCallableError;
    
    /**
     * Conflict
     *
     * @class ConflictError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the message describes this error
     */
    function ConflictError (code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(409, 40900 + code, message);
    }
    
    C.lang.inherit(ConflictError, HttpError);
    
    C.namespace('caligula.errors').ConflictError = ConflictError;
    
    /**
     * Gone
     *
     * @class GoneError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the message describes this error
     */
    function GoneError (code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(410, 41000 + code, message);
    }
    
    C.lang.inherit(GoneError, HttpError);
    
    C.namespace('caligula.errors').GoneError = GoneError;

    /**
     * Requested Range Not Satisfiable
     *
     * @class RequestedRangeNotSatisfiableError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the error message
     */
    function RequestedRangeNotSatisfiableError (code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(416, 41600 + code, message);
    }
    C.lang.inherit(RequestedRangeNotSatisfiableError, HttpError);
    C.namespace('caligula.errors').RequestedRangeNotSatisfiableError = RequestedRangeNotSatisfiableError;
    
    
    /**
     * This type of error is designed to be thrown when the required 
     * functionality has not been implemented yet.
     *
     * @class NotImplementedError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the error message
     */
    function NotImplementedError(code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(501, 50100 + code, message);
    }
    C.lang.inherit(NotImplementedError, HttpError);
    C.namespace('caligula.errors').NotImplementedError = NotImplementedError;
    
    /**
     * Precondition failed.
     *
     * @class PreconditionFailedError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the error message
     */
    function PreconditionFailedError(code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(412, 41200 + code, message);
    }
    C.lang.inherit(PreconditionFailedError, HttpError);
    C.namespace('caligula.errors').PreconditionFailedError = PreconditionFailedError;
    
    /**
     * Request Timeout.
     *
     * @class RequestTimeoutError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the error message
     */
    function RequestTimeoutError(code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(408, 40800 + code, message);
    }
    C.lang.inherit(RequestTimeoutError, HttpError);
    C.namespace('caligula.errors').RequestTimeoutError = RequestTimeoutError;
    
    /**
     * Found Redirection.
     *
     * @class FoundRedirection
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the error message
     */
    function FoundRedirection(code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(302, 30200 + code, message);
    }
    C.lang.inherit(FoundRedirection, HttpError);
    C.namespace('caligula.errors').FoundRedirection = FoundRedirection;
    
    /**
     * Unsupported Media Type.
     *
     * @class UnsupportedTypeError
     * @constructor
     * @extends HttpError
     * @param {Number} code the detailed error code
     * @param {String} message the error message
     */
    function UnsupportedTypeError(code, message) {
        if (String === C.lang.reflect.getObjectType(code)) {
            message = code;
            code = 0;
        }
        /* inheritance */
        this.super(415, 41500 + code, message);
    }
    C.lang.inherit(UnsupportedTypeError, HttpError);
    C.namespace('caligula.errors').UnsupportedTypeError = UnsupportedTypeError;
    
}, '0.0.1', { requires: [] });
