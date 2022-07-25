/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides the validate function
 */
import { Validator } from 'express-json-validator-middleware'
import addFormats    from 'ajv-formats'

const validator = new Validator()

addFormats(validator.ajv)

export default validator.validate
