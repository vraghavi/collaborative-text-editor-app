import React, { useState } from 'react'
import { useNavigate } from 'react-router';

const NameInput = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform any necessary actions here with the input value
        // and then navigate to the other component.
        navigate('/doc', { state: { name: inputValue } }); // Replace '/another' with your desired route
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form style={{ margin: '1em', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={handleSubmit}>
                <div style={{ margin: '1em' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter Your Name" />
                </div>
                <div>
                    <button style={{ margin: '0.5em' }} type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </div>
            </form>
        </div>
    );
}

export default NameInput