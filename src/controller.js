const { request, response } = require('express');
const pool = require('../db');
const queries = require('./queries');

const getUser = (request,response) =>{
    pool.query(queries.getUsers,(error,result)=>{
        if(error) throw error;

        response.status(200).json(result.rows);
    });
}

const addUser = (request,response) =>{
    const {username,password,role,date_of_birth,email} = request.body;
    console.log(request.body)
    pool.query(queries.checkUsername,[username],(error,result)=>{
        if(result.rows.length){
            response.send("USername already exist");
        }    
        else{
            pool.query(queries.checkEmail,[email],(error,result)=>{
                if(result.rows.length){
                    response.send("Email already exist")
                }else{        
                    pool.query(queries.addUser,[username,password,role,date_of_birth,email],(error,result)=>{
                        if(error){
                            response.send("Some values are empty")
                        }else{
                            response.status(201).send("successfully registered");
                        }
                    });
                }
            });
        }        
    });
}

const login = (request,response)=>{
    const {username,password} = request.body;

    pool.query(queries.isUserExist,[username,password],(error,result)=>{
        if(error) throw error;
        if(result.rows.length){
            const r = [
                {
                    user_id: result.rows[0].ui_id,
                    message:"success"
                }
            ]
            console.log(result.rows[0].ui_id)
            
            response.status(200).json(r);
        }else{
            response.send("Incorrect Email or password");
        }
    });
}

const createGroup = (request,response)=>{
    const {groupName,groupCode,adminId,groupDescription} = request.body;
    pool.query(queries.checkGroupExist,[groupName],(error,result)=>{
        if(result.rows.length){
            response.send("Group Name already Exist choose an different one");
        }else{        
            pool.query(queries.createGroup,[groupName,groupCode,adminId,groupDescription],(error,result)=>{
                response.status(200).send("Group Created");
            })
        }
    })
}

const getGroup = (request,response)=>{  
    pool.query(queries.getGroup,(error,result)=>{
        if(error) throw error;
        response.status(200).json(result.rows);
    })
}

const getMyGroups =(request,response)=>{
    const {user_id} = request.body;
    pool.query(queries.fetchMyGroup,[user_id],(error,result)=>{
        if(error) throw error;
        
        console.log(result);
        response.status(200).json(result.rows);
    })
}

const getJoinedGroups =(request,response)=>{
    const {user_id} = request.body;
    pool.query(queries.fetchJoinedGroup,[user_id],(error,result)=>{
        
        console.log(result)
        response.status(200).json(result.rows);
    })
}

const joinGroup =(request,response) =>{
    var {user_id,code,req_descript} = request.body;
    
    pool.query(queries.getGroupNameForJoin,[code],(error,result)=>{
        if(error){
            response.send("Incorrect Code")
        }else{
            console.log(result)
            var admin_id = result.rows[0].admin_id;
            var group_id = result.rows[0].grp_id;
            pool.query(queries.isMemberAlreadyRequest,[group_id,user_id],(error,result)=>{
                if(result.rows.length){
                    response.send("Alredy Request has been Sent")
                }else{
                    pool.query(queries.insertNotification,[group_id,user_id,admin_id,req_descript,"pending"])
                    response.status(200).send("request has sent");
                }
            })
        }        
    });
}

const getProfile = (request,response) =>{
    var {user_id} = request.body;
    pool.query(queries.getUserProfile,[user_id],(error,result)=>{
        console.log(result.rows);
        response.json(result.rows);
    })
}

const updateUserProfileDetail = (request,response) =>{
    var{user_id,bio,insta,linkedin} = request.body;
    pool.query(queries.insertUserProfile,[user_id,bio,insta,linkedin],(error,result)=>{
        if(error){
            response.send("already updated")
        }else{
            response.status(200).send("updated")
        }
        
    }) 
}

const getNotification =(request,response)=>{
    var {user_id} = request.body;
    pool.query(queries.getNotification,[user_id],(error,result)=>{
        if(error){
            response.send("No Notifications Found")
        }else{
            response.status(200).send(result.rows);
        }
    })
}

const cancelNotification = (request,response)=>{
    var{notify_id} = request.body;
    pool.query(queries.cancelNotification,[notify_id],(error,result)=>{
        response.send("Request Canceled")
    })
}
const acceptNotification = (request,response) =>{
    var{notify_id,grp_id,member_id} =request.body;
    pool.query(queries.acceptNotification,[notify_id])
    pool.query(queries.insertMember,[grp_id,member_id])
}

const getMembers = (request,response)=>{
    var{grp_id} = request.body;
    pool.query(queries.getMembers,[grp_id],(error,result)=>{
        console.log(result)
        response.send(result.rows);
    })
}

const insertTask = (request,response) =>{
    var {grp_id,task_name,task_details,assigned_by,assigned_to,deadline} = request.body;
    pool.query(queries.insertTask,[grp_id,task_name,task_details,assigned_by,assigned_to,deadline,'ToDo'],(error,result)=>{
        response.send("task created")
    })
}

const getAssignedTask = (request,response) =>{
    var{user_id} = request.body;
    pool.query(queries.getAssignedTask,[user_id],(error,result)=>{
        response.send(result.rows)
    })
}

const getMyTask = (request,response) =>{
    var{user_id} = request.body;
    pool.query(queries.getMyTask,[user_id],(error,result)=>{
        response.send(result.rows)
    })
}

const updateToDoToDoing = (request,response) =>{
    var{task_id} = request.body;
    pool.query(queries.updateToDoToDoing,[task_id],(error,result)=>{
        response.send("updated")
    })
}

const updateDoingToEscalate = (request,response) =>{
    var {task_id} = request.body;
    pool.query(queries.updateDoingToEscalate,[task_id],(error,result)=>{
        response.send("Task Escalated")
    })
}

const updateEscalateToDone = (request,response) =>{
    var {task_id} = request.body;
    pool.query(queries.updateEscalateToDone,[task_id],(error,result)=>{
        response.send("Task Done")
    })
}

const getTaskByGroups = (request,response) =>{
    var{grp_id} = request.body;
    pool.query(queries.getTaskByGroups,[grp_id],(error,result)=>{
        response.send(result.rows)
    })
}

const getMembersByGroup = (request,response) =>{
    var{grp_id} = request.body;
    pool.query(queries.getMembersOfTheGroup,[grp_id],(error,result)=>{
        response.send(result.rows)
    })
}

module.exports = {
    getUser,
    addUser,
    login,
    createGroup,
    getGroup,
    getMyGroups,
    getJoinedGroups,
    joinGroup,
    getProfile,
    updateUserProfileDetail,
    getNotification,
    cancelNotification,
    acceptNotification,
    getMembers,
    insertTask,
    getAssignedTask,
    getMyTask,
    updateToDoToDoing,
    updateDoingToEscalate,
    updateEscalateToDone,
    getTaskByGroups,
    getMembersByGroup,
    
}