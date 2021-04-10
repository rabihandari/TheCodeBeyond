import multer from 'multer';
import { v4 as UUID } from 'uuid';

// Profile Pictures Storage
export const profileStorage = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, process.cwd() + '/uploads/profile')
        },
        filename: (req, file, cb) => {
            const { originalname } = file;
            cb(null, `${UUID()}-${originalname}`);
        }
    }) 
});


// Post Pictures Storage
export const postStorage = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, process.cwd() + '/uploads/posts')
        },
        filename: (req, file, cb) => {
            const { originalname } = file;
            cb(null, `${UUID()}-${originalname}`);
        }
    }) 
});

