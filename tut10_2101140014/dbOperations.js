const { MongoClient } = require('mongodb');

const DATABASE_NAME = 'school';
const MONGO_URL = `mongodb://localhost:27017/`;

let db = null;
let stdCollection = null;
let crsCollection = null;

//Connect DBS
async function connectDB() {
    try {
        const client = await MongoClient.connect(MONGO_URL);
        db = client.db(DATABASE_NAME);
        stdCollection = db.collection('students');
        crsCollection = db.collection('courses');
        console.log("Connected to the database");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

// Query all students
async function queryStudents() {
    const query = {};
    const students = await stdCollection.find(query).toArray();
    console.log('Students:', students);
}

// Query all courses
async function queryCourses() {
    const query = {};
    const courses = await crsCollection.find(query).toArray();
    console.log('Courses:', courses);
}

//Query a student
async function queryStudent(stdName){
    const query = {
        name: stdName
    }

    const user = await stdCollection.findOne(query);

    if(user){
        return user
    } else {
        console.log("No user")
        return
    } 
}

//Query a course
async function queryCourse(courseName){

    const query = {
        course_name: courseName
    }

    const course = await crsCollection.findOne(query);

    if(course){
        return course
    } else {
        console.log("No course")
        return
    } 
}

//Modify student profile
async function updateStudent(stdName, mdfObject) {
    const params = { upsert: true};

    const query = {
        name: stdName
    }

    const updates = {
        $set: mdfObject
    }

    const result = await stdCollection.updateOne(
        query, updates, params
    );

    if (result.upsertedCount > 0) {
        console.log(`New student updated: ${stdName}`)
    } else {
        console.log(`Updated ${stdName} profile`)
    }

}

//Delete student prodile
async function deleteStudentPrf(stdName){
    const query = {
        name: stdName
    }

    const result = await stdCollection.deleteOne(query);

    console.log(`${stdName} has been deleted.`)

    console.log(`${result.deletedCount} student(s) deleted`)
}

//Delete all course profile
async function clearCourseProfile(){
    const result = await crsCollection.deleteMany({});
    console.log("Collection courses had beed cleared")
}

//Advanced Querying
async function queryStudentsOlderThan(ageLimit) {
    const query = { age: { $gt: ageLimit } };
    const students = await stdCollection.find(query).toArray();
    console.log(`Students older than ${ageLimit}:`, students);
    return students;
}

async function queryStudentsByMajor(majorName) {
    const query = { major: majorName };
    const students = await stdCollection.find(query).toArray();
    console.log(`Students majoring in ${majorName}:`, students);
    return students;
}

//Sorting and Limit
async function queryStudentsSortedAndLimited(limitCount = 2) {
    const students = await stdCollection.find({})
        .sort({ age: 1 })
        .limit(limitCount)
        .toArray();
    
    console.log(`Top ${limitCount} youngest students (sorted by age ascending):`, students);
    return students;
}


//Export
module.exports = {
    connectDB,
    queryStudents,
    queryCourses,
    queryStudent,
    queryCourse,
    updateStudent,
    deleteStudentPrf,
    clearCourseProfile,
    queryStudentsOlderThan,
    queryStudentsByMajor,
    queryStudentsSortedAndLimited
};