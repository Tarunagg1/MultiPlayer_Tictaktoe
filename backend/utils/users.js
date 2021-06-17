class User{
    initialState = ["", "", "", "", "", "", "", "", ""];

    constructor(){
        // console.log('koijuh');
        this.users = [];
        this.gameStates = {};
    }

    adduser(id,name,room,symbol,player,userid){
        let user = {id,name,room,symbol,player,userid};
        this.users.push(user)
        return user;
    }

    getUserList(room){
        let Users = this.users.filter((us) => us.room === room);
        let namesArray = Users.map((us)=> us.name);
        return namesArray;
    }

    getAllroomUser(){
        return this.users;
    }

    getAlldetailsByRoom(room){
        let Users = this.users.filter((us) => us.room === room);
        return Users;
    }

    getUser(id){
        return this.users.filter((us) => us.id === id)[0];
    }

    removeUser(id){
        let user = this.getUser(id);

        if(user){
            this.users = this.users.filter((us) => us.id !== id);
        }
        return user;
    }

    addBoard(room){
        this.gameStates = {...this.gameStates,[room]:this.initialState}
    }

    getGameBoardByRoom(roomid){
        return this.gameStates[roomid];
    }

    updateBoard(room,index,symbol){
        this.gameStates[room][index] = symbol;
        return this.gameStates[room];
    }
    
    // updateBoard(room,board){
    //     this.gameStates[room] = board;
    //     return this.gameStates[room];
    // }
    
}

module.exports = {User};