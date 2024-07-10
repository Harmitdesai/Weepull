import { useRef } from 'react';
import './OtherImage.css';

let otherImageList = [];

const OtherImage = () => {

    const getOtherImageRef = useRef(null);
    const OtherImageContainerRef = useRef(null);

    return (
        <div id="OtherImage">
            <span className="HeadingText">Other Images</span>
            <div id="OtherImageSpace">
                <input type="file" name="OtherImage" accept=".jpg, .jpeg, .png" style={{display : "none" }} id="getOtherImage" ref = {getOtherImageRef} multiple onChange={(e)=>{
                    if (getOtherImageRef.current.files.length > 0) {
                        // to read file uploaded by user --------
                        var reader = new FileReader(); // Create a new FileReader object
                
                        reader.onload = function(e){
                            // Set the background-image style of the div element with the data URL
                            otherImageList.push(getOtherImageRef.current.files[0]);
                            var newDiv = document.createElement("div");
                            newDiv.style.backgroundImage = "url('" + e.target.result + "')";
                            newDiv.style.backgroundSize = "cover"; // Cover the entire element with the background image
                            newDiv.style.backgroundPosition = "center";
                            newDiv.style.height = "35%";
                            newDiv.style.width = "85%";
                            newDiv.style.marginTop = "7%";
                            newDiv.style.borderRadius = "40px";
                            newDiv.style.flex = "0 0 auto";
                            OtherImageContainerRef.current.appendChild(newDiv);
                            console.log(otherImageList);
                        };
                
                        // Read the file as a data URL
                        reader.readAsDataURL(getOtherImageRef.current.files[0]);
                }}}/>
                <div id="OtherImageContainer" ref={OtherImageContainerRef}></div>
                <button id="UploadOtherImage" onClick={()=>{
                    getOtherImageRef.current.click();
                }}></button>
            </div>
        </div>
    );
}
 
export {OtherImage, otherImageList};