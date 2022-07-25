/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides functions to handle requests about images.
 */
import Router                   from 'express-promise-router'
import imageSchema              from '../schema/image-schema.js'
import imagesDB                 from '../db/images.js'
import testValidUUID            from '../util/testUUID.js' 
import { isAuthorized }         from '../util/auth.js'
import { refreshToken }         from './auth.js'

const 
  images = Router();

images.route('/')
// Handle GET request for getting all images
.get
( 
  async (req, res) => 
  { const 
      {status, data} = await imagesDB.getImages()
    
    res.status(status).json(data ?? {})
  }
)

images.route('/newest')
// GET newest 12 images that were uploaded by anyone
  .get(
    async (req, res) => {
      const 
        { status, data } = await imagesDB.getNewestImages()

      res.status(status).json(data ?? {})
    }
  )

images.route('/:id')
// GET an image by its ID, if the ID is valid and the image exists
.get
(
  async (req, res) => 
  { 
    if(!testValidUUID(req.params.id)) return res.status(200).json({});
    const 
      {status, data} = await imagesDB.getImage(req.params.id)

    res.status(status).json(data ?? {})
  }  
)

// DELETE request for an image
.delete
( isAuthorized, refreshToken,
  async (req, res) => 
  {
    if (!req.isAdmin && req.id !== req.body.accountid)
    { return res.status(401).json({message: 'not authorized'}) }
    
    const 
      {result} = await imagesDB.deleteImage(req.params.id, req.body)

    res.status(result.status).json(result)
  }  
)

export
{ images, 
  imageSchema,
}

export default 
{ images, 
  imageSchema,
}
