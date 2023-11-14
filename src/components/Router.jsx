import React from 'react';
import { Route, Routes } from 'react-router';
import NameInput from './NameInput';
import TextEditor from './TextEditor';

const Router = () => {
    return (
        <Routes>
            <Route exact path="/" element={<NameInput />} />
            <Route exact path="/doc" element={<TextEditor />} />
            {/* </Route> */}
        </Routes>
    )
}

export default Router;