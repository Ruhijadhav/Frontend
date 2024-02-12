import React, { useState } from "react";
import { useImageContext } from '../../Registration/MyContext';
import Photo from "../../Registration/Photo";
import './Screen.css';

function Screen() {
    const url = process.env.REACT_APP_BACKEND;
    const [description, setDescription] = useState("");
    const { imageBlob } = useImageContext();
    const token = localStorage.getItem('token');
    console.log({imageBlob});
  

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("image", imageBlob);
        formData.append("description", description);

        try {
            const response = await fetch(`${url}/screen/postScreen`, {
                method: "POST",
                'Content-Type': 'multipart/form-data',
                body: formData,
                headers: {
                         'Authorization': `${token}` 
                 }  
            });
            const responseData = await response.json();
            alert(responseData);
            console.log(responseData);
            setDescription("");
        } catch (error) {
            console.error("Error occurred while posting screen:", error);
        }
    };

    return (
        <div>
                <div className="screen">
                     <Photo />
                    <div>
                        <textarea rows={20} cols={130} value={description} onChange={handleDescriptionChange} />
                    </div>
                </div>
                <button type="submit" onClick={(e)=>{handleSubmit(e)}}>Submit</button>
        </div>
    );
}

export default Screen;
