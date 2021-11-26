import sharp from 'sharp';
import Link from "../model/linkModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

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

export const deleteLink = catchAsync( async (req , res , next)=>{

    const link = await Link.findByIdAndDelete(req.body.linkId);

    if (!link) {
        return next(new AppError('No link found with that ID', 404));
    }

    res.status(204).json({
        status: 'success'
    })
})

export const getLink = catchAsync( async (req , res , next)=>{
    const link = await Link.find().populate('user');

    res.status(201).json({
        link
    })
})