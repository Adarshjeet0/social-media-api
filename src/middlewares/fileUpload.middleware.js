//1. import multer to upload file
import multer from 'multer';

//2. config storage with filename and file location

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/middlewares/uploads' );
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString().replace(/:/g, '_') + file.originalname);
    }

});

export const upload = multer({
    storage: storage,
}); 