import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getWordFail, getWordSuccess, getWordsRequest } from "../redux/slices";
import Loader from "./Loader";
const Learning = () => {
  const [count,setCount] = useState<number>(0);
  const [audioSrc,setAudioSrc] = useState<string>("")
   const audioRef = useRef(null)
  const dispatch = useDispatch()
  const params = useSearchParams()[0].get("language") as LangType
  const navigate = useNavigate();


  const {loading,error,words} =  useSelector((state: {root: StateType})=>state.root)
  
   
  const audioHandler  = async()=> {
    const player:HTMLAudioElement  = audioRef.current!

    if(player){
      player.play()
    }else{
      const data = await fetchAudio(words[count]?.word,params);

      setAudioSrc(data)
    }
  }


  const nextHandler = ():void => {
    setCount((prev) => prev +1);
    setAudioSrc("");
  }

   useEffect(()=>{
    dispatch(getWordsRequest())
    translateWords(params || "hi")
    .then((arr)=> dispatch(getWordSuccess(arr)))
    .catch(err=>dispatch(getWordFail(err))
    )
    if(error){
      alert(error);
      dispatch(clearState())
    }
   },[])
   
   if(loading) return <Loader/>
  
  return (
    <Container maxWidth="sm" sx={{
      padding: "1rem"
    }}>
         
       {/* {this should be in useEffect because 
           we need to render audio after fetching the audio through api 
           the process goes like 
          audioHandler event >> audio fetch >> this element render because of condition and sound play because of autoplay >> 
          audioHandler event click again audioref has reference this time so player.play() invole
       */
         
        audioSrc && <audio src={audioSrc} autoPlay 
         ref={audioRef}
        ></audio>
       }

        <Button onClick={count === 0 ? ()=>navigate("/") : ()=> setCount((prev)=>prev-1)}>
        <ArrowBack/>
        </Button>
       <Typography margin={"2.5rem 0"}>Learning Made Easy</Typography>
       <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant={"h4"}>
          {count + 1} -{words[count]?.word}
        </Typography >
        <Typography color={"#C38D9E"} variant="h4"> : {words[count]?.meaning}</Typography>
        <Button 
         onClick={audioHandler}
        sx={{
          borderRadius: "50%"
        }}>
          <VolumeUp/>
        </Button>
       </Stack>
      <Button sx={{
        margin: "3rem 0",
      }}
       variant="contained"
       fullWidth
       onClick={count === 7 ? ()=>navigate("/quiz") : nextHandler}
      >
        {count === 7 ? "Test" :"Next"}
      </Button>
    </Container>
  )
}

export default Learning