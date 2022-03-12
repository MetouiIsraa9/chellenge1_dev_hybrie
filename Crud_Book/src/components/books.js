import React, { useEffect, useState } from 'react';
import { Table, Button, TextValidator } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookMedical } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { sizeHeight } from '@mui/system';
import TextField from '@mui/material/TextField';
export default function Read() {




  const [query, setQuery] = useState("")
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3006/books`)
      .then((getData) => {
        setApiData(getData.data);
      })
  }, [])

  const setData = (id, title, auth, price) => {
    localStorage.setItem('ID', id)
    localStorage.setItem('Title', title)
    localStorage.setItem('Auth', auth)
    localStorage.setItem('Price', price)

  }

  const getData = () => {
    axios.get(`http://localhost:3006/books`)
      .then((getData) => {
        setApiData(getData.data);

      })
  }

  const onDelete = (id) => {
    axios.delete(`http://localhost:3006/books/${id}`)
      .then(() => {
        getData();
        setOpen(false)
      })
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (

    <div>
      <div>
        <h3 style={{ textAlignVertical: "center", textAlign: "center", }}>Books List</h3>
      </div>

      <Link to='/create'>
        <FontAwesomeIcon icon={faBookMedical} style={{ backgroundColor: "lightblue", marginTop: "20" }} /> Add
      </Link>
      <input name="query" placeholder="Search" style={{ marginLeft: "750px" }} onChange={event => setQuery(event.target.value)} />

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ref</Table.HeaderCell>
            <Table.HeaderCell>title</Table.HeaderCell>
            <Table.HeaderCell>auth</Table.HeaderCell>
            <Table.HeaderCell>price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {apiData.filter(post => {
            if (query === '') {
              return post;
            } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
              return post;
            }
          }).map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.title}</Table.Cell>
                <Table.Cell>{data.auth}</Table.Cell>
                <Table.Cell>{data.price}</Table.Cell>
                <Table.Cell>
                  <Link to='/update'>
                    <Button
                      color="blue"
                      onClick={() => setData(data.id, data.title, data.auth, data.price)}>
                      <FontAwesomeIcon icon={faPen} />
                    </Button>
                  </Link>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button color="primary" onClick={() => onDelete(data.id)}>Yes</Button>
                      <Button color="red" onClick={handleClose} autoFocus>
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>

                  <Button color="red" onClick={handleClickOpen} >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
