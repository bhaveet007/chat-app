'use strict'

import mongoose from 'mongoose'

import {  mongoSchemaWrapper  } from '../helpers'

const { Schema } = mongoose
const CHANNELS = ['SMS', 'EMAIL']

const STATUS = ['CREATED', 'SENT', 'ERROR']
const DEFAULT_STATUS = 'CREATED'

const _AttachmentSchema = new Schema({
  fileName: { type: String },
  content: { type: String }
}, { _id: false })

const _NotificationDataSchema = new Schema({
  // Data for SMS
  mobileNo: { type: String },
  message: { type: String },

  // Data for Email
  email: { type: String },
  from: { type: String },
  to: [{ type: String }],
  cc: [{ type: String }],
  bcc: [{ type: String }],
  subject: { type: String },
  text: { type: String },
  html: { type: String },
  attachments: [_AttachmentSchema]
}, { _id: false })

export const NotificationSchema = new Schema({
  ownerId: { type: String, index: true },
  ownerName: { type: String },
  appId: { type: String, index: true },
  appType: { type: String, index: true },
  appName: { type: String },

  notifId: { type: String, index: true },
  serviceId: { type: String, index: true },

  channel: { type: String, required: true, enum: CHANNELS },
  data: { type: _NotificationDataSchema, required: true },

  status: { type: String, required: true, enum: STATUS, default: DEFAULT_STATUS },
  error: { type: Schema.Types.Mixed }
}, { timestamps: true })

mongoSchemaWrapper(NotificationSchema)

export default NotificationSchema
