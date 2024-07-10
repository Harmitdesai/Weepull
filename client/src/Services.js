import Navbar from "./Navbar";
import {MainImage, mainImageFile} from "./MainImage";
import MaskImage from "./MaskImage";
import {OtherImage, otherImageList} from "./OtherImage";
import {TextDescription,TDList} from "./TextDescription";
import {Tag, TagList} from "./Tag";
import MetaData from "./MetaData";

const Services = () => {
    return (
        <div className="Servicescontainer">
            <MainImage/>
            <MaskImage/>
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