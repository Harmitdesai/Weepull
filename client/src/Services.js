import './Services.css';
import MainImage from "./MainImage";
import MaskImage from "./MaskImage";
import {OtherImage, otherImageList} from "./OtherImage";
import {TextDescription,TDList} from "./TextDescription";
import {Tag, TagList} from "./Tag";
import MetaData from "./MetaData";
import { useState } from 'react';

const Services = () => {
    const [mainImageFile, setMainImageFile] = useState(null);
    const [mainImageDataURL, setMainImageDataURL] = useState(null);
    const [maskCoordinates, setMaskCoordinates] = useState([]);

    return (
        <div className="container">
            <MainImage fileSetter={setMainImageFile} DataURLSetter={setMainImageDataURL}/>
            <MaskImage imageURL={mainImageDataURL} coordinateSetter={setMaskCoordinates} coordinates={maskCoordinates} imageFile={mainImageFile}/>
            <OtherImage/>
            <div id="Divider"></div>
            <TextDescription/>
            <Tag/>
            <MetaData/>
            <div id="Buttons">
                <div>
                    <button id="cancelButton">Cancel</button>
                    <button id="submitButton" onClick={()=>{
                        console.log(mainImageFile);
                        console.log(maskCoordinates);
                        console.log(otherImageList);
                        console.log(TDList);
                        console.log(TagList);
                    }}>Submit</button>
                </div>
            </div> 
        </div>
    );
}
 
export default Services;