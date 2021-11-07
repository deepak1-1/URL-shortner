
const shortId = require('shortid');
const path = require('path');
const urlModel = require('../model/urlSchema.ejs');


const get_main_page = async (req, res)=>{
    
    res.render('basic/main', {title: 'URL Shortner', stylesheet: '/css/style.css'});
}

const create_short_url = async (req, res)=>{

    const createUrl = new urlModel({
        url: req.body.url,
        shortId: shortId.generate(),
        createdBy: false,
        createdTimestamp: new Date(),
        attempts: false,
        validUptoTime: false
    })
    
    createUrl.save()
    .then(result => {
        
        res.send({shorted: result.shortId});
    })
    .catch(err=>{
        console.log(err)
        res.send({shorted: false});
    })
}

const redirect_to_url = async (req, res)=>{

    const { shortId } = req.params;
    const result = await urlModel.findOne({shortId})
    
    if(!result){
        //some stuff
    } else {
        res.redirect(result.url)
    }
}

module.exports = {
    get_main_page,
    create_short_url,
    redirect_to_url
};