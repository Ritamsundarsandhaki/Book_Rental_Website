
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dfvo6ctew',
    api_key: process.env.CLOUDINARY_API_KEY || '646729118641114',
    api_secret: process.env.CLOUDINARY_API_SECRET || '1c9MVu46dd7euXJzqXd3Fe2OuuY'
})

export default cloudinary