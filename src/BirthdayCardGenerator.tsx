import { useState, Dispatch, SetStateAction } from "react";
import Card from "./component/Card";
import { json } from "stream/consumers";

type openAI = [{url: string}]

function BirthdayCardGenerator() {
    const [data, setData ] = useState (null) as [openAI|null, Dispatch<SetStateAction<null>>] //this is the state that holds the data

    const generate = ()=> {
        fetch ("https://api.openai.com/v1/engines/davinci-codex/completions")
        .then ((response) => { //.then means that "when the api has loaded.. then something happens"
            return response.json() //after we have got the json data then we put another .then function
       })
       .then(json=> {
        setData(json)
       })
    }

    return (
        
    );
};

export default BirthdayCardGenerator;