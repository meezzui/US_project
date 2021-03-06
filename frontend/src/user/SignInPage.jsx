import React, { useState,useEffect ,Component } from "react";

import { Link, BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
const Login = styled.div`
html{
    background: rgb(248, 250, 252);
}

input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }

.body{
    width: 50rem;
    padding: 2rem;
    position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
}
.logo{
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo img{
    width: 18rem;
}
.login_top input{
    border-radius: 12px;
    width: 49rem;
    height: 6rem;
    margin-bottom: 0.5rem;
    border: 1px solid lightgray;
    font-size:2rem;
    background-color: #fff;
    padding-left: 1rem;
}
.login_top input:hover{
    border: 1px solid mediumaquamarine;
}
button{
    border: 1px solid black;
    border-radius: 12px;
    cursor: pointer;
}
.login_btn2{
    display: flex;
    align-items: baseline;
        cursor: pointer;
}
.signup{
    background: #4fd1c5;
    width: 24.5rem;
    margin-right: 5px;
    color: white; 
    border:0; 
    font-size: 1.9rem;
    padding: 1.5rem 0;
    font-weight: 600;
}
.find{
    background: #4fd1c5;
    width: 24.5rem;
    color: white; 
    border:0; 
    margin-left:0.5rem;
    font-size: 1.9rem;
    padding: 1.5rem 0;
    font-weight: 600;
}
.login_btn_box{
    margin-top: 3rem;
}
.login_btn1 {
    border-radius: 15px;
    border:0; 
    background: #4fd1c5;
    width: 100%; 
    padding: 1.5rem 0; 
    font-size: 2rem; 
    color: white; 
    margin-bottom: 5px;
    font-weight: 600;
}
.login_btn1:disabled{ background: #dfdfdf; }
.forheigth{
    height:69px
}

.login-text{
    font-size:1.5rem;
}
.red{
    color:red;
    font-size:1.2rem;
    margin: 0;
}
`;

let emailDisable = false;
let passwordDisable = false;

const LoginPage = () => {
    const formRef = React.createRef();

    function onSubmit(event){
        
    }

    

    //?????????, ???????????? ??????
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [display, setDisplay] = useState("none")
    const [display2, setDisplay2] = useState("none")

    const changeDispaly = (display) => {
        setDisplay(display)
    }
    const changeDispaly2 = (display2) => {
        setDisplay2(display2)
    }
    var alltruecnt = 0;


    const checkEmail = (e) => {
        e.preventDefault();
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // ????????? ?????? ?????? true ??????
        console.log('????????? ????????? ?????? :: ', regExp.test(e.target.value))

        const inputId = e.target.value;
        setEmail(inputId);
        if (regExp.test(e.target.value) === false) {
            changeDispaly("block")
            emailDisable = false
        } else {
            changeDispaly("none")
            emailDisable = true
        }
        idDisabled()

    }

    //???????????? ????????? ??????
    const checkPassword = (e) => {
        e.preventDefault();
        //  8 ~ 10??? ??????, ?????? ??????
        var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        // ????????? ?????? ?????? true ??????
        console.log('???????????? ????????? ?????? :: ', regExp.test(e.target.value))
        const inputPw = e.target.value;
        setPassword(inputPw);
        if (regExp.test(e.target.value) === false) {
            changeDispaly2("block")
            passwordDisable = false

        } else {
            changeDispaly2("none")
            passwordDisable = true

        }
        idDisabled()
    }

    const [disabled, setDisabled] = React.useState('disabled');

    const idDisabled = () => {
        if (emailDisable === true && passwordDisable === true) {
            setDisabled('');
        } else {
            setDisabled('disabled');
        }
    }

    //axios
    //http://localhost:3001/member/login
    const onClickLogin = (e) => {
        e.preventDefault();

        axios.post('/member/login',null,{
            //params??? config??? ??????????????? ??????????????? null?????????!
            params: {
            'email': email,
            'userPw': password
            }
        })
        .then(res => {
            console.log(res)

            // ?????? ?????? ?????? ????????? ??????(????????????)
            if(res.data == false){
                alert("???????????? ??????????????? ???????????? ????????????.");
            } else{
                document.location.href = `/main/${res.data}?idx=${res.data}`
            }
        })
        .catch()
    }
    
    useEffect(() => {
        axios.get('/member/login')
            .then(res => console.log(res))
            .catch()
    }, [])

	// function getLocation() {
    //     if (navigator.geolocation) { // GPS??? ????????????
    //         navigator.geolocation.getCurrentPosition(function(position) {
    //             alert(position.coords.latitude + ' ' + position.coords.longitude);
    //         }, function(error) {
    //             console.error(error);
    //         }, {
    //             enableHighAccuracy: false,
    //             maximumAge: 0,
    //             timeout: Infinity
    //         });
    //     } else {
    //         alert('GPS??? ???????????? ????????????');
    //     }
    // }
    // getLocation();

    return (
        <Login>
            <div className="body">
                <div className="logo">
                    <img src="img/us_logo_forLogin.png"></img>
                </div>
                <div>
                    <form className="Login" ref={formRef} onSubmit={onSubmit}>
                        <div className="login_top">
                            {/* ????????? ????????? */}
                            <p className='login-text'>?????????</p>
                            <div className="forheigth">
                                <input id="email" value={email} onChange={checkEmail} placeholder="???????????? ??????????????????." />
                                <p className="red" style={{ display: display }}>* ????????? ????????? ??????????????????.</p>
                            </div>
                            {/* ???????????? ?????? */}
                            <p className='login-text'>????????????</p>
                            <div className="forheigth">
                                <input id="pw" value={password} onChange={checkPassword} placeholder="??????????????? ??????????????????." type="password" onKeyPress={(e)=>{if(e.key=='Enter'){onClickLogin(e)}}}/>
                                <p className="red" style={{ display: display2 }}>* ??????,??????,???????????? ?????? 8??? ?????? ??????????????????.</p>
                            </div>
                        </div>

                        <div className="login_btn_box">
                            {/* ??????????????? , ??????????????????*/}
                            
                                <button className="login_btn1" type="button" disabled={disabled} onClick={onClickLogin} >?????????</button>
                            
                        </div>

                        
                        {/* ???????????? ?????? ?????? -> /signup???????????? ?????? */}
                    </form>
                    <div className="login_btn2">
                            <Link to="/Regist1">
                                <button className="signup">
                                    ????????????
                                </button>
                            </Link>

                            <Link Link to="/FindIdPw">
                                <button className="find">?????????/???????????? ??????</button>
                            </Link>
                        </div>
                </div>
            </div>
        </Login>
    )
}
export default LoginPage;