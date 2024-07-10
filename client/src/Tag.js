import { useRef } from 'react';
import './Tag.css';

let TagList = [];

const Tag = () => {

    const TagInputRef = useRef(null);
    const containerRef = useRef(null);


    return (
        <div id="Tag">
            <span className="HeadingText">Tags</span>
            <div id="tagsSpace">
                <div id="TagContainer" ref={containerRef}>
                    <textarea id="Taginput" ref={TagInputRef}></textarea>
                </div>
                <button id="AddTag" onClick={()=>{
                    const data = TagInputRef.current.value;
                    TagInputRef.current.value = '';
                    if (data){
                    TagList.push(data);
                    var newSpan = document.createElement("span");
                    newSpan.style.color = "#888888";
                    newSpan.style.fontSize = "small";
                    newSpan.style.fontFamily = "sans-serif";
                    newSpan.style.backgroundImage =  "linear-gradient(to right, #e7e7e7, #cacaca)";
                    newSpan.style.border = "none";
                    newSpan.style.borderRadius = "1em";
                    newSpan.style.width = "83%";
                    newSpan.style.paddingTop = "2%";
                    newSpan.style.paddingBottom = "2%";
                    newSpan.style.paddingLeft = "2%"
                    newSpan.textContent = data;
                    containerRef.current.appendChild(newSpan);
                    }
                }}></button>
            </div>
        </div>
    );
}
 
export { Tag, TagList };