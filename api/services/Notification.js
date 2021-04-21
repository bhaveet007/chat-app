'use strict'

import { USER_LIST_NOTIFICATION } from '../constants'
import { DispatchModel, NotificationTemplateModel, NotificationModel } from '../models'
import { CustomError, ResponseBody } from '../helpers'

const NotificationService = {
  sendEmailNotification,
  retryNotification
}

export default NotificationService

async function retryNotification() {
  try {
    const getFailedNotifications = await NotificationModel.get({ status: 'ERROR' }) 

    const promises = getFailedNotifications.map((data) => {
      const emailParams = { channel: 'EMAIL', data }

      return DispatchModel.sendEmail(emailParams)
    })

    const promiseResult = await Promise.all(promises)
    return promiseResult
  } catch(e) {
     console.error(e)
  }
}

async function _sendNotification (data, email) {
  try {
    const { templateId, templateType, mobileNo, subject = '', locals, body = '', attachments = [], from='stackfinance@gmail.com' } = data
    if (!templateId) {
      throw new ResponseBody(data, {statusCode: 500, message: 'Template cannot be blank to send notification' })
    }

    if (!templateType) {
      throw new ResponseBody(data, { statusCode: 500, message: 'Notification templateType cannot be blank to send notification' })
    }

    if (templateType === 'EMAIL' && !email) {
      throw new ResponseBody(data, { statusCode: 500, message: 'Email cannot be blank to send email notification' })
    }

    if (templateType === 'SMS' && !mobileNo) {
      throw new ResponseBody(data, { statusCode: 500, message: 'mobileNo cannot be blank to send sms notification' })
    }

    const renderParams = { templateId, templateType, locals }
    const messageBody = await NotificationTemplateModel.Render(renderParams)

    const emailParams = { channel: 'EMAIL', data: { to: email, subject, html: messageBody, body, attachments } }

    const emailResponse = await DispatchModel.sendEmail(emailParams)
    return emailResponse
  } catch (error) {
    throw new ResponseBody({statusCode: 500, message: 'An error occured while sending notification' }, {}, error)
  }
}

async function sendEmailNotification(params){
  try {
    const email = USER_LIST_NOTIFICATION.map((e)=> {return e.email})

    const getTemplateData = await NotificationTemplateModel.Get({ templateId: 225, isActive: true, templateType: "EMAIL" })

    const response = await _sendNotification(getTemplateData, email)
    return response
  } catch(e) {
     console.error(e)
  }
}
