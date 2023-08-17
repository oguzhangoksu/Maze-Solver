import {useEffect, useRef, useState} from "react";
import "./Css/styles.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ModeSelect from "./ModeSelect";
import AlgorithmSelection from "./AlgorithmSelection";
import {Djkstra} from "./Algorithms/Djkstra";
import { BFS } from "./Algorithms/BFS";
import { getPathAStar  } from "./Algorithms/AStar";
var array2d;

export function Maze(){
    
    const [row, setRow] = useState(10);
    const [mode,setMode]=useState("");
    const [algorithm,setAlgorithm]=useState("");
    const [target,setTarget]=useState((row*row)-1)
    const [current,setCurrent]=useState(0)
    const [enterUseEffect,setEnterUseEffect]=useState(false);
    const [findPath,setFindPath]=useState(false)
    const mazeRef=useRef();
    const divarray=Array.from({ length: row*row }, (_, index) => index);
    useEffect(()=>{
        document.getElementById(current).innerHTML=""
        document.getElementById(target).innerHTML=""
        array2d = Array.from({ length: row }, () => Array(row).fill(0));
        array2d[0][0]=2;
        array2d[Math.floor(((row*row)-1)/row)][((row*row)-1)%row]=3;
        setCurrent(0)
        setTarget((row*row)-1)
        setEnterUseEffect(true);
    },[row],[])
    if(enterUseEffect===true){
        document.getElementById(current).innerHTML="A"
        document.getElementById(target).innerHTML="B"
        setEnterUseEffect(false);
    }


    const rowint=row
    let widthvalue=100/rowint
    let heightvalue=100/rowint

    const normalblock={
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:`calc(${widthvalue}% - 2px)`,
        height:`calc(${heightvalue}% - 2px)`,
        backgroundColor:"white",
        color:"white",
    }
    const targetblock={
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:`calc(${widthvalue}% - 2px)`,
        height:`calc(${heightvalue}% - 2px)`,
        backgroundColor:"blue",
        color:"white",
    }
    const currentblock={
        display:"flex",
        width:`calc(${widthvalue}% - 2px)`,
        justifyContent:"center",
        alignItems:"center",
        height:`calc(${heightvalue}% - 2px)`,
        backgroundColor:"blue",
        color:"white"
    }


/*
    function definestyle(index){
        element=document.getElementById(index);
        if(index===current){
            element.className="currentblock"
        }
        else if(index===target){
            element.className="targetblock"
        }
        else{
            element.className="normalblock"
        }
        
    }
    */


    function definestyle(index){

        if(index===current){
            
            return currentblock
        }
        else if(index===target){

            return targetblock
        }

        return normalblock
        
    }

    //Select Mode 
    const handleMode=(selectedValue)=>{
        setMode(selectedValue)
    }
    //Select Algorithm
    const handleAlgorithm=(selectedValue)=>{
        if(selectedValue===""){
            alert("Please select algorithm")
        }
        setAlgorithm(selectedValue)
    }

    //Find Path with Selected Algorithm
    const handleChange= event=>{
        for(let i=0;i<(row*row);i++){
            document.getElementById(i).className="box"    
        }
        
        
        if (algorithm===""){
            alert("Please select algorithm")
        }
        else if(algorithm==="BFS"){
            setFindPath(true)
            const promise1 = new Promise((resolve, reject) => {
                resolve(BFS(array2d,current,target,row));
            });
            promise1.then((value)=>{
                if(value.failed){
                    alert("No Path Found")
                }
                else{
                    let patharray=value.path
                    setTimeout(()=>{
                        for(let i=0;i<patharray.length;i++){
                            document.getElementById(patharray[i]).className="path";
                        }
                    },1000+(value.visitednum*50))
                    
                }
            })

        }

        else if(algorithm==="Djkstra"){
            setFindPath(true)
            const promise1 = new Promise((resolve, reject) => {
                resolve(Djkstra(array2d,current,target,row));
            });
            promise1.then((value)=>{
                if(value.failed){
                    alert("No Path Found")
                }
                else{
                    let patharray=value.path
                    setTimeout(()=>{
                        for(let i=0;i<patharray.length;i++){
                            document.getElementById(patharray[i]).className="path";
                        }
                    },1000+(value.visitednum*25))
                    
                }
            })

        }

        else if(algorithm==="Manhattan"){
            setFindPath(true)
            const promise1 = new Promise((resolve, reject) => {
                resolve(getPathAStar(array2d,current,target,row,0));
            });
            promise1.then((value)=>{
                if(value.failed){
                    alert("No Path Found")
                }
                else{
                    let patharray=value.path
                    setTimeout(()=>{
                        for(let i=0;i<patharray.length;i++){
                            document.getElementById(patharray[i]).className="path";
                        }
                    },1000+(value.visitednum*50))
                    
                }
            })
        }
        else if(algorithm==="Diagonal"){
            setFindPath(true)
            const promise1 = new Promise((resolve, reject) => {
                resolve(getPathAStar(array2d,current,target,row,1));
            });
            promise1.then((value)=>{
                if(value.failed){
                    alert("No Path Found")
                }
                else{
                    
                    let patharray=value.path
                    setTimeout(()=>{
                        for(let i=0;i<patharray.length;i++){
                            document.getElementById(patharray[i]).className="path";
                            
                        }
                    },1000+(value.visitednum*50))
                    
                }
            })
            
        }
        else if(algorithm==="Eucledian"){
            setFindPath(true)
            const promise1 = new Promise((resolve, reject) => {
                resolve(getPathAStar(array2d,current,target,row,2));
            });
            promise1.then((value)=>{
                if(value.failed){
                    alert("No Path Found")
                }
                else{
                    let patharray=value.path
                   
                    setTimeout(()=>{
                        for(let i=0;i<patharray.length;i++){
                            document.getElementById(patharray[i]).className="path";
                        }
                    },1000+(value.visitednum*50))
                    
                }
            })
        }
        else if(algorithm==="Chebysev"){
            setFindPath(true)
            const promise1 = new Promise((resolve, reject) => {
                resolve(getPathAStar(array2d,current,target,row,3));
            });
            promise1.then((value)=>{
                if(value.failed){
                    alert("No Path Found")
                }
                else{
                    let patharray=value.path
                   
                    setTimeout(()=>{
                        for(let i=0;i<patharray.length;i++){
                            document.getElementById(patharray[i]).className="path";
                        }
                    },1000+(value.visitednum*50))
                    
                }
            })
        }


    }

    //Do proper click on boxes with selected Mode
    function handleClick(index,mode){
        const element=document.getElementById(index);
        if(mode===""){
            alert("Please select mode")
        }
        else if(mode==="Block"){


            if(element.style.backgroundColor==="black"){
                element.style.backgroundColor="white";
                array2d[Math.floor(index/row)][index%row]=0;
            }
            else if(element.style.backgroundColor=== "white"){
                element.style.backgroundColor="black"
                array2d[Math.floor(index/row)][index%row]=1;
            }

        }
        else if(mode==="Target"){
            element.style.backgroundColor="blue";
            element.innerHTML="B";
            array2d[Math.floor(index/row)][index%row]=3;
            array2d[Math.floor(target/row)][target%row]=0;
            document.getElementById(target).style.backgroundColor="white";//old target
            document.getElementById(target).innerHTML=" ";//old target
            setTarget(index)
            
            
        }
        else if(mode==="Current"){

            element.style.backgroundColor="blue";
            element.innerHTML="A";
            array2d[Math.floor(index/row)][index%row]=2;
            array2d[Math.floor(current/row)][current%row]=0;
            document.getElementById(current).style.backgroundColor="white";//old target
            document.getElementById(current).innerHTML="";//old target
            setCurrent(index)
        }
  
    }


    function handleReset(){
        let value=document.getElementById("row").value
        if(findPath===true){
            window.location.reload(false);
            
        }
        else{
            if(value<=50 && value){
                setRow(value);
            }
        }
       
    }

    function handleLinkedIn(value){
        if(value==="linkedIn"){
            window.open("https://www.linkedin.com/in/oguzhangoksu")
        }
        else{
            window.open("https://github.com/oguzhangoksu")
        }
    }
    function handleMouseEnter(value){
        if(value==="linkedIn"){
        document.getElementsByClassName("linkinButton")[0].style.backgroundColor="white"
        document.getElementsByClassName("linkinButton")[0].style.color="rgba(6,120,182,255)"
        }
        else{
            document.getElementsByClassName("githubButton")[0].style.backgroundColor="white"
            document.getElementsByClassName("githubButton")[0].style.color="black"
        }
    }
    function handleMouseLeave(value){
        if(value==="linkedIn"){
            document.getElementsByClassName("linkinButton")[0].style.backgroundColor="rgba(6,120,182,255)"
            document.getElementsByClassName("linkinButton")[0].style.color="white"
        }
        else{
            document.getElementsByClassName("githubButton")[0].style.backgroundColor="black"
            document.getElementsByClassName("githubButton")[0].style.color="white"
        }

    }
    
return(
        <div className="allpage">
        <div className="menu">
            <div className="container">
                <div className="fontheader">Maze Solver</div>
                <ModeSelect  sendDataToParent={handleMode}></ModeSelect>
                <AlgorithmSelection style={{height:"20px !important"}}className="deneme" sendDataToParent={handleAlgorithm}></AlgorithmSelection>
             
                <Box component="form"sx={{'& > :not(style)': { m: 1, width: '25ch' },}}novalidateautocomplete="off">
                    <TextField style={{marginTop:"10px",height:"40px"}} id="row" label="Cells Per Row" variant="outlined"  />
                </Box>
                <Button sx={{marginTop:"20px",backgroundColor:"green"}} onClick={handleChange} variant="contained">Find Path</Button>
                <Button sx={{marginTop:"20px",backgroundColor:"red"}} onClick={handleReset} variant="contained">Reset</Button>
                <div className="githubButton" onClick={()=>{handleLinkedIn("github")}} onMouseEnter={()=>{handleMouseEnter("github")}} onMouseLeave={()=>{handleMouseLeave("github")}}>Source Code <div className="github"></div></div>
                <div className="font" style={{display:"flex",alignItems:"center",justifyContent:"center"}} > Crafted by <div className="linkinButton" onClick={()=>{handleLinkedIn("linkedIn")}} onMouseEnter={()=>{handleMouseEnter("linkedIn")}} onMouseLeave={()=>{handleMouseLeave("linkedIn")}}> Oğuzhan Göksu <div className="linkedIn"></div></div></div>
            </div>
        </div>
        <div className="containerBox" ref={mazeRef}>
            {divarray.map((index)=>(
                
               <div style={definestyle(index)} className="box"  key={index} id={index} onClick={()=>{handleClick(index,mode)}}></div>
            
            ))}

        </div>
  
    </div>
)

}
export default Maze;