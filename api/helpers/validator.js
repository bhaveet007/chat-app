'use strict'

import { validationResult } from 'express-validator'
import {
  ResponseBody
} from '../helpers'

export function validate (req, res, next) {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }))
  const responseBody = new ResponseBody(400, 'Validation Error', undefined, extractedErrors)
  res.body = responseBody
  return process.nextTick(next)
}
