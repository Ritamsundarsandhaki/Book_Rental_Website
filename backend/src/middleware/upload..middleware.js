import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join('src', 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg and .png files are allowed'), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export const uploadMiddleware = (count = 1) => {
    return (req, res, next) => {
        const uploadHandler = count > 1 ? upload.array('images', count) : upload.single('image');
        
        uploadHandler(req, res, (err) => {
            if (err) {
                return res.status(400).send({ error: err.message });
            }
            next();
        });
    };
};
