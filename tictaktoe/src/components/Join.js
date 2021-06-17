import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
// import { genrateRandomid } from '../helper/tictactoe';
import {genrateRandomid} from '../helper/tictactoe'

export default function Join() {
    
  const [input, setInput] = useState({
    playername: "",
    roomname: genrateRandomid(),
    userid: ""
  });

  const history = useHistory();


  const handelInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const joinRoom = (e) => {
    e.preventDefault();
    if(!input.playername || !input.userid || !input.roomname){
      alert("All field required");
      return
    }
    sessionStorage.setItem("myuid", input.userid)
    history.push(`/game?name=${input.playername}&room=${input.roomname}`);
  }


    return (
        <div>
            <div id="second">
                <h2>FRIEND LIST</h2>
                <img
                    id="discord"
                    src="https://img.icons8.com/fluent/96/000000/discord-new-logo.png"
                    alt="okj"
                />
                <img
                    id="facebook"
                    src="https://img.icons8.com/officel/48/000000/facebook-circled.png"
                    alt="okj"
                />
            </div>

            <form onSubmit={joinRoom}>
                <div className="enter">
                    <input type="text" id="playername" value={input.playername} onChange={handelInput} name="playername" placeholder="Enter Display name" required />
                </div>
                <div className="enter">
                    <input type="text" id="name" value={input.roomname} onChange={handelInput} name="roomname" placeholder="Enter Room name" required />
                </div>
                <div className="enter">
                    <input type="text" id="userid" value={input.userid} onChange={handelInput} name="userid" placeholder="Enter userid" required />
                </div>
                <button type="submit">Join</button>
            </form>

        </div>
    )
}
