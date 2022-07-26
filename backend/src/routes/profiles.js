/**
 * @author    Wolfgang Kowarschick <kowa@hs-augsburg.de>
 * @author    Tobias Breitenauer <tobias.breitenauer@hs-augsburg.de>
 * @copyright 2022
 * @license   MIT
 * 
 * This file provides functions to handle requests about profiles.
 */
import Router                   from 'express-promise-router'
import profileSchema            from '../schema/profile-schema.js'
import profilesDB               from '../db/profiles.js'
import imagesDB                 from '../db/images.js'
import saved_accountsDB         from '../db/saved_accounts.js'
import saved_imagesDB           from '../db/saved_images.js'

const 
  profiles = Router()

profiles.route('/')
// Handles GET request for getting every profile
.get
( 
  async (req, res) => 
  { const 
      {status, data} = await profilesDB.getProfiles(req.query.search)
    
    res.status(status).json(data ?? {})
  }
)

profiles.route('/:username')
// Handles GET request for a certain profile
.get
( 
  async (req, res) => 
  {
    const 
      {status, data} = await profilesDB.getProfileByName(req.params.username)

    res.status(status).json(data ?? {})
  }  
)

profiles.route('/:username/images')
// Handles GET request for getting every image of a profile
.get
( 
  async (req, res) => 
  {
    const 
      {status, data} = await imagesDB.getImages(req.params.username)

    res.status(status).json(data ?? {})
  }  
)

profiles.route('/:username/images/saved')
// Handles GET request for getting saved images of a profile
.get(
  async (req, res) => 
  { 
    const 
      {status, data} = await saved_imagesDB.getSaved(req.params.username)

    res.status(status).json(data ?? {})
  }  
)

profiles.route('/:username/images/saved/:image_id')
// Handles GET request for getting if a image is saved by a profile
.get(
  async (req, res) => 
  {
    const 
      {status, data} = await saved_imagesDB.isSavedBy(req.params.username, req.params.image_id)

    res.status(status).json(data ?? {})
  }  
)

profiles.route('/:username/images/:image_id')
// Handles GET request for getting a certain image.
.get(
  async (req, res) => 
  {
    if(!testValidUUID(req.params.id)) return res.status(200).json({});
    const 
      {status, data} = await imagesDB.getImage(req.params.image_id)

    res.status(status).json(data ?? {})
  }  
)

profiles.route('/:username/feed')
// Handles GET request for getting a feed of a user
.get(
  async (req, res) => 
  {
    const 
      {status, data} = await imagesDB.getFeed(req.params.username);

    res.status(status).json(data ?? {})
  }
)

profiles.route('/:username/saved')
// Handles GET request for getting profiles that a user saved
.get(
  async (req, res) => 
  {
    const 
      {status, data} = await saved_accountsDB.getSaved(req.params.username);

    res.status(status).json(data ?? {})
  }
)

profiles.route('/:username/savedby')
// Handles GET request for getting profiles that saved a user
.get(
  async (req, res) => 
  {
    const 
      {status, data} = await saved_accountsDB.getSavedBy(req.params.username);

    res.status(status).json(data ?? {});
  }
)

profiles.route('/:username/savedby/:otheruser')
// Handles GET request if a user is saved by another user
.get(
  async (req, res) =>
  {
    const
      {status, data} = await saved_accountsDB.isSavedBy(req.params.username, req.params.otheruser);
      res.status(status).json(data ?? {});
  }
)

export
{ profiles, 
  profileSchema,
}

export default 
{ profiles, 
  profileSchema,
}
