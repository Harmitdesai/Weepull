import { useRef } from 'react';
import './TextDescription.css';

let TDList = [];

const TextDescription = () => {

    const TDContainerRef = useRef(null);
    const TDInputRef = useRef(null);

    return (
        <div id="TextDescription">
            <span className="HeadingText">Text Description</span>
            <div id="TextDescriptionSpace">
                <div id="TextualDescriptionContainer" ref={TDContainerRef}>
                    <textarea id="TDinput" ref={TDInputRef}></textarea>
                </div>
                <button id="AddTD" onClick={()=>{
                    const data = TDInputRef.current.value;
                    TDInputRef.current.value = '';
                    if (data){
                    TDList.push(data);
                    var newSpan = document.createElement("span");
                    newSpan.style.color = "#ffffff";
                    newSpan.style.fontSize = "small";
                    newSpan.style.fontFamily = "sans-serif";
                    newSpan.style.backgroundImage =  "linear-gradient(to right, #96c9db, #82afbf)";
                    newSpan.style.border = "none";
                    newSpan.style.borderRadius = "1em";
                    newSpan.style.width = "83%";
                    newSpan.style.paddingTop = "2%";
                    newSpan.style.paddingBottom = "2%";
                    newSpan.style.paddingLeft = "2%";
                    newSpan.textContent = data;
                    TDContainerRef.current.appendChild(newSpan);
                    }
                }}></button>
            </div>
        </div>
    );
}
 
export  {TextDescription, TDList};