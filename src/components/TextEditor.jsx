import React, { useEffect, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router';
import { debounce, throttle } from 'lodash';

const WS_URL = "wss://fyi2v7i4zc.execute-api.us-east-1.amazonaws.com/production";

function TextEditor() {

    const [message, setMessage] = useState('');
    const socket = useRef('');
    const data = useLocation();
    let name = data.state.name;
    // let sendMessageTimeout;

    useEffect(() => {
        // console.log(state);
        // name = state.name;
        socket.current = new WebSocket(WS_URL);

        if (!socket.current) return;
        socket.current.addEventListener('open', (event) => {
            console.log('Connected to server!');
        });

        socket.current.addEventListener('message', (event) => {
            const res = JSON.parse(event.data);
            setMessage(res.message);
            console.log('Message from server ', res.message);
        });

        return () => {
            socket.current.addEventListener('disconnect', (event) => {
                console.log('Disconnected the server!');
            });
        }
    }, []);

    const handleProcedureContentChange = debounce(value => {
        if (message === value) return;
        if (!socket.current) return;
        setMessage(value);
        socket.current.send(JSON.stringify({ "name": name, "action": "message", "message": value }));
        console.log("send message to server", value);
    }, 1000);

    // const handleProcedureContentChange = (value) => {
    //     if (message === value) return;
    // clearTimeout(sendMessageTimeout);
    // if (!socket.current) return;
    // sendMessageTimeout = setTimeout(() => {
    //     setMessage(value);
    //     socket.current.send(JSON.stringify({ "name": name, "action": "message", "message": value }));
    //     console.log("send message to server", value);
    // }, 5000);

    // const debounceMessage = debounce(() => {
    //     console.log('=====>', value);
    //     setMessage(value);
    //     socket.current.send(JSON.stringify({ "name": name, "action": "message", "message": value }));
    //     console.log("send message to server", value);
    // }, 5000);
    // debounceMessage();
    // }


    var modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };

    var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Text Editor</h1>
            <h4 style={{ textAlign: "center" }}>{name} is typing...</h4>
            <div style={{ display: "grid", justifyContent: "center" }}>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder="write your content ...."
                    value={message}
                    onChange={handleProcedureContentChange}
                    style={{ height: "220px" }}
                >
                </ReactQuill>
            </div>
        </div>
    );

}

export default TextEditor;