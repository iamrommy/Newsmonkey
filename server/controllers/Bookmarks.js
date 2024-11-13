const User = require('../models/User');
const Bookmark = require('../models/Bookmark');

exports.addToBookmarks = async(req, res)=>{
    try{
        const {article, userId} = req.body;
        // console.log(article, userId);

        //get user details
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const isPresent = await Bookmark.findOne({title: article.title});
        if(isPresent){
            return res.json({
                success: true,
                message: 'Already Present in bookmarks',
                user: userDetails,
            });
        }

        const bookmark = await Bookmark.create({
            title: article.title,
            description: article.description,
            imageUrl: article.imageUrl,
            date: article.date,
            newsUrl: article.newsUrl,
            author: article.author,
            source: article.source,
            user: userId
        });

        await User.findByIdAndUpdate(
            {_id:userId},
            {
                $push: {
                    Bookmarks: bookmark._id,
                }
            },
            {new: true}
        );

        const newUser = await User.findById(userId).populate('Bookmarks').exec();

        res.json({
            success: true,
            message: 'Article is added to bookmarks successfully',
            user: newUser
        });
    }
    catch(error){
        console.log('Error in adding to bookmarks', error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.removeFromBookmarks = async(req, res)=>{
    try{
        const {title, userId} = req.body;
        // console.log(title, userId);

        //get user details
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        const isPresent = await Bookmark.findOne({title: title});
        if(!isPresent){
            return res.json({
                success: true,
                message: 'Not present in Bookmarks',
                user: userDetails,
            });
        }

        const bookmark = await Bookmark.findOneAndDelete({title: title});

        await User.findByIdAndUpdate(
            {_id:userId},
            {
                $pull: {
                    Bookmarks: bookmark._id,
                }
            },
            {new: true}
        );

        const newUser = await User.findById(userId).populate('Bookmarks').exec();

        res.json({
            success: true,
            message: 'Article is removed from bookmarks successfully',
            user: newUser
        });
    }
    catch(error){
        console.log('Error in removing from bookmarks', error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}