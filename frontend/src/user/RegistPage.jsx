import React, { useState, Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import { useEffect } from "react";
import axios from 'axios';

const Regi1 = styled.div`
html{
    background: rgb(248, 250, 252);
}

    input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }

    input[type="checkbox"] { -webkit-appearance: auto; }

    .body{
        width: 50rem;
        padding: 2rem;
        position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);
    }
    .topNum{
        display: flex;
        justify-content: center;
        align-items: center;
    
    }
    .topNum img{
        width: 18rem;
    }
    .topnav h2 {
        color: #4c4c4c;
        text-align: center;
    }
    
    .forregi {
        display: flex;
        flex-direction: column;
        margin-top: 4rem;
    }
    .forregi input{
        background-color: #F8FAFC;
        border-bottom: 1px solid lightgray;
        height: 5rem;
        color: #222;
        border-left: none;
        border-right: none;
        margin-bottom: 1rem;
        font-size: 2rem;
        width:100%
    }

    .checkbtn input{
        position: relative;
        bottom:-0.4rem;
        height: 2rem;
        width: auto;
        margin-bottom: 0;
        margin-right: 1rem;
    }

    .checkbtn span{
        color: blue;
        font-weight: bold;
        
    }

    .activebtn button{
        padding: 1.5rem 0; 
        font-size: 1.9rem; 
        font-weight: bold;
        color: white; 
        width: 100%; 
        margin: 3.5rem 0 0;
        border-radius: 15px;
        border:0; 
            background: #4fd1c5;
        cursor: pointer;
    }
    .activebtn button:disabled{ background: #dfdfdf; }

    

    .red{
        color:red;
        font-size:1.2rem;
        margin: 0;
    }

    .checkbtn p{
    font-size: 15px;
    position: relative;
    top: -7px;
    left: -4px;
    z-index: 10;
    }
    
    .forheigth{
        height:75px
    }
    .checkinput{
        border: 1px red
    }
    .checkimg{
        position: relative;
        top: 6px;
    }
    input[id="check"] {
        display: none;
    }
    input[id="check2"] {
        display: none;
    }
    select { width: 200px; /* ????????? ???????????? */ padding: .8em .5em; /* ???????????? ?????? ?????? */ font-family: inherit; /* ?????? ?????? */ background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg) no-repeat 95% 50%; /* ???????????? ????????? ?????? */ border: 1px solid lightgray; border-radius: 0px; /* iOS ??????????????? ?????? */ -webkit-appearance: none; /* ???????????? ?????? ????????? */ -moz-appearance: none; appearance: none; }
    input[type=checkbox]{height: 0;width: 0;visibility: hidden;}
    label {cursor: pointer;text-indent: -9999px;width: 45px;height: 28px;background: grey;display: block;border-radius: 100px;position: relative; top: -3px; margin-right: 8px;}
    label:after {content: '';position: absolute;top: 5px;left: 5px;width: 19px;height: 19px;background: #fff;border-radius: 90px;transition: 0.3s;}
    input:checked + label {background: #4fd1c5;}
    input:checked + label:after {left: calc(100% - 5px);transform: translateX(-100%);}
    label:active:after {width: 45px;}
    .checkbtn p {
        display:flex;
    }
    `;
    let emailDisable = false;
    let passwordDisable = false;
    let nameDisable = false;
    let hpDisable = false;
    let btnDisable =false;
    let btn2Disable =false;
const RegistPage1 = () => {

    const formRef = React.createRef();
    const inputRef = React.createRef();

    //?????????, ???????????? ??????
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name,setName] = React.useState('')
    const [hp,setHp] = React.useState('')
    const [gender,setGender] = React.useState('???')
    const [checkbox1,setCheckBox1] = React.useState('')
    const [checkbox2,setCheckBox2] = React.useState('')
    const [checkedInputs, setCheckedInputs] = useState([]);
    const [checkedInputs2, setCheckedInputs2] = useState([]);

    // ???????????? ??????
    const [random, setRandom] = useState('');

    //??????????????? ?????????
    const [display, setDisplay] = useState("none")
    const [display2, setDisplay2] = useState("none")
    const [display3, setDisplay3] = useState("none")
    const [display4, setDisplay4] = useState("none")

    useEffect (()=>{
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
        const stringLength = 6
        let randomstring = ''
        for (let i = 0; i < stringLength; i++) {
            const rnum = Math.floor(Math.random() * chars.length)
            randomstring += chars.substring(rnum, rnum + 1)
        }
        console.log(randomstring);
        setRandom(randomstring);
        console.log("?????? : " + random)
    },[])
    
    
    const changeDispaly = (display) => {
        setDisplay(display)
    }
    const changeDispaly2 = (display2) => {
        setDisplay2(display2)
    }
    const changeDispaly3 = (display3) => {
        setDisplay3(display3)
    }
    const changeDispaly4 = (display4) => {
        setDisplay4(display4)
    }
    const changeGender = (gender) => {
        setGender(gender)
    }
    //????????? ??????
    const checkEmail = (e) => {
        e.preventDefault();

        var text = document.getElementById('email').value;

        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // ????????? ?????? ?????? true ??????
        const emailV = e.target.value;
        setEmail(emailV)

        if (regExp.test(e.target.value) === false) {
            changeDispaly("block")
            emailDisable = false
        } else {
            changeDispaly("none")
            emailDisable = true
        }
        idDisabled()

    }

    ///???????????? ????????? ??????
    const checkPassword = (e) => {
        e.preventDefault();
        //  8 ~ 10??? ??????, ?????? ??????
        var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        // ????????? ?????? ?????? true ??????
        const pwV = e.target.value;
        setPassword(pwV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly2("block")
            
            passwordDisable = false
        } else {
            changeDispaly2("none")
            passwordDisable = true
        }
        idDisabled()

    }

    //???????????? ????????? ??????
    const checkName = (e) => {
        e.preventDefault();
        var regExp = /^[???-???]{2,15}$/;
        const pwV = e.target.value;
        setName(pwV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly3("block")
            nameDisable = false
        } else {
            changeDispaly3("none")
            nameDisable = true
        }
        idDisabled()

    }

    //??????????????? ????????? ??????
    const checkPh = (e) => {
        e.preventDefault();
        var regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        const pwV = e.target.value;
        setHp(pwV)
        if (regExp.test(e.target.value) === false) {
            changeDispaly4("block")
            hpDisable = false
        } else {
            changeDispaly4("none")
            hpDisable = true
        }
        idDisabled()

    }

    const changeHandler = (checked, id) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, id]);
            console.log("?????? ?????? ??????");
            btnDisable = true;
            setCheckBox1("Y")

        } else {
            setCheckedInputs(checkedInputs.filter(el => el !== id));
            console.log("?????? ?????? ?????? ??????");
            btnDisable = false;
            setCheckBox1("N")

        }
        idDisabled()
    };

    const changeHandler2 = (checked2, id2) => {
        if (checked2) {
            setCheckedInputs2([...checkedInputs2, id2]);
            console.log("?????? ?????? ??????");
            setCheckBox2("Y")
            btn2Disable = true;

        } else {
            setCheckedInputs2(checkedInputs2.filter(el => el !== id2));
            console.log("?????? ?????? ?????? ??????");
            setCheckBox2("N")
            btn2Disable = false;

        }
        idDisabled()
    };

    const checkGender = (e) => {
        e.preventDefault();

        console.log(e.target.value)
        if(e.target.value == 1){
            changeGender("???")
        }else{
            changeGender("???")
        }
    }
    //???????????????
    const [disabled, setDisabled ] = React.useState('disabled');

    const idDisabled = () => {
        if(emailDisable===true&&passwordDisable===true&&nameDisable===true&&hpDisable===true&&btnDisable===true&&btn2Disable==true){
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }



    // axios ??????
    const goRegist = async () => {
        let ag1 = "Y";
        let ag2 = "Y";
        let log = await axios.post('http://localhost:3001/member/regist?email='+email+"&userPw="+password+"&name="+name+"&tel="+hp+"&gender="+gender+"&code="+random+"&agreement1="+ag1+"&agreement2="+ag2)
        if(log.data===true){
            alert('??????????????? ?????????????????????. ????????? ??????????????? ????????? ????????????!')
            window.location.href="/"
        }else{
            alert('???????????? ????????? ????????? ???????????????. ?????? ????????? ?????????!')
        }
    }
    return (
        <Regi1>
            <div className="body">
                <div className="topnav">
                    <div className="topNum">
                    <img src="img/us_logo_forLogin.png"></img>
                    </div>
                    <h2>US ??? ?????? ?????? ?????? ???????????????</h2>
                </div>

                <form className="forregi" ref={formRef}>
                    <div className="forheigth">
                        <input id="email" onChange={checkEmail} placeholder="???????????? ??????????????????." />
                        <p className="red" style={{ display: display }}>* ????????? ????????? ??????????????????.</p>
                    </div>
                    <div className="forheigth">
                        <input id="pw" onChange={checkPassword} placeholder="??????????????? ??????????????????." type="password" />
                        <p className="red" style={{ display: display2 }}>* ??????,??????,???????????? ?????? 8??? ?????? ??????????????????.</p>
                    </div>
                    <div className="forheigth">
                        <input id="koreaName" onChange={checkName} placeholder="????????? ??????????????????." />
                        <p className="red" style={{ display: display3 }}>* ?????? 2?????? ?????? ??????????????????.</p>
                    </div>
                    <div className="forheigth">
                        <input id="ph" onChange={checkPh} placeholder="?????????????????? ??????????????????." />
                        <p className="red" style={{ display: display4 }}>* ??????????????? ?????? ????????? ?????????. ('-'??????)</p>
                    </div>
                    <div>
                    <select className="choiceGender" onChange={checkGender}>
                        <option value="1">??????</option>
                        <option value="2">??????</option>
                    </select>
                    </div>
                    <div className="checkbtn">

                        <p><input type="checkbox" className="checkinput" id="check" onChange={e => { changeHandler(e.currentTarget.checked, 'check'); }} checked={checkedInputs.includes('check') ? true : false} />
                            <label id="check" htmlFor="check">Toggle</label>
                            <span>????????????</span> ??? ???????????????</p>

                        <p><input type="checkbox" className="checkinput" id="check2" onChange={e => { changeHandler2(e.currentTarget.checked, 'check2'); }} checked={checkedInputs2.includes('check2') ? true : false} />
                            <label id="check2" htmlFor="check2">Toggle</label>
                            <span>?????? ?????? ?????? ??????</span> ??? ???????????????</p>
                    </div>
                    <div className="activebtn">
                            <button type="button"
                                onClick={goRegist} disabled={disabled}>
                                ????????????
                            </button>
                    </div>
                </form>
            </div>
        </Regi1>
    )
}
export default RegistPage1;