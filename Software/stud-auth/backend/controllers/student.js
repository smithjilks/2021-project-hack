const Student = require('../models/student');
const Tag = require('../models/tag');


exports.createStudent = (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        regNumber: req.body.regNumber,
        imagePath: url + "/images/" + req.file.filename,
        rfidTag: req.body.rfidTag
  });

  student.save().then(createdStudent =>{

    Tag.updateOne({isAssigned: true}, {rfid: student.rfid})
    res.status(201).json({
      mesaage: "Student added successfully",
      sudent: {
        ...createdStudent,
        id: createdStudent._id
      }
    });
  }).catch(error =>{
    res.status(500).json({
      message: "creating a student failed!"
    })
  });
}

exports.updateStudent = (req, res, next) =>{
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;

  }
  const student = new Student({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    regNumber: req.body.regNumber,
    imagePath: imagePath,
    rfidTag: req.body.rfidTag
  });

  Student.updateOne({_id: req.params.id}, student).then(result => {
    if(result.n > 0){
      res.status(200).json({ message: 'Update successful'})
    }else{
      res.status(401).json({ message: 'Not Authorized'})
    }

  }).catch(error =>{
    res.status(500).json({
      message : "Couldn't update student!"
    });
  });
}

exports.getStudents = (req, res, next) => {

  const pageSize = +req.query.pagesize;  
  const currentPage = +req.query.page;
  const studentQuery = Student.find();
  let fetchedStudents;

  if(pageSize && currentPage){
    studentQuery
    .skip( pageSize * (currentPage - 1))
    .limit(pageSize);
  }


  studentQuery.then( documents => {
    fetchedStudent = documents;
    return Student.countDocuments();
  })
  .then(count =>{
    res.status(200).json({
      message: 'Succesfully sent from api',
      body: fetchedStudents,
      maxStudents: count
    });
  })
  .catch(error =>{
    res.status(500).json({
      message: "Fetching students failed!"
    });
  });



}

exports.getStudent = (req, res, next) =>{

  Student.findById(req.params.id).then(student =>{
    if(student){
      res.status(200).json(student);
    }
    else{
      res.status(404).json({
        message: "student not found"
      })
    }
  })
  .catch(error =>{
    res.status(500).json({
      message: "Fetching student failed!"
    });
  });
}

exports.deleteStudent = (req, res, next) => {

  Student.deleteOne({ _id: req.params.id}).then(result =>{

    if(result.n > 0){
      res.status(200).json({ message: 'Deletion successful'})
    }else{
      res.status(401).json({ message: 'Not Authorized'})
    }
  })
  .catch(error =>{
    res.status(500).json({
      message: "Deleting student failed!"
    });
  });

}