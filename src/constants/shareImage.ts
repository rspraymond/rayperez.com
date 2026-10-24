import profileImage from '../assets/raymond-perez.jpg'
import { SITE_URL } from './siteUrl'

// Vite rewrites the import to the hashed file; PROFILE.image is not a bucket object.
export const SHARE_IMAGE_URL = `${SITE_URL}${profileImage}`
