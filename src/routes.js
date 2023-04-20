const {Router} = require("express");
const controller = require("./controller");
const router = Router();

router.get("/user/",controller.getUser);
router.post("/user/",controller.addUser);
router.post("/user/login",controller.login);
router.post("/user/profile",controller.getProfile);
router.post("/group/create",controller.createGroup);
router.post("/group/join",controller.joinGroup);
router.post("/userprofiledetails",controller.updateUserProfileDetail);
router.get("/group/",controller.getGroup);
router.post("/group/mygroups",controller.getMyGroups);
router.post("/group/joinedgroups",controller.getJoinedGroups);
router.post("/group/notification",controller.getNotification);
router.post("/group/notification/cancel",controller.cancelNotification);
router.post("/group/notification/accept",controller.acceptNotification);
router.post("/group/members",controller.getMembers);
router.post("/group/assigntask",controller.insertTask);
router.post("/group/getassignedtask",controller.getAssignedTask);
router.post("/group/getmytask",controller.getMyTask);
router.post("/group/getmytask/todo",controller.updateToDoToDoing);
router.post("/group/getmytask/Doing",controller.updateDoingToEscalate);
router.post("/group/getmytask/Done",controller.updateEscalateToDone);
router.post("/group/group/task",controller.getTaskByGroups);
router.post("/group/group/members",controller.getMembersByGroup);

module.exports = router;