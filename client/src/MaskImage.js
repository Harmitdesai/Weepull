import './MaskImage.css';
import mask from './mask.jpg';
import { useState, useRef, useEffect } from 'react';

const MaskImage = ({imageURL, coordinateSetter, coordinates, imageFile}) => {
    const [embeddings, setEmbeddings] = useState(null);  
    const [isOpen, setIsOpen] = useState(false);
    const MaskedImage = useRef(null);
    const overlayMask = useRef(null);
    const imageContainer = useRef(null);
    const [hasUploaded, setHasUploaded] = useState(false);
    const [maskList, setMaskList] = useState([]);
    const [currentMask, setCurrentMask] = useState(null);
    const [currentMaksUrl, setCurrentMaskUrl] = useState(null);

//Handles opening image for masking
//Uploads image when opened for the first time
    const handleAddMaskClick = async () => {
      if(imageURL){
        if (isOpen){
          // coordinateSetter([]);
          setIsOpen(false);
        } else {
          setIsOpen(true);
          if (hasUploaded){

          } else {
            const formData = new FormData();
            formData.append('imageFile', imageFile);
            
            try {
              const response = await fetch('/api/setImage', {
                method: 'POST',
                body: formData
              })

              if (!response.ok) {
                const errorBody = await response.text();
                console.log('Error response body:', errorBody);
                throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
              }

              const result = await response.json();
              console.log('Server response:', result);
              setEmbeddings(result);
              alert('Image uploaded and processed successfully!');
              setHasUploaded(true);
            } catch (error) {
              console.error('Detailed error:', error);
              console.error('Error name:', error.name);
              console.error('Error message:', error.message);
              console.error('Error stack:', error.stack);
              alert('Failed to upload and process the image. Please try again.');
            }
          }
        }
      } else {
        alert('Please Upload Main Image First!!!')
      }
    };

//Submits coordinates
//Note: it is not taking first coordinate, we have to solve it
    const submitCoordinates = async () => {
      try {
          setEmbeddings(embeddings => ({
            ...embeddings,
            ['coordinates']: {coordinates}
          }))
          console.log(embeddings);
          // const response = 
          await fetch('/api/predictCoordinate', {
              method: 'POST',
              body: JSON.stringify(embeddings),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(response => response.blob())
          .then(blob => {
              // Create a URL for the blob
              setCurrentMask(blob);
              console.log(currentMask);
              setCurrentMaskUrl(URL.createObjectURL(blob));
              overlayMask.current.src = currentMaksUrl;
              // overlayMask.current.src = `url('mask.jpg')`
              // Open the URL in a new window
              // window.open(url, '_blank');

          });
          console.log('Success:');
      } catch (error) {
          console.error('Error:', error);
      }
    }

    useEffect(() => {
      if (!(coordinates.length == 0)){
        console.log(coordinates);
        submitCoordinates();
      } else {
        console.log("It is null right now");
      }
    }, [coordinates]);

    const addCoordinate = async (e) => {
      const img = MaskedImage.current;
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;
      const X = Math.round(x * scaleX);
      const Y = Math.round(y * scaleY);
      coordinateSetter([...coordinates,[X,Y]]);
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
                          alignItems: 'center',
                          gridColumn: '1/2',
                          gridRow: '1/2'
                        }} ref={imageContainer}>
                          <img className="PopUpMaskedImage" src={imageURL} alt="MainImage" ref={MaskedImage} onClick={addCoordinate}/>
                          <img className="mask-overlay" ref={overlayMask}/>
                          {coordinates.map((coordinate, index) => (
                            <div
                              key={index}
                              style={{
                                position: 'absolute',
                                left: `${(coordinate[0] / MaskedImage.current.naturalWidth) * (MaskedImage.current.getBoundingClientRect().width/imageContainer.current.getBoundingClientRect().width) * 100}%`,
                                top: `${(coordinate[1] / MaskedImage.current.naturalHeight) * 100}%`,
                                width: '10px',
                                height: '10px',
                                background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)', // Center the dot at the click position
                              }}
                            />
                          ))}
                        </div>
                        <div className="MaskButtons">
                          <button className="SelectArea">Select Area</button>
                          <button className="ClearCoordinates" onClick={()=>{
                            coordinateSetter([]);
                          }}>Clear Coordinates</button>
                          <button className="AddMaskButton" onClick={()=>{
                            if (currentMask==null){
                              console.log(currentMask);
                              alert(`There's no mask selected right now.`);
                            } else {
                              setMaskList(...maskList,currentMask);
                            }
                          }}>Add Mask</button>
                          <button className="SubmitMask">Submit</button>
                        </div>
                        <div className="MaskedImageCollection">
                          
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
}
 
export default MaskImage;