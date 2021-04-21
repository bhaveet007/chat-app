'use strict'

import qs from 'qs'
import nodeMailer from 'nodemailer'

import { DISPATCH_CONFIG } from '../../config'
import NotificationModel from './Notification'
import { ResponseBody } from '../helpers'

const DispatchModel = {
  sendEmail
}

export default DispatchModel

async function sendEmail (params) {
  const notification = await _createNotification(params)
  const { _id: notificationId } = notification

  try {
    const { SMTP_HOST, SMTP_PORT, SENDER_EMAIL, SENDER_NAME, NODEMAILER_DEBUG,
      NODEMAILER_LOGGER, SMTP_USERNAME, SMTP_PASSWORD
     } = DISPATCH_CONFIG

    const { data = {} } = notification
    const { from, to, subject, text, html, attachments } = data
    const emailFrom = from || `"${SENDER_NAME}" ${SENDER_EMAIL}`
    const emailTo = to.join()
    const emailAttachment = attachments.map(item => {
      const { fileName, content } = item
      return {
        filename: fileName,
        content: Buffer.from(content, 'base64')
      }
    })

    const transporter = nodeMailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      debug: NODEMAILER_DEBUG,
      logger: NODEMAILER_LOGGER,
      secure: false,
      pool: true,
      auth: {
        type: 'login',
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    })

    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      subject: subject,
      text,
      html,
      attachments: emailAttachment
    }

    const response = await transporter.sendMail(mailOptions)

    const { messageId: serviceId } = response
    const updateQuery = { _id: notificationId }
    const updateData = { status: 'SENT', serviceId }
    const updatedNotif = await NotificationModel.update(updateQuery, updateData)
    return updatedNotif
  } catch (e) {
    const updateQuery = { _id: notificationId }
    const error = JSON.parse(JSON.stringify(e))
    const updateData = { status: 'ERROR', error }
    const updatedNotif = await NotificationModel.update(updateQuery, updateData)
    throw new ResponseBody(500, 'Error occured while sending mail', undefined, e)
  }
}

async function _createNotification (params) {
  const { ownerId, ownerName, appId, appType, appName } = params

  const extraProp = { ownerId, ownerName, appId, appType, appName }
  const updatedParams = { ...params, ...extraProp }

  const notification = await NotificationModel.create(updatedParams)
  return notification
}
