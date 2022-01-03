import asyncHandler from 'express-async-handler'
import Content from '../models/ContentModel.js'
import moment from 'moment';


// @desc    Get all contents
// @route   GET /api/contents
// @access  Private/Admin
const getContents = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    const total     = await Content.find().countDocuments()
    const contents  = await Content.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ name: 1 })
        
    res.json({ total, contents })
})

// @desc    Get content by id
// @route   GET /api/contents/:id
// @access  Private/Admin
const getContentById = asyncHandler(async (req, res) => {
    const content = await Content.findById(req.params.id)
    if (content) {
        res.json(content)
    } else {
        res.status(404)
        throw new Error('content not found')
    }
})

// @desc    Count contents types
// @route   GET /api/contents/count
// @access  Private/Admin
const countContents = asyncHandler(async (req, res) => {
    // const start = req.query.start;
    // const end = req.query.end ?? new Date().toISOString();
    let start = req.body.start ?? new Date();
    let end = req.body.end ?? new Date().toISOString();
    console.log('isi req', req.body);
    console.log('isi req 2', req.query);
    
    // if (req.body.param === 'custom') {
    //     // start = moment(start).subtract(1, 'week').startOf('week').toISOString();
    //     start = req.body.from;
    //     end = req.body.to;
    // }
    // console.log('isi coba', moment(start).subtract(1, 'week').startOf('week').toISOString());
    console.log('isi start', start);
    console.log('isi end', end);
    const filter = {}
    if (start) {
        filter['created_at'] = {
            $gte: start,
            $lte: end
        }
    }

    const contents = await Content.aggregate([
        { $match: filter },
        { $group: {
            _id: "$content_type",
            total: { $sum: 1 },
            elastic: { $sum: "$elastic" }
        } },
    ])

    const contentByFilter = await Content.find({
        created_at: {
            $gte: start,
            $lte:  end
        }
    }).countDocuments();
    const elasticByFilter = await Content.find(
        {elastic: 1},
        {
            created_at: {
                $gte: start,
                $lte:  end
            },
        }
    ).countDocuments();
    const totalContent = await Content.find().countDocuments();
    const totalElastic = await Content.find({ elastic: 1}).countDocuments()
    
    res.json({ contents, contentByFilter, elasticByFilter, totalContent, totalElastic })
})


export { 
    getContents,
    getContentById,
    countContents
}