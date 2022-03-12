import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class Create extends React.Component {
  state = {
    formData: {
      ID: '',
      TITLE: '',
      AUTH: '',
      PRICE: ''
    },
    submitted: false,
    Errors: [],
  }

  handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
   
  }

  handleSubmit = () => {
    console.log("this.Errors", this.state.Errors.length)
    if (this.state.Errors.length !== 0) {
      this.sendDataToAPI();
    }
  }

  sendDataToAPI = () => {
    const { formData } = this.state;
    axios.post(`http://localhost:3006/books/`, {
      "id": formData.ID,
      "title": formData.TITLE,
      "auth": formData.AUTH,
      "price": formData.PRICE,
    }).then(() => {
      console.log("success")
      window.location.pathname = '/';
    })
  }


  render() {
    const { formData, submitted } = this.state;
    return (
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        

        <ValidatorForm
          onSubmit={this.handleSubmit}
          onError={errors => this.state.Errors = errors}
        >

          <div>
            <label>Ref</label>
            <TextValidator
              fullWidth
              onChange={this.handleChange}
              name="ID"
              value={formData.ID}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>
          <div>
            <label>Title</label>
            <TextValidator
              fullWidth
              onChange={this.handleChange}
              name="TITLE"
              value={formData.TITLE}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>
          <div>
            <label>Auth</label>
            <TextValidator
              fullWidth
              onChange={this.handleChange}
              name="AUTH"
              value={formData.AUTH}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>
          <div>
            <label>Price</label>
            <TextValidator
              fullWidth
              onChange={this.handleChange}
              name="PRICE"
              value={formData.PRICE}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </div>

          <br></br>
          <div>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
        </ValidatorForm>
      </Box>
    );
  }
}
