'use strict'

import {
  ResponseBody
} from '../helpers'
import {
  NotificationTemplateModel
} from '../models'

const NotificationTemplateController = {
  Create,
  Get,
  GetList,
  Render,
  Update,
  Delete
}

export default NotificationTemplateController

async function Create (request, response, next) {
  if (response.body) {
    return process.nextTick(next)
  }
  const {
    body
  } = request
  const data = await NotificationTemplateModel.Create(body)
  const responseBody = new ResponseBody(200, 'Template Created Successfully', data)
  response.body = responseBody
  process.nextTick(next)
}

async function Get (request, response, next) {
  if (response.body) {
    return process.nextTick(next)
  }
  const {
    params
  } = request
  const data = await NotificationTemplateModel.Get(params)
  let responseBody = null
  if (!data.statusCode) { responseBody = new ResponseBody(200, 'Template loaded Successful', data) } else { responseBody = new ResponseBody(404, 'Template Not Found') }
  response.body = responseBody
  process.nextTick(next)
}

async function GetList (request, response, next) {
  if (response.body) {
    return process.nextTick(next)
  }
  const data = await NotificationTemplateModel.GetList()
  let responseBody = null
  if (!data.statusCode) { responseBody = new ResponseBody(200, 'Template loaded Successful', data) } else { responseBody = new ResponseBody(404, 'Template Not Found') }
  response.body = responseBody
  process.nextTick(next)
}

async function Render (request, response, next) {
  if (response.body) {
    return process.nextTick(next)
  }
  const {
    body
  } = request
  const data = await NotificationTemplateModel.Render(body)
  let responseBody = null
  if (!data.statusCode) { responseBody = new ResponseBody(200, 'Template loaded Successful', data) } else { responseBody = new ResponseBody(404, 'Template Not Found') }
  response.body = responseBody
  process.nextTick(next)
}

async function Update (request, response, next) {
  if (response.body) {
    return process.nextTick(next)
  }
  const {
    body,
    params
  } = request
  const data = await NotificationTemplateModel.Update(body, params)
  const responseBody = new ResponseBody(200, 'Template Update Successful', data)
  response.body = responseBody
  process.nextTick(next)
}

async function Delete (request, response, next) {
  if (response.body) {
    return process.nextTick(next)
  }
  const {
    params
  } = request
  const data = await NotificationTemplateModel.Delete(params)
  const responseBody = new ResponseBody(200, 'Template deleted Successful', data)
  response.body = responseBody
  process.nextTick(next)
}
