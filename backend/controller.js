const users = [
    {
        id : 1,
        name:'Prasad'
    },
    {
        id: 2,
        name: 'Ama'
    },
];

const getUsers = (cb) =>{
    cb(users)  //can callback
}

const getUsersId = (id,cb) => {
    const user  = users.find(user => user.id === id);
    cb(user);

};

exports.getUsers = getUsers;
exports.getUsersId = getUsersId;

