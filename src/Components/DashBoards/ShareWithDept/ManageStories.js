import React, { useState, useEffect } from "react";
import Photo from '../../Registration/Photo';
import './ShareWithDept.css';
import { useImageContext } from '../../Registration/MyContext';


function ManageStories({ userData }) {
    const url = process.env.REACT_APP_BACKEND;
    const [stories, setStories] = useState([]);
    const [showUpdateOverlay, setShowUpdateOverlay] = useState(false);
    const [selectedStory , setSelectedStory] = useState(null);
    const [story , setStory] = useState('');
    const { imageBlob } = useImageContext();
    console.log({ 'image-blob': imageBlob });

    useEffect(() => {
        getStories();
    }, []);

    async function getStories() {
        try {
            const response = await fetch(`${url}/story/getStory/${userData.id}`, {
                method: 'GET',
            });

            const data = await response.json();
            setStories(data.data);
        } catch (error) {
            console.error('Error getting stories:', error);
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/story/deleteStory/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await getStories();
            } else {
                console.error('Failed to delete story');
            }
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };


    const handleUpdateNext = async (e,id, image) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('prev_image', image);
            formData.append('image', imageBlob);
            formData.append('story', story);
            const response = await fetch(`${url}/story/updateStory/${id}`, {
                method: 'PUT',
                body: formData, 
            });
    
            if (response.ok) {
                await getStories();
                setShowUpdateOverlay(false); 
                setStory(''); 
            } else {
                console.error('Failed to update story');
            }
        } catch (error) {
            console.error('Error updating story:', error);
        }
    };

    const handleUpdate = (e,story) => {
        e.preventDefault();
        setSelectedStory(story);
        setShowUpdateOverlay(true);
    };

    console.log({ stories });

    return (
        <div className="manage">
            <div>Manage Your Stories</div>
            {stories.map((story, index) => (
                <div key={index}>
                    <img src={`${url}/images${story.image}`} width={200} height={200} alt="Story Image" />
                    <div>{story.story}</div>

                    <button onClick={(e)=>{handleDelete(e,story.id)}}>Delete</button>
                    <button onClick={(e)=>{handleUpdate(e,story)}}>Update</button>
                </div>
            ))}
              {showUpdateOverlay && (
                <div className="overlay main-div">
                    <div className="overlay-content content">
                         <div className="form-update-story">
                             <Photo/>
                              <textarea  value={story || selectedStory.story}  onChange={(e)=>setStory(e.target.value)} rows={20} cols={20} /> 
                        </div>
                        <div className="update-btns">
                            <button onClick={(e)=> handleUpdateNext(e,selectedStory.id,selectedStory.image)}>Update</button>
                            <button onClick={() => { setShowUpdateOverlay(false); setStory(''); }}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>  
    );
}

export default ManageStories;
