import React, {useEffect, useState} from "react";
import Header from "../UserComponents/header";
// import MypageSideBar from "../components/mypageSideBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const MypageWrap = styled.div`
* { text-decoration:none; }
ul, li { list-style: none; padding:0; margin: 0;}
input, textarea, button { padding: 0; outline: 0; border: 0; resize: none; border-radius: 0; -webkit-appearance: none; background-color: rgba(0,0,0,0); }
.container { max-width:100rem; margin: 0 auto; }
.navBar { float: left; width: 12rem; padding:5rem 3rem 3rem 2rem; }
.menuLink { margin-bottom: 4rem; color: #555; cursor: pointer; font-size: 1.6rem; }
.menuLink.on { font-weight: 600; color: #14c1c7; }
.menuLink:hover { color:#14c1c7; font-weight: 600; }
.content { padding: 4rem 3rem 5rem 6rem; overflow: hidden; border-left: 1px solid rgba(0,0,0,0.1);}
.profileItem { display: flex; position: relative; align-items: center; margin-bottom: 2.5rem; }
.profileFirst { margin-left: -1.5rem; margin-bottom: 4rem; }
.profileList { margin-left: 9rem; }
.privacy { margin-left: -1rem; }
.privacy .section1 { width: 100%; font-size: 1.5rem; color: #777; }
.privacy .section1 .star { color: #14c1c7; font-size: 1.5rem; margin-left: 0; }
.privacy .section1 span { font-size: 1.3rem; color: #14c1c7; margin-left: 3rem; }
.section1 { width: 6rem; position: relative; right:3rem; font-size: 1.4rem; text-align: left; font-weight: 600;}
.section2 { width: 80%; }
.modifyImg { color: #14c1c7; font-weight: bold; cursor: pointer; font-size: 1.4rem; margin-top: 1rem; }
.profileName { font-size: 1.7rem; font-weight: bold; color: #444; }
.profileImg img { width: 6.5rem; border-radius: 50%; vertical-align:middle; border: 2px solid #999; }
.section2 input, .section2 textarea { border: 1px solid lightgray; background-color: #fff; border-radius: 5px; width: 100%; height: 4rem; color: black; font-size: 1.4rem; padding-left: 1rem; }
.section2 textarea { height: 8rem; padding-top: 1rem; }
.section2 p { font-size: 1.4rem;  margin: 0; margin-left:1rem; }
.widthraw { color: #14c1c7; cursor: pointer; display: inline-block; font-size: 1.4rem; position:relative; margin-left: 84%; }
.widthraw:hover { font-weight: bold; }
.submitBtn { text-align: center; margin-top: 2rem; }
.btn { width: 12rem; height: 4rem; font-size: 1.5rem; background: #14c1c7; border-radius: 7px; color: #fff; cursor: pointer; box-shadow: 3px 3px 3px #d0d0d0; }
`;

const WithdrawWrap = styled.div`
    z-index: 100; 
    position:fixed; 
    left:0; 
    top:0; 
    width:100%; 
    height:100%; 
    background:rgba(0,0,0,0.3);
    text-align: center;
    .popContainer { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; border:1px solid rgba(0,0,0,0.3s); border-radius: 20px; width: 35rem; height: 30rem; }
    .closeIcon { position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; }
    .popHeader { padding: 4rem 5rem 3rem; }
    .title { font-size: 2rem; font-weight: 700; }
    .popContent { padding: 0 3rem 3rem; }
    .desc { font-size: 1.4rem; color: rgba(35,35,35,.8); }
    .btnItem button { 
        border: 0;
        outline: none;
        background: none;
        background-color: rgba(0,0,0,0);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0;
        cursor:pointer;
        vertical-align: center;
        padding: 1rem 1.8rem;
        font-size: 1.6rem;
        border-radius: 12px;
        background-color: #14c1c7;
        color: #fff;
    }
    .linkWidthraw { color: rgba(34,34,34,.5); text-decoration: underline; margin-top:1.5rem; font-size: 1.3rem; cursor: pointer; }
`;

const Mypage = () =>{
    // ?????? ????????? ??????
    const [name , setName] = React.useState('')
    const [changeName , setChangeName] = React.useState('')
    const [proImg, setProImg] = React.useState('')
    const [proEmail, setProEmail] = React.useState('')
    const [protell, setProTell] = React.useState('')
    const [proInfo, setProInfo] = React.useState('')
    const [proInfo2, setProInfo2] = React.useState('')

    const [proCode, setProCode] = React.useState('')
    const [proGender, setProGender] = React.useState('')
    //memberIdx
    const param = window.location.search.split('=')[1];
    // ????????? ?????? ?????? 
    const [fileImage, setFileImage] = useState('');
    // ?????? ??????
    const [withdrawPop, setWithdrawPop] = useState(false);
    
    // ????????? ?????? ????????????
    useEffect (()=>{
        axios.get("http://localhost:3001/member/edit", {
                params: {
                    'idx': param
                }
            })
            .then(function (result) {
                console.log(result.data[0]) 
                setName(result.data[0].name)
                setChangeName(result.data[0].name)
                setProImg(result.data[0].img)
                setProEmail(result.data[0].email)
                setProInfo(result.data[0].message)
                setProInfo2(result.data[0].message)
                setProTell(result.data[0].tel)
                setProCode(result.data[0].code)
                setProGender(result.data[0].gender)
            }).catch(function (error) {
            });
    },[]);
    
    // ????????? ?????? ??????
    const changeImage = (e)=>{
        setFileImage("img/"+e.target.files[0].name);
        console.log(e.target.files[0]);
        document.querySelector('.profileImg img').src = URL.createObjectURL(e.target.files[0]);
    }

    // ????????? ?????? onChange ????????? ??????
    const nameInput = (e) => {
        e.preventDefault();
        const data = e.target.value;
        setChangeName(data)
    }
    const infoInput = (e) => {
        e.preventDefault();
        const data = e.target.value;
        setProInfo(data)
    }
    const emailInput = (e) => {
        e.preventDefault();
        const data = e.target.value;
        setProEmail(data)
    }
    const telInput = (e) => {
        e.preventDefault();
        const data = e.target.value;
        setProTell(data)
    }
    
    // ?????? ??????
    const send = async () => {
        console.log(fileImage)
        console.log(proEmail)
        console.log(changeName)
        console.log(protell)
        console.log(proInfo)
        console.log(proGender)

        let log = await axios.post('http://localhost:3001/member/editMember?img='+fileImage+"&email="+proEmail+"&name="+changeName+"&tel="+protell+"&message="+proInfo+"&gender="+proGender)
        console.log(log)
        if(log.data == false){
            alert("????????????")
        }else{
            alert("??????????????? ?????? ???????????????")
            window.location.reload();
        }
    }

    // ????????????
    const withdrawRun = ()=>{
        axios.get('http://localhost:3001/member/delete?idx='+param)
        .then(function (response) {
            // handle success
            console.log(response);
            alert('?????????????????????. ?????????????????? ???????????????.');
            window.location.href = '/';
        })
        .catch(function (error) {
            // handle error
            alert('?????? ??????????????????.');
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    // ?????? html
    const WithdrawPop = ()=>{
        return (
            <WithdrawWrap>
                <div className="popContainer">
                    <div className="popHeader">
                        <div className="title">?????? ?????????????????????????</div>
                        <img className="closeIcon" src="img/clear_black.png" alt="????????????" onClick={changePop}/>
                    </div>
                    <div className="popContent">
                        <div className="desc">
                            ???????????? ?????? ??? ?????? ?????? ???????????????.<br/>
                            ?????? ??? ???????????? ??? ?????????,<br/>
                            ????????? ??? ?????? ???????????? ????????? ??? ????????????.<br/>
                        </div>
                    </div>
                    <div className="btnItem">
                        <button onClick={changePop}>?????? ??? ?????????</button>
                    </div>
                    <p className="linkWidthraw" onClick={withdrawRun}>????????????</p>
                </div>
            </WithdrawWrap>
        )
    }

    // ?????? ?????? ??????
    const changePop = ()=>{
        setWithdrawPop(!withdrawPop);
        if(withdrawPop){
            document.body.style.overflowY = "unset";
        } else {
            document.body.style.overflowY = "hidden";
        }
    }

    return (
        <>
            {withdrawPop ? <WithdrawPop/> : ""}
            <Header idx={param} param={param}/>
            <MypageWrap>
                <div className="container">
                    <div className="navForm">
                        <ul className="navBar">
                            <Link to={'/mypage?idx='+param}><li className="menuLink on">????????? ??????</li></Link>
                            <Link to={'/mypagePw?idx='+param}><li className="menuLink">???????????? ??????</li></Link>
                            {/* <Link to={'/mypageMap?idx='+param}><li className="menuLink">????????? ??????</li></Link> */}
                            <Link to={'/mypageQna?idx='+param}><li className="menuLink">????????????</li></Link>
                        </ul>
                    </div>
                    <div className="content">
                        <ul className="profileList">
                            <li className="profileItem">
                                <div className="profileImg section1">
                                    <img src={proImg==null||proImg==''? "/img/blank_profile.png": "/"+proImg} alt="???????????????"/>
                                </div>
                                <div className="profileNameBox section2">
                                    <div className="profileName">{name}</div>
                                    <label htmlFor="inputImg"><div className="modifyImg">????????? ?????? ?????????</div></label>
                                    <input type="file" name="inputImg" id="inputImg" accept="image/*" style={{display:"none"}} onChange={changeImage}/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">??????</div>
                                <div className="section2">
                                    <input type="text" name="name" id="name" placeholder={name} onChange={nameInput}/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">??????</div>
                                <div className="section2">
                                    <input type="text" name="code" id="code" placeholder="??????" value={proCode}/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">??????</div>
                                <div className="section2">
                                    <textarea name="intro" id="intro" placeholder={proInfo2==null||proInfo2==''? "??????":proInfo2} onChange={infoInput}/>
                                </div>
                            </li>
                            <li className="profileItem privacy">
                                <div className="section1">
                                    <p>
                                        <span className="star">*</span> ????????????<span className="">????????? ????????? ??????????????? ???????????? ???????????? ????????????.</span>
                                    </p>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">?????????</div>
                                <div className="section2">
                                    <input type="text" name="email" id="email" placeholder={proEmail} onChange={emailInput} />
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">??????</div>
                                <div className="section2">
                                    <input type="text" name="hp" id="hp" placeholder={'+82 '+protell} onChange={telInput}/>
                                </div>
                            </li>
                            <li className="profileItem">
                                <div className="section1">??????</div>
                                <div className="section2">
                                <input type="text" name="gender" id="gender" placeholder="??????" value={proGender}/>
                                </div>
                            </li>
                        </ul>
                        <div className="widthraw" onClick={changePop}> ???????????? </div>
                        <div className="submitBtn">
                            <button type="submit" className="btn" onClick={send}> ?????? </button>
                        </div>
                    </div>
                </div>
            </MypageWrap>
        </>
    );
}

export default Mypage;