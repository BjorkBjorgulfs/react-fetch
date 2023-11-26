
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type GenPic = [{url:string}]

function App() {
  const myStyle = {
    maxWidth: "400px"

  }
  const [data, setData ] = useState (null) as [GenPic|null, Dispatch<SetStateAction<null>>] //this is the state that holds the data

  const generate = ()=>{
    fetch ("https://api.thecatapi.com/v1/images/search?limit=1")
    //.then means that "when the api has loaded.. then something happens"
    .then((response)=>{
      return response.json() //after we have got the json data then we put another .then function
    })
    .then(json=>{
      setData(json)
    })
  }

  return (
   <div>
    <label>what kind of picture do you want to see</label>
    <input type="text"></input>
    <button onClick={generate}>generate picture</button>
    {/*if there is no data.. you will see h2, if there is data.. you will see img*/}
    {(!data)? 
      <h2>here will come a picture</h2>:
      <img style={myStyle} src={data[0].url}></img>
    } {/*the first item in the array of the state "const [data, setData]"*/}
   </div>
  );
}

export default App;
