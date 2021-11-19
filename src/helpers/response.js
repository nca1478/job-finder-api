/**
 * Summary
 *
 * This file handle the response of HTTP requests.
 * Standard used: JSON API https://jsonapi.org/
 *
 * Object response
 *  {
 *      success: Boolean,
 *      meta: Object,
 *      data: Object|Array,
 *      errrors: Array
 *  }
 *
 */

/**
 * Return response object when is a GET resquest
 * @param   {Object}  meta    Metadata of response
 * @param   {Object}  data    Body of response
 * @return  {Object}
 */
const responseGET = (meta, data) => {
    return {
        success: true,
        data,
        meta,
        errors: null,
    }
}

/**
 * Return response object when found an error
 * @param   {Array}   errors    Array of errors
 * @return  {Object}
 */
const responseError = errors => {
    return {
        success: false,
        data: null,
        meta: null,
        errors,
    }
}

/**
 * Return response object when resource has been created
 * @param   {Object}    data    Data of new resource
 * @return  {Object}
 */
const responsePOST = data => {
    return {
        success: true,
        data,
        meta: null,
        errors: null,
    }
}

module.exports = {
    responseGET,
    responseError,
    responsePOST,
}
