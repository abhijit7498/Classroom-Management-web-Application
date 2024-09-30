require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbconnection = require('./Dbconnection/DB connection');
const jwt = require('jsonwebtoken')
const upload = require('./Middleware/Multer'); // Multer middleware
const Timetables = require('./Modules/Timetables');
const Principal = require('./Modules/Principal');
const Teachers = require('./Modules/Teachers');
const Students = require('./Modules/Students');
const Notes = require('./Modules/Notes');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use('/Files', express.static('NotesData'));

app.use(express.json()); // Parse JSON payloads

// MongoDB connection
dbconnection();

// Route to handle POST request
app.post('/CreateTimetable', async (req, res) => {
    const { Classinfo, Timetable } = req.body;
    if (!Classinfo.Classname && !Classinfo.Division) {
        res.json({ message: 'Classname And Division is required' });
    }
    // Validate the required fields
    else if (!Classinfo.Classname) {
        res.json({ message: 'Classname is required' });
    }
    else if (!Classinfo.Division) {
        res.json({ message: 'Division is required' });
    }else{
    try {
        // Check if a timetable already exists for the class and division
        const existingTimetable = await Timetables.findOne({
            'Classinfo.Classname': Classinfo.Classname,
            'Classinfo.Division': Classinfo.Division
        });

        if (existingTimetable) {
            return res.json({ message: 'Timetable already exists' });
        }

        // Create new timetable
        const newTimetable = new Timetables({
            Classinfo,
            Timetable,

        });

        await newTimetable.save();
        res.json({ message: 'Timetable saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the timetable' });
    }
}});


app.post('/FindTimetable', async (req, res) => {
    const { Classname, Division } = req.body.FindTable;

    // Find matching timetable in the database
    const timetable = await Timetables.findOne({
        'Classinfo.Classname': Classname,
        'Classinfo.Division': Division,
    });

    if (timetable) {
        res.json(timetable);
    } else {
        res.json({ message: 'Timetable not found' });
    }
});


app.post('/PrincipalLogin', async (req, res) => {
    const { Username, Password } = req.body; // Get the username and password from the request body
    try{
    // Find the user with the given Username and Password
    let principal = await Principal.findOne({ Username });

    // Check if the user exists
    if (principal) {
        // Validate the password
        if (Password === principal.Password) {
            const token = jwt.sign({ Username: Principal.Username, role: 'principal' }, JWT_SECRET, { expiresIn: '1h' })
            return res.json({ message: "User authenticated successfully", token });
        } else {
            return res.send("Invalid Password"); // 401 Unauthorized
        }
    } else {
         return res.send("User does not exist"); // 404 Not Found
    }
    }catch(err){
        console.log(err)
    }


})

app.post('/Update', async (req, res) => {
    const { id, timetable } = await req.body;

    try {
        // Find the timetable document by ID and update it with the new data
        const updatedTimetable = await Timetables.findByIdAndUpdate(
            id,
            {
                Classinfo: timetable.Classinfo,
                Timetable: timetable.Timetable,
            },
            { new: true } // Option to return the modified document
        );
        console.log(updatedTimetable)
    } catch (err) {
        console.log(err);
    }
})
app.post('/Deletetable', async (req, res) => {

    const { timetable } = req.body;

    let status = await Timetables.deleteOne(timetable);
        return res.send("Timetable Deleted")
})

app.post('/CreateTeacherId', async (req, res) => {
    const { Username, Password } = req.body;
    const User = await Teachers.findOne({ Username });
    if (User) {
        res.send("User Already Exist")
    } else {
        await Teachers.create({
            Username,
            Password
        })
        res.send("User Created")
    }
})

app.post('/Teacherlogin', async (req, res) => {
    const { Username, Password } = req.body;
    const User = await Teachers.findOne({ Username: Username })
    if (User) {
        if (User.Password === Password) {
            const token = jwt.sign({ Username: Teachers.Username, role: 'teacher' }, JWT_SECRET, { expiresIn: '1h' })
            res.json({ message: "User Exist", token });
        } else {
            res.send("Invalid Password")
        }
    } else {
        res.send("Invalid Username")
    }

})

app.post('/CreateStudentId', async (req, res) => {
    const { Username, Password, Classname, Division, StudentId } = req.body;
    try {
        const CheakUser = await Students.findOne({ Username });
        if (CheakUser) {
            return res.send("User Exist")
        } else {
            await Students.create({
                Username,
                Password,
                Classname,
                Division,
                StudentId
            })
            return res.send("User Created")
        }
    } catch (err) {
        console.log(err)
    }

})

app.post('/ProvideNotes', upload.single('file'), async (req, res) => {
    const { Classname, Division, Subject, Textinfo, Title } = req.body;
    const newNotes = new Notes({
        Classname,
        Division,
        Subject,
        Textinfo,
        Title,
        pdf: req.file ? req.file.filename : null // Store the file name in MongoDB
    });

    let response = await newNotes.save();
    if(response){
        return res.json("Upload True")

    }
});


app.post('/StudentValidation', async (req, res) => {
    try {
        const { Username, Password } = req.body;
        const Cheakuser = await Students.findOne({ Username: Username })
        if (Cheakuser) {
            if (Cheakuser.Password === Password) {
                const token = jwt.sign({ Username: Students.Username, role: 'student' }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ message: "User True", token })
            } else {
                res.send("Invalid Password")
            }
        } else {
            res.send("User False")
        }
    } catch (err) {
        console.log(err)
    }

})


app.get('/Findtable', async (req, res) => {
    try {
        // Query to get all class names and divisions
        const classes = await Timetables.find({}, { "Classinfo.Classname": 1, "Classinfo.Division": 1 });
        res.json(classes); // Send the response in JSON format
    } catch (err) {
        console.error('Error retrieving classes and divisions:', err);
        res.status(500).send('Internal server error');
    }
});

// to send notes to the student
app.post('/getNotes', async (req, res) => {
    const username=req.body.Username;
    const Studentdata=await Students.findOne({Username:username})
    const notes=await Notes.find({Classname:Studentdata.Classname,Division:Studentdata.Division})
    res.send({ status: "ok", data: notes })
})

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
