import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';

export default function Update() {
    let history = useHistory();
    const [Title, setTitle] = useState('');
    const [Auth, setAuth] = useState('');
    const [Price, setPrice] = useState('');
    const [ID, setID] = useState(null);

    const sendDataToAPI = () => {
      
        axios.patch(`http://localhost:3006/books/${ID}`, 
            {
                "title":Title,
                "auth":Auth,
                "price":Price
            }
      ).then(() => {
            history.push('/')
        })
    }

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setTitle(localStorage.getItem('Title'));
        setAuth(localStorage.getItem('Auth'));
        setPrice(localStorage.getItem('Price'));
     }, [])

    return (
        <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <div>
            <Form>
                <Form.Field>
                    <label>Title</label>
                    <TextField
                        fullWidth
                        name="Title"
                        value={Title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Name' />
                </Form.Field>
                <Form.Field>
                    <label>Auth</label>
                    <TextField
                        minRows={1}
                        name="Auth"
                        value={Auth}
                        placeholder='Description'
                        onChange={(e) => setAuth(e.target.value)}
                    />
                </Form.Field>
                  <Form.Field>
                    <label>Price</label>
                    <TextField
                    fullWidth
                        name="Price"
                        value={Price}
                        placeholder='Location'
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Field>

                 <br></br>
                <div>
                    <Button fullWidth color="primary" variant="contained" type='submit' onClick={sendDataToAPI}>Update</Button>
                </div>
            </Form>
        </div>
        </Box>
    )
}
