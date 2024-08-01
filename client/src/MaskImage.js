import './MaskImage.css';
import { useState, useRef } from 'react';

const MaskImage = ({imageURL, coordinateSetter, coordinates}) => {

    const [embeddings, setEmbeddings] = useState(null);  
    const [isOpen, setIsOpen] = useState(false);
    const MaskedImage = useRef(null);
  
    const handleAddMaskClick = () => {
      if(imageURL){
        if (isOpen){
          // coordinateSetter([]);
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      } else {
        alert('Please Upload Main Image First!!!')
      }
    };

    const addCoordinate = async (e) => {
      const img = MaskedImage.current;
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;
      const X = Math.round(x * scaleX);
      const Y = Math.round(y * scaleY);
      coordinateSetter([...coordinates,{X,Y}]);
    }

    

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
                        <button onClick={handleAddMaskClick} className='closeMask'>x</button>
                        <div style={{
                          position: 'relative',
                        }}>
                          <img className="PopUpMaskedImage" src={imageURL} alt="MainImage" ref={MaskedImage} onClick={addCoordinate}/>
                          {coordinates.map((coordinate, index) => (
                            <div
                              key={index}
                              style={{
                                position: 'absolute',
                                left: `${(coordinate.X/MaskedImage.current.naturalWidth)*100}%`,
                                top: `${(coordinate.Y/MaskedImage.current.naturalHeight)*100}%`,
                                width: '10px',
                                height: '10px',
                                background:'linear-gradient(to right, #ff7e5f, #feb47b)',
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)', // Center the dot at the click position
                              }}
                            />
                          ))}
                        </div>
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