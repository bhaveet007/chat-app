'use strict'

import ejs from 'ejs'
import mongoose from 'mongoose'
import { NotificationTemplateSchema } from '../schemas'

const NotificationTemplateModel = {
  Create,
  Get,
  GetList,
  Render,
  Update,
  Delete
}

const MongoModel = mongoose.model('NotificationTemplate', NotificationTemplateSchema)

export default NotificationTemplateModel
const toSave = {
channel: "EMAIL",
data: {
    to: [
        "bhaveetseekin14@gmail.com"
    ],
    subject: "Email Subject",
    text: "Email Text Body",
    html: "HI!! This is test email"
}
}

async function Create (params) {
  try {
    const data = await MongoModel.create(params)

    return data
  } catch (error) {
    throw error
  }
}

async function Get (params) {
  try {
    const { templateId, templateType } = params

    const templateData = await MongoModel.findOne({ templateId, isActive: true, templateType })
    if (templateData) { return templateData }
    const data = {
      statusCode: 404,
      data: 'Template Not Found!'
    }

    return data
  } catch (error) {
    throw error
  }
}

async function GetList () {
  try {
    const templates = await MongoModel.find({ isActive: true })

    if (templates) { return templates }
    const data = {
      statusCode: 404,
      data: 'Template Not Found!'
    }

    return data
  } catch (error) {
    throw error
  }
}

async function Render (params) {
  try {
    const {
      templateId,
      templateType,
      locals
    } = params

    const templateData = await MongoModel.findOne({ templateId, isActive: true, templateType })
    // console.log('Render -> templateData', templateData)
    if (templateData) {
      const { templateBody } = templateData
      // dynamic data for bind into the template
      const template = ejs.render(templateBody, locals)
      return template
    }
    const data = {
      statusCode: 404,
      data: 'Template Not Found!'
    }
    return data
  } catch (error) {
    throw error
  }
}

async function Update (body, params) {
  try {
    const { templateId, templateType } = params

    const data = await MongoModel.update({ templateId, templateType }, body)
    return data
  } catch (error) {
    throw error
  }
}

async function Delete (params) {
  try {
    const { templateId } = params

    const data = await MongoModel.update({ templateId }, { isActive: false })
    return data
  } catch (error) {
    throw error
  }
}
