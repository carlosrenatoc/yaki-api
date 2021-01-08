const CustomField = require('../model/CustomField');

exports.findAll = (req, res) => {

    var query = CustomField.find();
    
    query
    .then(customfields => {
        res.send(customfields);
    })
}

exports.findOne = (req, res) => {
    const customfieldID = req.params.customfieldId;
    CustomField.findOne({_id: customfieldID})
    .then(customfield => {
        res.send(customfield);
    })
}


exports.create = async (req, res) => {
    const customfield = new CustomField({
        name: req.body.name,
        type: req.body.type,
        entity: req.body.entity

    });
    try{
        const savedCustomField = await customfield.save();
        res.send(savedCustomField);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.update = async (req, res) => {
    const customfieldID = req.params.customfieldId;
    var data_update = {};
    if (req.body.name) data_update.name = req.body.name;
    if (req.body.type) data_update.type = req.body.type;
    if (req.body.entity) data_update.entity = req.body.entity;
    
    const customfield_updated = await CustomField.findOneAndUpdate({_id: customfieldID}, data_update, {new:true});
    res.send(customfield_updated);
}

exports.delete = (req, res) => {

    const customfieldID = req.params.customfieldID;
    
    CustomField.deleteOne({_id: customfieldID}, function (err) {
        if(err) console.log(err);
        res.send('sucessfull');
      });
}