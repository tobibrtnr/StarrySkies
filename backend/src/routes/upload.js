/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides a function for uploading an image via POST request.
 */
import Router                   from 'express-promise-router'
import validate                 from '../schema/validate.js'
import imagesDB                 from '../db/images.js'
import imageSchema              from '../schema/image-schema.js'
import { isAuthorized }         from '../util/auth.js'
import { refreshToken }         from './auth.js'

const 
  upload = Router();

upload.route('/upload')
.post
( isAuthorized, validate({ body: imageSchema }), refreshToken,
  async (req, res) => 
  {
    // users can only upload an image for their own account.
    if (req.id !== req.body.account_id)
      { return res.status(401).json({message: 'not authorized'}) }
    const 
      {result} = await imagesDB.postImage(req.body, req.files?.file.data),
      proxy    = req.headers["x-forwarded-host"],
      host     = proxy ? proxy : req.headers.host

    res.set('Location', `${req.protocol}://${host}/v1/images/${result.id}`)
       .status(result.status)
       .json(result) 
  }  
)

export default upload
