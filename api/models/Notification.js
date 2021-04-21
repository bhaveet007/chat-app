'use strict'

import mongoose from 'mongoose'
import { NotificationSchema } from '../schemas'
import * as uuid from 'uuid'

const mongoModel = mongoose.model('Notifications', NotificationSchema)

const NotificationModel = {
  create,
  update,
  get
}

export default NotificationModel

async function create (params) {
  try {
    const notifId = uuid.v4().replace(/-/g, '_')
    const updatedParams = { ...params, notifId }
    const notification = await mongoModel.create(updatedParams)
    return notification
  } catch (e){
    console.error(e)
  }
}

async function update (query, params) {
  try {
    const notification = await mongoModel.updateOne(query, params)
    return notification
  } catch (e){
    console.error(e)
  }
}

async function get (params) {
  try {
    const notification = await mongoModel.find(params)
    return notification
  } catch (e){
    console.error(e)
  }
}
