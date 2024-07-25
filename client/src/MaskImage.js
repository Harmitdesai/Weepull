import './MaskImage.css';
import { useState, useRef } from 'react';

const MaskImage = ({imageURL}) => {
    
    const [isOpen, setIsOpen] = useState(false);
  
    const handleAddMaskClick = () => {
      if (isOpen){
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    return (
        <div className="MaskImage">
            <span className="HeadingText">Mask Image</span>
            <div className="maskImageSpace">
                <div className="MaskImageContainer">

                </div>
                <details open={isOpen}>
                    <summary>
                        <button className="AddMask" onClick={handleAddMaskClick}></button>
                    </summary>
                    <div className="BlurWindow">
                    </div>
                    <div className="MaskCard">
                        <img className="PopUpMaskedImage" src={imageURL}/>
                        <div className="MaskButtons">
                          <button className="SelectArea">Select Area</button>
                          <button className="ClearCoordinates">Clear Coordinates</button>
                          <button className="AddMaskButton">Add Mask</button>
                          <button className="SubmitMask">Submit</button>
                        </div>
                        <div className="MaskedImageCollection"></div>
                    </div>
                </details>
            </div>
        </div>
    );
}
 
export default MaskImage;