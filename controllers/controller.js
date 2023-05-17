const {Admin, Student, Course, Section, Stu_Sec} = require("../models/model");


module.exports = {
    studentLogin : (req, res) => {
        res.render("html/student_login", {ans: false});
    },

    login: async (req, res) => {
        Student.findOne({id: req.body.id, password: req.body.password})
        .then(e => {
            if (e !== null) {
                req.session.stu_id = req.body.id;
                req.session.save();
                res.render("html/my_profile_page", {info: e});
            }
            else {
                res.render("html/student_login", {ans: true})
            }
        })
        .catch(err => {
            res.sendStatus(403);
        });
        
    },

    searchGet: async (req, res) => {
        res.render("html/search_page", {courses: null});
   },

   searchPost: async (req, res) => {
    const term = req.body.term;
    const dept = req.body.dept;
    
    let query2 = null;
    if (term !== "none" && dept !== "none") {
        query2 = await Section.find({term: term, dept: dept});
        res.render("html/search_page", {courses: query2});
    }
    else 
        res.render("html/search_page", {courses: query2});
    },


    profile: async (req, res) => {
        const query = await Student.findOne({id: req.session.stu_id});
        res.render("html/my_profile_page", {info: query});
    },

    registerGet: async (req, res) => {
        let query = null;
        const sections = await Stu_Sec.find({term: 222});
        const query2 = await Student.findOne({id: req.session.stu_id});
        const term = req.session.term;
        const dept = req.session.dept;
        if (term !== undefined && dept !== undefined)
            if (term !== "none" && dept !== "none")
                query = await Section.find({term: term, dept: dept});
        res.render("html/register_page", {sections: query, secs: sections, stu_id: query2.id, stu_name: query2.name});
    },

    registerPost: async (req, res) => {
        const term = req.body.term;
        const dept = req.body.dept;
        req.session.term = term;
        req.session.dept = dept;
        req.session.save();
        
        const query = await Student.findOne({id: req.session.stu_id});
        if (term === "none" || dept === "none") 
            res.render("html/register_page", {sections: null, secs: null, stu_id: query.id, stu_name: query.name});
        else {
            const sections = await Stu_Sec.find({term: term});
            const query2 = await Section.find({term: term, dept: dept});
            res.render("html/register_page", {sections: query2, secs: sections, stu_id: query.id, stu_name: query.name});
        }
    },

    add: async (req, res) => {
        const sec_id = req.params.id;
        const sec = await Section.findOne({_id: sec_id});
        const term = sec.term;
        const dept = sec.dept;
        const query = await Student.findOne({id: req.session.stu_id});
        const query2 = await Section.find({term: term, dept: dept});
        const stu_sec = await Stu_Sec({
            student: req.session.stu_id, 
            sec: sec.sec,
            term: sec.term,
            c_abbr: sec.c_abbr,
            days: sec.days,
            time: sec.time,
            build: sec.build,
            room: sec.room,
            inst: sec.inst,
            status: sec.status,
            crn: sec.crn,
            dept: sec.dept,
            type: sec.type,
            c_name: sec.c_name
        });
        stu_sec.save();
        const sections = await Stu_Sec.find({term: term});
        res.redirect("/register_page");
    },

    delete: async (req, res) => {
        const id = req.params.id;
        await Stu_Sec.deleteOne({_id: id});
        res.redirect("/register_page");
    },

    coursesHistGet: async (req, res) => {
        const query2 = await Student.findOne({id: req.session.stu_id});
        res.render("html/courses_history_page", {courses: null, stu_name: query2.name});
    },
    
    coursesHistPost: async (req, res) => {
        const term = req.body.term;
        const query = await Stu_Sec.find({student: req.session.stu_id, term: term});
        const query2 = await Student.findOne({id: req.session.stu_id});
        res.render("html/courses_history_page", {courses: query, stu_name: query2.name});
    },

    insert: (req, res) => {
        res.render("html/add_course");
    },

    insertSec: (req, res) => {
        res.render("html/add_section");
    },

    edit: (req, res) => {
        res.render("html/edit_section");
    },

    show: (req, res) => {
        res.render("html/show_section");
    },

    adminLogin: (req, res) => {
        res.render("html/administrator_login_page");
    },

    logOut: async (req, res) => {
        req.session.term = undefined;
        req.session.dept = undefined;
        req.session.stu_id = undefined;
        res.redirect("student_login");
    }

};
