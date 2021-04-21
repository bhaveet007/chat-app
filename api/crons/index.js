'use strict'

import sendEmailNotification from './sendNotification'
import retryNotification from './retryNotification'

const cronFunctions = [
  sendEmailNotification,
  retryNotification
]

function taskRunner () {
  cronFunctions.map((func) => func())
}

export default taskRunner
