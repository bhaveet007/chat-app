'use strict'

import Express from 'express'
import { routerUtils, asyncWrapper } from '../helpers'
import { DispatchController } from '../controllers'

const DispatchRouter = new Express.Router()
const { email } = DispatchController
const { routeSanity } = routerUtils

export default DispatchRouter

DispatchRouter.post('/email', routeSanity, asyncWrapper(email))
