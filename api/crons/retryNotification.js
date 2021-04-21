'use strict'

import { CronJob } from 'cron'

import { NotificationService } from '../services'

import { CRON_CONFIG } from '../../config'

function retryNotification () {
  const { TIME_ZONE, CRON_TIME_RETRY_NOTIFICATION } = CRON_CONFIG
  console.log('[Task - EMAIL_REPORT] CRON_TIME_RETRY_NOTIFICATION', CRON_TIME_RETRY_NOTIFICATION)

  const cronOptions = {
    cronTime: CRON_TIME_RETRY_NOTIFICATION,
    onTick,
    onComplete,
    start: true,
    timeZone: TIME_ZONE,
    context: true,
    runOnInit: false
  }
  return new CronJob(cronOptions)
}

export default retryNotification

async function onTick () {
  try {
    const response = await NotificationService.retryNotification()
    console.log('=============================================================')
    console.log('  [Task - CRON_TIME_RETRY_NOTIFICATION] After email notification')
    console.log('=============================================================')

    return response
  } catch (error) {
    console.log('  [Task - CRON_TIME_RETRY_NOTIFICATION] Error while running the email notification job running')
    console.error(error)
    return true
  }
}

async function onComplete () {
  console.log('[Task - CRON_TIME_RETRY_NOTIFICATION] After email report job completed')
}
