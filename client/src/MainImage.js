import { useRef } from 'react';
import './MainImage.css';

const MainImage = ({ fileSetter, DataURLSetter}) => {

    const mainImageInputRef = useRef(null);
    const mainImageSpaceRef = useRef(null);

    return (
        <div id="MainImage">
            <span className="HeadingText">Main Image</span>
            <div id="mainImageSpace" ref={mainImageSpaceRef}>
                <input type="file" name="MainImage" accept=".jpg, .jpeg, .png" id="getMainImage" ref={mainImageInputRef} onChange={(e)=>{
                    const file = e.target.files[0];
                    fileSetter(file);
                    if (file){
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            DataURLSetter(e.target.result);
                            mainImageSpaceRef.current.style.backgroundImage = `url(${e.target.result})`;
                            mainImageSpaceRef.current.style.backgroundSize = "cover";
                            mainImageSpaceRef.current.style.backgroundPosition = "center";
                            document.getElementById('UploadMainImage').style.display = "none";
                        };
                        reader.readAsDataURL(file);
                    }
                }}/>
                <button id="UploadMainImage" onClick={() => {
                    mainImageInputRef.current.click();
                }}></button>
            </div>
        </div> 
    );
}
 
export default MainImage;