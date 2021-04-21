'use strict'

import mongoose from 'mongoose'

import {  mongoSchemaWrapper  } from '../helpers'

const { Schema } = mongoose

const NotificationTemplateSchema = new Schema({
  templateId: {
    type: String,
    unique: true
  },
  triggerName: {
    type: String,
    trim: true
  },
  templateName: {
    type: String
  },
  description: {
    type: String
  },
  templateBody: {
    type: String
  },
  templateType: {
    type: String,
    trim: true
  },
  // cron: {
  //   type: String
  // },
  isActive: {
    type: Boolean,
    trim: true,
    default: true
  }
}, { timestamps: true })

NotificationTemplateSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  return next()
})

mongoSchemaWrapper(NotificationTemplateSchema)

export default NotificationTemplateSchema
