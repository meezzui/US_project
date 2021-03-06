import React, { useState , useEffect ,Component } from "react";
import Header from "../UserComponents/header";
import MainProfile from "../UserComponents/mainProfile";
// import MypageSideBar from "../components/mypageSideBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
const MyPagePwWrap = styled.div`
* { text-decoration:none; }
ul, li { list-style: none; padding:0; margin: 0;}
input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
.container { max-width:100rem; margin: 0 auto;  }
.navBar { float: left; width: 12rem; padding:5rem 3rem 3rem 2rem; }
.menuLink { margin-bottom: 4rem; color: #555; cursor: pointer; font-size: 1.6rem; }
.menuLink.on { font-weight: 600; color: #14c1c7; }
.menuLink:hover { color:#14c1c7; font-weight: 600; }
.content { padding: 5.5rem 3rem 5rem 10rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1); height: 77.5vh;}
.profileItem { display: flex; position: relative; align-items: center; margin-bottom: 1.5rem; margin-left: 4.5rem; }
.profileFirst { margin-left: -2rem; margin-bottom: 5rem; }
.section1 { width: 11rem; position: relative; right:3rem; font-size: 1.4rem; text-align: left; font-weight: 600; margin-top: -2rem; }
.section2 { width: 80%; height: 6.2rem; }
.profileImg img { width: 6.5rem; border-radius: 50%; vertical-align:middle; border: 2px solid #999; margin-left: 6rem; }
.profileName { font-size: 1.7rem; font-weight: bold; color: #444; margin-top: 1rem; margin-left: 0.5rem; }
.section2 .red { font-size: 1.2rem; margin-top: 0.5rem; color: #fb3b3b; }
.section2 input { border: 1px solid lightgray; background-color: #fff; border-radius: 5px; width: 90%; height: 4rem; color: black; font-size: 1.4rem; padding-left: 1rem; }
.section2 p { font-size: 1.4rem;  margin: 0; margin-left:1rem; }
.submitBtn { text-align: center; margin-top: 5rem; }
.btn:disabled { background: #dfdfdf; }
.btn { width: 12rem; height: 4rem; font-size: 1.5rem; background: #14c1c7; border-radius: 7px; color: #fff; cursor: pointer; box-shadow: 3px 3px 3px #d0d0d0; }
`;

// ?????? ?????????
let passwordDisable = false;
let passwordDisable2 = false;
let passwordDisable3 = false;

const MyPagePw = () =>{
    // memberIdx ????????????
    const param = window.location.search.split('=')[1];

    ///member/ComparePassword
    const [name , setName] = React.useState('')
    const [proImg, setProImg] = React.useState('')

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [password3, setPassword3] = useState('');

    //??????????????? ??????
    const [passwordMessage, setPasswordMessage] = useState('');

    //????????? ??????
    const [isPassword, setIsPassword] = useState(false);
    const [ disabled, setDisabled ] = useState('disabled');
    const [forDis, setForDis] = useState("none");
    const [forDis2, setForDis2] = useState("none");

    useEffect(()=>{
        axios.get("http://localhost:3001/member/edit", {
            params: {
                'idx': param
            }
        })
        .then(function (result) {
            console.log(result.data[0]) 
            setName(result.data[0].name)
            setProImg(result.data[0].img)
        }).catch(function (error) {
        });
    },[])
    
    //???????????? ?????? ??????
    const send = async () => {
        console.log(password3+"///////////////"+password +"///////////"+ param)
        let log = await axios.post('http://localhost:3001/member/ComparePassword?userPw='+password3+"&userPw2="+password+"&idx="+param)
        console.log(log)
        if(log.data === false){
            alert('?????? ??????????????? ??????????????????.')
            window.location.reload();
        } else{
            console.log("??????")
            alert("??????????????? ?????????????????????");
            window.location.reload();
        }
    }

    //??? ???????????? 
    const passwordInput3 = (e) => {
        e.preventDefault();
        const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const password = e.target.value;
        setPassword3(password);
        if (!regExp.test(password)) {
            passwordDisable3 = false;
            changeDispaly('block')
        } else {
            passwordDisable3 = true;
            changeDispaly('none')
        }
        idDisabled()
    }

    //??? ????????????
    const passwordInput = (e) => {
        e.preventDefault();
        const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const password = e.target.value;
        setPassword(password);
        if (!regExp.test(password)) {
            setPasswordMessage('* ??????,??????,???????????? ?????? 8??? ?????? ??????????????????.');
            setIsPassword(false);
            passwordDisable = false;
        } else {
            setPasswordMessage('');
            setIsPassword(true);
            passwordDisable = true;
        }
        idDisabled()
    }

    //??? ???????????? ?????? 
    const passwordInput2 = (e) => {
        e.preventDefault();
        const passwordC = e.target.value;
        setPassword2(passwordC);
        console.log(password2 +"??? ???????????? ?????? / ??? ????????????"+ password)

        if(password === e.target.value){
            passwordDisable2 = true;
            changeDispaly2('none');
        }else{
            changeDispaly2('block');
            passwordDisable2 = false;
        }
        idDisabled()
    }

    const changeDispaly = (display) => {
        setForDis(display)
    }
    const changeDispaly2 = (display2) => {
        setForDis2(display2)
    }

    const idDisabled = () => {
        console.log(passwordDisable,passwordDisable2,passwordDisable3);
        if(passwordDisable === true && passwordDisable2 === true && passwordDisable3===true) {
            setDisabled('');
        }else{
            setDisabled('disabled');
        }
    }

    return (
        <>
            <Header idx={param} param={param}/>
            <MyPagePwWrap>
                <div className="container">
                    <div>
                    <ul className="navBar">
                            <Link to={"/mypage?idx="+ param}><li className="menuLink ">????????? ??????</li></Link>
                            <Link to={"/mypagePw?idx="+ param}><li className="menuLink on">???????????? ??????</li></Link>
                            {/* <Link to={"/mypageLogin?idx=" + param}><li className="menuLink">????????? ??????</li></Link> */}
                            <Link to={"/mypageQnA?idx=" + param}><li className="menuLink">????????????</li></Link>
                        </ul>
                        </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem profileFirst">
                                <div className="profileImg section1">
                                    <img src={proImg==null||proImg==''? "/img/blank_profile.png": "/"+proImg} alt="???????????????"/>
                                </div>
                                <div className="profileNameBox section2">
                                    <div className="profileName">{name}</div>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">?????? ????????????</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="currPw" id="currPw" placeholder="?????? ????????????" onChange={passwordInput3}/>
                                    <p className="red" style={{display:forDis}}>* ??????,??????,???????????? ?????? 8??? ?????? ??????????????????.</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">??? ????????????</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="newPw" id="newPw" placeholder="??? ????????????" onChange={passwordInput}/>
                                    <p className="red">{password.length > 0 && <span className={`message ${isPassword  ? 'success' : 'error'}`}>{passwordMessage}</span>}</p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">??? ???????????? ??????</div>
                                <div className="profileNameBox section2">
                                    <input type="password" name="confirmNewPw" id="confirmNewPw" placeholder="??? ???????????? ??????" onChange={passwordInput2}/>
                                    <p className="red" style={{display: forDis2}}>* ??? ??????????????? ???????????? ????????????.</p>
                                </div>
                            </li>
                        </ul>
                        <div className="submitBtn">
                            <button type="button" onClick={send} className="btn" disabled={disabled}> ?????? </button>
                        </div>
                    </div>
                </div>
            </MyPagePwWrap>
        </>
    );
}

export default MyPagePw;