import React, { useState, useEffect } from 'react';
import { IonIcon } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { close, ellipseOutline } from "ionicons/icons";
import { patterns } from './rule';
import './game.css';
import queryString from 'query-string';
import io from 'socket.io-client';

const ENDPOINT = "localhost:8000"
let socket;

export default function Game({ location }) {
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [Player, setPlayer] = useState("X");
    const [Result, setResult] = useState({ Winner: "none", state: "none" });
    const [ZeroCut, setZeroCut] = useState([close, ellipseOutline]);
    const [Roomid, setRoomid] = useState(null);
    const [users, setusers] = useState(null);
    const [myuserId, setmyuserId] = useState(null);
    const [IsgameStarted, setIsgameStarted] = useState(false);
    const [MyuserObj, setMyuserObj] = useState(null);

    const history = useHistory();

    useEffect(() => {
        checkWin();
        checkTie();

        if (Player == "X") {
            setPlayer("O");
        } else {
            setPlayer("X");
        }
    }, [board]);


    useEffect(() => {
        if (Result.state !== "none") {
            alert(Result.state);
        }
    }, [Result]);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        const uid = sessionStorage.getItem("myuid");

        if (!name || !room || !uid) {
            history.push('/')
        }

        socket = io(ENDPOINT);
        setRoomid(room)
        setmyuserId(uid)


        socket.emit('isgamevalid', { roomname: room }, (callback) => {
            console.log('i');
            if (callback.length > 0) {
                // console.log(callback);
                setusers(callback);
                setIsgameStarted(true)
                callback.map((ele) => {
                    if (ele.userid === uid) {
                        setMyuserObj(ele)
                    }
                })
                socket.emit('getGameBoard', { roomname: room }, (callback) => {
                    console.log(callback);
                    setBoard(callback)
                })
            } else {
                socket.emit('join', { playername: name, roomname: room, userid: uid }, (error) => {
                    if (error) {
                        console.error(error);
                        // alert(error);
                    }
                });

                socket.on('gameStarted', (userlist) => {
                    console.log('ame star');
                    setusers(userlist);

                    userlist.map((ele) => {
                        if (ele.userid === uid) {
                            setMyuserObj(ele)
                        }
                    })

                    socket.emit('getGameBoard', { roomname: room }, (callback) => {
                        setBoard(callback)
                    })

                    setIsgameStarted(true)
                })
            }
        })



        socket.on('getNewupdatedboard', ({ newboard }) => {
            setBoard(newboard)
        });

    }, []);


    function checkWin() {
        patterns.forEach((currpattern) => {
            const firstplayer = board[currpattern[0]];
            if (firstplayer === "") return;
            let foundWinningPattern = true;
            currpattern.forEach((idx) => {
                if (board[idx] !== firstplayer) {
                    foundWinningPattern = false;
                }
            });
            if (foundWinningPattern) {
                setResult({ Winner: Player, state: "won" });
            }
        });
    }

    function restartGame() {
        console.log("pokiju");
        setBoard(["", "", "", "", "", "", "", "", ""]);
        console.log(board);
        setPlayer("O");
    }

    function checkTie() {
        let filled = true;

        board.forEach((square) => {
            if (square === "") {
                filled = false;
            }
        });

        if (filled) {
            setResult({ Winner: "No one", state: "tie" });
        }
    }

    function hadelClick(square: any) {
        if (board[square] !== "") {
            return;
        }

        console.log(Player,MyuserObj);

        if (Player !== MyuserObj.symbol) {
            alert("Not your turn")
            return;
        }


        const data = {
            roomname: Roomid,
            index: square,
            symbol: Player
        }

        socket.emit('updateboard', (data), () => { });

    }
    return (
        <>
            <div>
                {
                    IsgameStarted ? (
                        <>
                            {users && users[0].userid ? (
                                <div className="statgrid">
                                    <h1>
                                        You {users[0].userid === myuserId ? users[0].symbol : users[1].symbol}
                                    </h1>
                                    <h1>
                                        {Player} Turn
                                    </h1>

                                    <h1>
                                        Player {users[0].userid !== myuserId ? <span>{users[0].name} {users[0].symbol}</span> : <span>{users[1].name} {users[1].symbol}</span>}
                                    </h1>
                                </div>
                            ) : ""}

                            <div className="grid-container board">
                                {board.map((squ, i) => (
                                    <div
                                        key={i}
                                        onClick={() => hadelClick(i)}
                                        className={`grid-item m${squ}`}
                                    >
                                        <IonIcon
                                            slot="icon-only"
                                            className="iconclass"
                                            icon={squ ? ZeroCut[squ === "X" ? 0 : 1] : ""}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (<h1>Waiting for another player......</h1>)
                }
            </div>
        </>
    )
}
