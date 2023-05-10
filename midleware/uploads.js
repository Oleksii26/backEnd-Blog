import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        width: 550,
        Crop: 'fill',
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Configuration 
cloudinary.config({
    cloud_name: "dtcpohmvh",
    api_key: "416256211882687",
    api_secret: "FMJlCXclATSnH1Anzi82ByFIRSg"
});


// Upload

const res = cloudinary.uploader.upload(`https://upload.wikimedia.org/wikipedia/commons/a/ae/name`, { public_id: 'name' })

const url = cloudinary.url("name", {
    width: 100,
    height: 150,
    Crop: 'fill'
});

res.then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});


// https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag
export const upload = multer({ storage });
