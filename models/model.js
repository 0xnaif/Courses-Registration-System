const mongoose = require("mongoose");

let admins_Schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String
    }
});

let students_Schema = new mongoose.Schema({
    name: String,
    id: String,
    password: String,
    standing: String,
    degree: String,
    level: String,
    program: String,
    college: String,
    Mjr_dpt: String
});

let courses_Schema = new mongoose.Schema({
    name: String,
    abbr: String,
    credit: Number,
    pre: String,
    co: String,
    dept: String
});

let sections_Schema = new mongoose.Schema({
    sec: Number,
    term: Number,
    c_abbr: String,
    dept: String,
    type: String,
    crn: Number,
    days: String,
    time: String,
    build: Number,
    room: Number,
    inst: String,
    status: String,
    c_name: String
});

let stu_sec_Schema = new mongoose.Schema({
    student: String,
    sec: Number,
    term: Number,
    c_abbr: String,
    days: String,
    time: String,
    build: Number,
    room: Number,
    inst: String,
    status: String,
    crn: Number,
    dept: String,
    type: String,
    c_name: String
});

const Admin = mongoose.model("admin", admins_Schema);
const Student = mongoose.model("student", students_Schema);
const Course = mongoose.model("course", courses_Schema);
const Section = mongoose.model("section", sections_Schema);
const Stu_Sec = mongoose.model("stu_sec", stu_sec_Schema);

module.exports = {Admin, Student, Course, Section, Stu_Sec};
