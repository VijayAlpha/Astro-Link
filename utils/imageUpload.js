import multer from 'multer';

// This below code for image upload
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadImage = upload.single('photo');
export const uploadUserImage = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'banner', maxCount: 1 }])