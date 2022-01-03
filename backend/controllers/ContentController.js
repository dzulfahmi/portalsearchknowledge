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
    const totalElastic = await Content.find({ elastic: 1}).countDocuments();

    const contentpermonth = await Content.aggregate([
        {$group: {
            // _id: {$month: "$created_at"}, 
            // _id: {$substr: ['$created_at', 5, 2]},
            _id: {$substr: ['$created_at', 0, 7]},
            numofcontent: {$sum: 1},
            numofelastic: { $sum: "$elastic" } 
        }},
        //{ $sort: { created_at: 1 } }, // 1,-1
    ]);

    let contentvselastic = generateElasticvsContent(contentpermonth);
    // console.log('isi contentper month', contentpermonth);
    
    res.json({ contents, contentByFilter, elasticByFilter, totalContent, totalElastic, contentpermonth, contentvselastic })
})

const generateElasticvsContent = (param) => {
    let contentList = [];
    param.forEach(element => {
        let content = {
            month: element._id,
            type: 'content',
            count: element.numofcontent
        }

        let elastic = {
            month: element._id,
            type: 'elastic',
            count: element.numofelastic
        }
        contentList.push(content);
        contentList.push(elastic);
    });
    console.log('isi abcdefgh', contentList);
    // const sortedContent = contentList.slice().sort();
    // const sortedContent = contentList.slice().sort((a, b) => b.month > a.month)
    // console.log('isi ijklmnop', sortedContent);
    const sortedContent2 =  contentList.sort((b, a) => {
                                if (b.month > a.month) {
                                return 1;
                                }
                                if (b.month < a.month) {
                                return -1;
                                }
                                return 0;
                            });
    // console.log('isi qrstuvwx', sortedContent2);

    return sortedContent2;
}


export { 
    getContents,
    getContentById,
    countContents
}