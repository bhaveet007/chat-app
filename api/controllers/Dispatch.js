'use strict'

import { asyncWrapper, ResponseBody } from '../helpers'
import { DispatchModel } from '../models'
import { NotificationService } from '../services'

const DispatchController = {
  email: asyncWrapper(sendEmail)
}

export default DispatchController

async function sendEmail (request, response, next) {
  if (response.body) { return process.nextTick(next) }

  const { body } = request
  const dispatchResponse = await DispatchModel.sendEmail(body)
  const responseBody = new ResponseBody(200, 'Dispatch Successful', dispatchResponse)
  response.body = responseBody
  process.nextTick(next)
}
