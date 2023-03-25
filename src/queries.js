const getUsers = "SELECT * FROM user_tb";
const addUser = "INSERT INTO user_tb(username,password,role,date_of_birth,email) VALUES($1,$2,$3,$4,$5);"
const checkEmail = "SELECT email FROM user_tb WHERE email=$1";
const checkUsername = "SELECT username FROM user_tb WHERE username=$1";
const isUserExist = "SELECT ui_id,username, password FROM user_tb WHERE username = $1 AND  password = $2";
const createGroup = "INSERT INTO group_tb_admin(grp_name,grp_code,admin_id,grp_description) VALUES($1,$2,$3,$4)";
const checkGroupExist = "SELECT * FROM group_tb_admin WHERE grp_name = $1";
const getGroup = "SELECT * FROM group_tb_admin";
const fetchMyGroup = "SELECT * FROM group_tb_admin WHERE admin_id = $1";
const fetchJoinedGroup = "SELECT G.grp_id,G.grp_name,G.grp_name,G.admin_id,G.grp_description,M.memeber_id FROM group_tb_admin G JOIN group_members_tb M on G.grp_id = M.grp_id WHERE M.memeber_id = $1";
const getGroupNameForJoin = "SELECT grp_id,admin_id FROM group_tb_admin WHERE grp_code = $1";
const insertNotification="INSERT INTO group_request(grp_id,member_id,admin_id,request_des,state) VALUES($1,$2,$3,$4,$5)";
const getUserProfile ="SELECT U.username,P.bio,P.insta_link,P.linkedin FROM user_tb U JOIN user_profile_details P on U.ui_id = P.u_id WHERE P.u_id = $1;";
const insertUserProfile = "INSERT INTO user_profile_details(u_id,bio,insta_link,linkedin) VALUES($1,$2,$3,$4)"
const isMemberAlreadyRequest = "SELECT * FROM group_request WHERE grp_id = $1 AND member_id = $2";
const getNotification = "SELECT N.nofity_id,N.grp_id,G.grp_name,N.member_id,U.username,N.request_des,N.state FROM user_tb U JOIN group_request N on N.member_id = U.ui_id JOIN group_tb_admin G on N.grp_id = G.grp_id WHERE N.admin_id = $1 AND N.state = 'pending'"
const cancelNotification = "DELETE FROM group_request WHERE nofity_id = $1";
const acceptNotification = "UPDATE group_request SET state = 'accepted' WHERE nofity_id = $1";
const insertMember = "INSERT INTO group_members_tb(grp_id,memeber_id) VALUES($1,$2)"
const getMembers = " SELECT M.memeber_id, U.username, M.grp_id FROM group_members_tb M JOIN user_tb U ON M.memeber_id = U.ui_id WHERE M.grp_id = $1";
const insertTask = "INSERT INTO task_general(grp_id,task_name,task_details,assigned_by,assigned_to,deadline,state) VALUES($1,$2,$3,$4,$5,$6,$7)"
const getAssignedTask = "SELECT T.task_id, T.grp_id,G.grp_name,T.task_name,T.task_details,T.assigned_by,T.assigned_to,U.username,T.deadline,T.state FROM task_general T JOIN user_tb U ON U.ui_id = T.assigned_to JOIN group_tb_admin G ON G.grp_id = T.grp_id WHERE T.assigned_by = $1";
const getMyTask = "SELECT T.task_id, T.grp_id,G.grp_name,T.task_name,T.task_details,T.assigned_by,T.assigned_to,U.username,T.deadline,T.state FROM task_general T JOIN user_tb U ON U.ui_id = T.assigned_by JOIN group_tb_admin G ON G.grp_id = T.grp_id WHERE T.assigned_to = $1";
const updateToDoToDoing = "UPDATE task_general SET state = 'Doing' WHERE task_id = $1";

module.exports = {
    getUsers,   
    addUser,
    checkEmail,
    checkUsername,
    isUserExist,
    createGroup,
    checkGroupExist,
    getGroup,
    fetchMyGroup,
    fetchJoinedGroup,
    getGroupNameForJoin,
    insertNotification,
    getUserProfile,
    insertUserProfile,
    isMemberAlreadyRequest,
    getNotification,
    cancelNotification,
    acceptNotification,
    insertMember,
    getMembers,
    insertTask,
    getAssignedTask,
    getMyTask,
    updateToDoToDoing,
}