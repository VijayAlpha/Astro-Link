import Link from "../model/linkModel.js";
import catchAsync from "../utils/catchAsync.js";


export const createLink = catchAsync( async (req , res , next)=>{
    if (!req.body.user) req.body.user = req.user.id;

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