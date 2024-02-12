import React, { useState } from "react";
import Photo from '../../Registration/Photo';
import { useImageContext } from '../../Registration/MyContext';
import './ShareWithDept.css';

function ShareWithDept({userData}) {
    const url = process.env.REACT_APP_BACKEND;
    const [story, setStory] = useState('');
    const { imageBlob } = useImageContext();
    console.log({ 'image-blob': imageBlob });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', imageBlob);
            formData.append('story', story);
            formData.append('alumniId', userData.id);

            const response = await fetch(`${url}/story/postStory`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                 alert('Story submitted successfully');
                console.log('Story submitted successfully');
                window.location.reload();
            } else {
                alert('Failed to submit story');
                console.error('Failed to submit story');
            }
        } catch (error) {
            console.error('Error submitting story:', error);
        }
    };


    return (
        <><div className="share">
            <div className="share-div">
                <Photo />
                <textarea
                    rows={20}
                    cols={100}
                    value={story}
                    onChange={(event) => setStory(event.target.value)} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        </>
    );
}

export default ShareWithDept;
