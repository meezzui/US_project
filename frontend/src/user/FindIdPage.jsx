import React, { useState , useEffect ,Component } from "react";
import { Link,BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

const FindidpwStyled = styled.div`
    html{
        text-decoration:none;
        background-color: rgb(248, 250, 252);
    }
    .forheigth{ height:80px }
    .red{
        color:red;
        font-size:1.2rem;
        margin: 0;
    }
    *{ text-decoration:none; box-sizing: border-box; }
    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
    .body{
        width: 55rem;
        padding: 2rem;
        position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
    }
    .findtopnav {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .findComment{ margin: 3rem 0; }
    .findComment p{
        text-align: left;
        font-size: 2rem;
        color: #222;
        margin: 0;
        word-break : keep-all;
    }
    .findtopnav h2{
        color: #222;
        font-size: 3.5rem;
    }
    .phinput input{
        border: none;
        background-color: #fff;
        width: 100%;
        height: 6rem;
        color: black;
        margin-bottom: 1rem;
        font-size: 2rem;
        border: 1px solid lightgray;
        border-radius: 12px;
        padding-left: 1rem;
        font-size:1.5rem;
    }
    .finregi { margin-top: 1rem;}
    .finregi button{
        display: flex;
        padding: 1.5rem 0;
        font-size: 1.9rem;
        font-weight: bolder;
        color: white;
        width: 100%;
        border-radius: 15px;
        border: 0;
        background: #4fd1c5;
        justify-content: center;
        margin-top: 0.5rem;
        cursor: pointer;
    }
    .finregi button:disabled{ background: #dfdfdf; }
    .ph{ font-size:1.5rem; }
    `;

let hpDisable = false;
const Findidpw = () => {    
    const formRef = React.createRef();
    //??????????????? ??????
    const [display4 ,setDisplay4] = useState("none")
    const [handp ,setHandp] = React.useState('');

    //??????????????? ????????? ??????
    const changeDispaly4 = (display4) => {
        setDisplay4(display4)
    }

     //??????????????? ????????? ??????
    const checkPh = (e) => {
        e.preventDefault();
        const regExp = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
        const ph = e.target.value;
        setHandp(ph)
        if (!regExp.test(ph)) {
            changeDispaly4("block")
            hpDisable = false
        } else {
            changeDispaly4("none")
            hpDisable = true
        }
        idDisabled()
    }
    //?????? ?????????
    const [disabled, setDisabled ] = React.useState('disabled');
    const idDisabled = () => {
        if(hpDisable===true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }
    //axios
    //http://localhost:3001/member/login
    const searchEmail = (e) => {
        e.preventDefault();

        axios.post('/member/findId',null,{
            //params??? config??? ??????????????? ??????????????? null?????????!
            params: {
            'tel': handp
            }
        })
        .then(res => {
            if(res.data == false){
                alert("???????????? ?????? ???????????? ?????????")
            }else{
                window.location.href="/SuckFindId/"+ res.data
            }
        })
        .catch()
    }
    return (
        <FindidpwStyled>
            <div className="body">
                <div className="findtopnav">
                    <h2>????????? ??????</h2>
                    <hr/>
                    <div className="findComment">
                        <p>?????? ??? ????????? ????????? ????????? ????????????
                        ????????? ????????? ????????? ??????????????????.</p>
                    </div>
                </div>
                <form className="findemail" ref={formRef}>
                    <div className="ph">
                        <p>????????? ??????</p>
                        <div className="phinput forheigth">
                        <input type="text"   id="phInput" value={handp} onChange={checkPh} placeholder="?????????????????? ??????????????????."/>
                        <p className="red"  style={{display:display4}}>* ??????????????? ?????? ????????? ?????????. ('-'??????)</p>  
                        </div>
                    </div>
                    <div className="finregi">
                        <button className="activebtn" type="button" disabled={disabled} onClick={searchEmail}>????????? ??????</button>
                    </div>    
                </form>
            </div>
        </FindidpwStyled>
    )
}
    
export default Findidpw;