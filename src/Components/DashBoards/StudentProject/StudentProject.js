import React, { useState } from 'react';
import Photo from '../../Registration/Photo';
import './StudentProject.css';
import { useImageContext } from '../../Registration/MyContext';

function StudentProject({ userData }) {
    const url = process.env.REACT_APP_BACKEND;
    const [formData, setFormData] = useState({
        Title: '',
        Github_link: '',
        Sector: '',
        Description: '',
        File_path: null,
        Demo_link: '',
        Approved: 0,
        Student_id: userData.id,
    });

    const { imageBlob } = useImageContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            File_path: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('project', JSON.stringify(formData));
        formDataToSend.append('image', imageBlob);

        try {
            const response = await fetch(`${url}/project/postProject`, {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            alert('Form submitted successfully!');
       
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Form submission failed. Please try again.');
        }
    };

    return (
        <div className='StudentProject'>
            <div className='form-box'>
                <Photo />
                <div className='form-fields'>
                    <input type='text' className='desc-text' name='Title' value={formData.Title} onChange={handleChange} placeholder='Title' />
                    <input type='text' className='desc-text' name='Github_link' value={formData.Github_link} onChange={handleChange} placeholder='Github Link' />
                    <input type='text' className='desc-text' name='Demo_link' value={formData.Demo_link} onChange={handleChange} placeholder='Demo Link' />
                    <input type='text' className='desc-text' name='Sector' value={formData.Sector} onChange={handleChange} placeholder='Sector' />
                    <input type='file' className='desc-text' name='File_path' onChange={handleFileChange} placeholder='File Path' />
                    <textarea className='desc-text' rows={5} cols={5} name='Description' value={formData.Description} onChange={handleChange} placeholder='Description'></textarea>
                    <button onClick={handleSubmit} className='btn-form' type='submit'>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default StudentProject;

