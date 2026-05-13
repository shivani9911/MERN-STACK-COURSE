
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { Modal } from 'react-bootstrap';
import "./style.css";
import { useState } from 'react';
import { useEffect } from 'react';

function App() {


  const [itemName, setItemName] = useState(""); //1. Use State Hook - data strore
  const [description, setDescription] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemData, setData] = useState([]);
  const [unit, setUnit] = useState("");
  console.log(itemName, "Item Name Value")



  async function submitfrom(e) { //Form submit function
    e.preventDefault();

    const data = {
      name: itemName,
      description: description,
      purchasePrice: purchasePrice,
      sellingPrice: sellingPrice,
      quantity: quantity,
      unit: unit
    };
    console.log("Form submitted");
    const apiResponse = await axios.post('http://localhost:9090/api/create-item',
      data
    ).then(console.log("yes")).catch((error) => console.log(error))

    console.log(apiResponse)
    getAllItemsData();

    toast.success('Form submitted', { //Toast notification
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  //2. API call function - backend 
  const getAllItemsData = async () => {
    try {
      const apiResponse = await fetch("http://localhost:9090/api/get-all-item"); //3. API Call
      //4.convert the api response to json format 
      const responseData = await apiResponse.json();
      //5.storting fetch iteam array into the iteamdata state // State madhe Data Store 
      setData(responseData.data || []);

      //login form data to the console from debugging
      console.log(responseData);
      //login error that occur fetch iteam
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  //useEffect - component load zalyavr API call
  useEffect(() => {
    getAllItemsData();
  }, []);

  console.log(itemData, 'itemData ==>');

  const [show, setShow] = useState(false);
  const [id, setId] = useState()

  const handleClose = () => setShow(false);

  const openDeleteModel = (_id) => {
    try {
      setShow(true);
      setId(_id)

      console.log(_id, "_id==>")
      console.log("call delete function")
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      console.log(id, "id==>")
      
      const apiResponse = await axios.delete(`http://localhost:9090/api/delete-item/${id}`)

      setShow(false)

      console.log(apiResponse)

      getAllItemsData();

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>


      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className='text-danger text-center my-5'>CRUD - MERN Stack Project Start</h2>
      <div className='container'>
        <div className='row'>
          {/* {Left Side Form} */}
          <div className='col-md-6'>
            <h3 className='border text-center'>Create Item</h3>

            <Form className='my-5'>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control type="Text" placeholder="Enter Item Name"
                    onChange={(event) => setItemName(event.target.value)} value={itemName} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type='text' placeholder='Enter Description'
                    onChange={(event) => setDescription(event.target.value)} value={description} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Purchase Price </Form.Label>
                  <Form.Control type="Number" placeholder="Enter Purchase Price"
                    onChange={(event) => setPurchasePrice(event.target.value)} value={purchasePrice} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control type='Number' placeholder="Enter Selling Price"
                    onChange={(event) => setSellingPrice(event.target.value)} value={sellingPrice} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type='Number' placeholder='Enter Quantity'
                    onChange={(event) => setQuantity(event.target.value)} value={quantity} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Unit</Form.Label>
                  <Form.Select value={unit} onChange={(e) => setUnit(e.target.value)} >
                    <option>Choose Unit</option>
                    <option>Pice</option>
                    <option>Box</option>
                    <option>kg</option>
                    <option>Gram</option>
                    <option>Litter</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <div className='text-center'>
                <Button variant="primary" type="submit" className='w-50' onClick={submitfrom}>
                  Submit
                </Button>
              </div>

            </Form>
          </div>
          <div className='col-md-6'>
            <h3 className='border text-center'>Get Items</h3>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Item Name</th>
                  <th>Description</th>
                  <th>Purchase Price</th>
                  <th>Selling price</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>


                {
                  itemData && itemData.map((each, index) => { //itemData array loop karun table data dakhvto
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{each.name}</td>
                        <td>{each.description}</td>
                        <td>{each.purchasePrice}</td>
                        <td>{each.sellingPrice}</td>
                        <td>{each.quantity}</td>
                        <td>{each.unit}</td>
                        <td className='d-flex'>
                          <button className='btn btn-success'>Edit</button>
                          <button className='btn btn-danger mx-2' onClick={() => openDeleteModel(each._id)}>
                            Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>

          </div>
        </div>

      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure wan to delete this Item</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default App;

