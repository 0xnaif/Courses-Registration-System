const router = require("express").Router();
const Operation = require("../controllers/controller");

router.get("/student_login", Operation.studentLogin);

router.post("/login", Operation.login)

router.get("/search_page", Operation.searchGet);
router.post("/search_page", Operation.searchPost);

router.get("/my_profile_page", Operation.profile);

router.get("/register_page", Operation.registerGet);
router.post("/register_page", Operation.registerPost);
router.get("/register_page/:id", Operation.add);

router.get("/", Operation.logOut);

router.delete("/delete/:id", Operation.delete)

router.get("/courses_history_page", Operation.coursesHistGet);
router.post("/courses_history_page", Operation.coursesHistPost);

router.get("/add_course", Operation.insert);

router.get("/add_section", Operation.insertSec);

router.get("/edit_section", Operation.edit);

router.get("/show_section", Operation.show);

router.get("/administrator_login_page", Operation.adminLogin);

module.exports = router;
