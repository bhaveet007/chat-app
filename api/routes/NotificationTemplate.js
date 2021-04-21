'use strict'

import Express from 'express'

import { routerUtils, asyncWrapper } from '../helpers'
import { NotificationTemplateController } from '../controllers'

const NotificationTemplateRouter = new Express.Router()

const { routeSanity } = routerUtils

const {
  Create,
  Get,
  GetList,
  Update,
  Delete,
  Render
} = NotificationTemplateController

export default NotificationTemplateRouter

NotificationTemplateRouter.post('/', routeSanity, asyncWrapper(Create))
NotificationTemplateRouter.get('/:templateId/:templateType', routeSanity, asyncWrapper(Get))
NotificationTemplateRouter.get('/', routeSanity, asyncWrapper(GetList))
NotificationTemplateRouter.post('/render', routeSanity, asyncWrapper(Render))
NotificationTemplateRouter.put('/:templateId/:templateType', routeSanity, asyncWrapper(Update))
NotificationTemplateRouter.delete('/:templateId', routeSanity, asyncWrapper(Delete))
