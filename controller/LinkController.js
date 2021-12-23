import sharp from 'sharp';
import Link from '../model/linkModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

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

export const createLink = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;

  if (req.file) req.body.photo = req.file.filename;

  const link = await Link.create(req.body);

  res.status(201).json({
    status: 'success',
    link,
  });
});

export const editLink = catchAsync(async (req, res, next) => {

  if (req.file) req.body.photo = req.file.filename;

  const link = await Link.findById(req.params.id);

  if (!link) {
    return next(new AppError('No document found with that ID', 404));
  }

  if(link.user != req.user.id){
    return next(new AppError("You don't have permission to update this link", 401));
  }

  const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: 'success',
    updatedLink,
  });
});

export const deleteLink = catchAsync(async (req, res, next) => {
  const link = await Link.findByIdAndDelete(req.body.linkId);

  if (!link) {
    return next(new AppError('No link found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
  });
});

export const getLink = catchAsync(async (req, res, next) => {
  const link = await Link.find().populate('user');

  res.status(201).json({
    link,
  });
});
