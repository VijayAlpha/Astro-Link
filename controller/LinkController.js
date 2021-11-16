import sharp from 'sharp';
import Link from "../model/linkModel.js";
import catchAsync from "../utils/catchAsync.js";

export const resizeLinkPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    req.file.filename = `link-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
          .resize(250, 250)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/link-image/${req.file.filename}`);
    
    next();
  });

export const createLink = catchAsync( async (req , res , next)=>{
    if (!req.body.user) req.body.user = req.user.id;

    if (req.file) req.body.photo = req.file.filename;

    const link = await Link.create(req.body);

    res.status(201).json({
        status: 'success',
        link,
    })
})

export const getLink = catchAsync( async (req , res , next)=>{
    const link = await Link.find().populate('user');

    res.status(201).json({
        link
    })
})