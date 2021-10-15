const Tag = require('../models/tag');
const Student = require('../models/student');
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: process.env.USETLS,
});

exports.validateTag = (req, res) => {
        rfidTag = req.body.rfid;

        Tag.findOne({rfid: rfidTag}).then(document => {
          if(document){
          if(document.isAssigned == true && document.isActive == true){
                  
                  //send pusher to angular app
                  Student.findOne({rfidTag: rfidTag}).then(student => {
                    console.log(student);
                    if(student){
                      
                      console.log(student);
                      pusher.trigger("display-channel", "stud-access", {
                        firstName: student.firstName,
                        lastName: student.lastName,
                        email: student.email,
                        regNumber: student.regNumber,
                        imagePath: student.imagePath,

                      });
                      res.status(200).json({ message: 'Tag holder found successfully'});

                    }
                    
                  }).catch(error => {
                    res.status(500).json({
                      message : "Couldn't retrieve student!"
                    });
                  })
                
          }else if(document.isAssigned == false && document.isActive == true){
                  //send pusher to angular app for adding dstudent

                  pusher.trigger("entry-channel", "stud-entry", {
                    message: "Tag not assigned",
                    rfid: document.rfid
                  });

                  res.status(200).json({ message: 'Tag not assigned'});

          } else if(document.isAssigned == true && document.isActive == false) {
                  res.status(401).json({ message: 'Not Authorized. No longer active'});
          
          }
        } else {
                  const tag = new Tag({
                          rfid: rfidTag,
                          isAssigned: false,
                          isActive: true
                  });
                  tag.save().then(createdTag =>{
                      res.status(201).json({
                        mesaage: "Tag added successfully",
                        tag: {
                          ...createdTag,
                          id: createdTag._id
                        }
                      });
                    }).catch(error =>{
                      res.status(500).json({
                        message: "creating a tag failed!"
                      })
                    });

          }
        });
  
}

exports.updateTag = (req, res, next) =>{
  const tag = new Tag({
    _id: req.body.id,
    rfid: req.body.rfid,
    isAssigned: req.body.isAssigned,
    isActive: req.body.isActive,
  });

  Tag.updateOne({_id: req.params.id}, tag).then(result => {
    if(result.n > 0){
      res.status(200).json({ message: 'Update successful'})
    }else{
      res.status(401).json({ message: 'Not Authorized'})
    }

  }).catch(error =>{
    res.status(500).json({
      message : "Couldn't update tag!"
    });
  });
}

// exports.getTags = (req, res, next) => {
//   const pageSize = +req.query.pagesize;  
//   const currentPage = +req.query.page;
//   const tagQuery = Tag.find();
//   let fetchedTags;

//   if(pageSize && currentPage){
//     fetchedTags
//     .skip( pageSize * (currentPage - 1))
//     .limit(pageSize);
//   }


//   tagQuery.then( documents => {
//         fetchedTags = documents;
//         return Tag.countDocuments();
//   })
//   .then(count =>{
//     res.status(200).json({
//       message: 'Succesfully sent from api',
//       body: fetchedTags,
//       maxTags: count
//     });
//   })
//   .catch(error =>{
//     res.status(500).json({
//       message: "Fetching tags failed!"
//     });
//   });
// }


// exports.getTag = (req, res, next) =>{
//   Tag.findById(req.params.id).then(tag =>{
//     if(tag){
//       res.status(200).json(tag);
//     }
//     else{
//       res.status(404).json({
//         message: "tag not found"
//       })
//     }
//   })
//   .catch(error => { 
//     res.status(500).json({
//       message: "Fetching tag failed!"
//     });
//   });
// }

exports.deleteTag = (req, res, next) => {

  Tag.deleteOne({ _id: req.params.id}).then(result =>{

    if(result.n > 0){
      res.status(200).json({ message: 'Deletion successful'})
    }else{
      res.status(401).json({ message: 'Not Authorized'})
    }
  })
  .catch(error =>{
    res.status(500).json({
      message: "Deleting tag failed!"
    });
  });
}