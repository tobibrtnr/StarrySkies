/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides functions for handling saving / unsaving 
 * profiles and images.
 */
import Router                   from 'express-promise-router'
import validate                 from '../schema/validate.js'
import saved_accountsDB         from '../db/saved_accounts.js'
import saved_imagesDB           from '../db/saved_images.js'
import savedSchema              from '../schema/save-schema.js'
import { isAuthorized }         from '../util/auth.js'
import { refreshToken }         from './auth.js'

const 
  save = Router()

save.route('/account')
  // Handles POST of a new saved account relation
  .post(
    isAuthorized, validate({ body: savedSchema }), refreshToken,
    async (req, res) => 
    {
      const
        {result} = await saved_accountsDB.postSave(req.id, req.body.saved_id)
  
      res.status(result.status).json(result) 
    }  
  )
  
  // Handles DELETE of a saved account relation
  .delete(
    isAuthorized, validate({ body: savedSchema }), refreshToken,
    async (req, res) => 
    {
      const
        {result} = await saved_accountsDB.deleteSave(req.id, req.body.saved_id)
  
      res.status(result.status).json(result) 
    }  
  )

save.route('/image')
  // Handles POST of a new saved image relation
  .post(
    isAuthorized, validate({ body: savedSchema }), refreshToken,
    async (req, res) => 
    {
      const
        {result} = await saved_imagesDB.postSave(req.id, req.body.saved_id)
  
      res.status(result.status).json(result) 
    }  
  )
  
  // Handles DELETE of a saved image relation
  .delete(
    isAuthorized, validate({ body: savedSchema }), refreshToken,
    async (req, res) => 
    {
      const
        {result} = await saved_imagesDB.deleteSave(req.id, req.body.saved_id)
  
      res.status(result.status).json(result) 
    }  
  )

export default save
