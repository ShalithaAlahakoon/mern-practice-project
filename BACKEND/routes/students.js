const router = require('express').Router();
let Student = require('../models/Student');

// Add Student
router.route("/add").post((req, res) => {

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.age;

    let student = new Student({
        name,
        age,
        gender
    });

    student.save()
        .then(() => {
            res.status(200).json({ 'student': 'student added successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('adding new student failed');
        });
});

// Get all Students
router.route("/").get((req, res) => {
    Student.find((err, students) => {
        if (err) {
            console.log(err);
        } else {
            res.json(students);
        }
    });
});

// Get one Student
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    await Student.findById(userId)
        .then((student) => {
            res.status(200).send({ status: "User fetched successfully", student });
        })
        .catch((err) => {
            res.status(400).send({ status: "User not found", err });
        });
});

// Update Student with async await
router.route("/update/:id").put(
    async (req, res) => {
        let userId = req.params.id;
        /*
        old method

        const name = req.body.name;
        const age = Number(req.body.age);
        const gender = req.body.gender;
        */

        //new method - d structure
        const { name, age, gender } = req.body;

        const updateStudent = {
            name,
            age,
            gender
        }

        //updating 
        await Student.findByIdAndUpdate(userId, updateStudent)
            .then(() => {
                res.status(200).send({ status: "User updated", updateStudent });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ status: "User not updated", error: err.message });
            });

    }

);

// Delete Student
router.route("/delete/:id").delete(async (req, res) => {

    let usrId = req.params.id;

    await Student.findByIdAndDelete(usrId)
        .then(() => {
            res.status(200).send({ status: "User deleted" });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ status: "User not deleted" });
        });
});


module.exports = router;
