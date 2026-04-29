
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer, toast } from 'react-toastify';


import "./style.css";
import { useState } from 'react';
import { useEffect } from 'react';

function App() {


  const [itemName, setItemName] = useState(); //1. Use State Hook
  const [itemData, setData] = useState();

  console.log(itemName)
  const handleOnChange = (event) => {


    setItemName(event.target.value)

    console.log("Typing on Input field")
  };

  function submitfrom(e) {
    e.preventDefault();
    console.log("Form submitted")


    toast.success('Form submitted', {
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


  const getAllItemsData = async () => {
    try {
      const apiResponse = fetch("http://localhost:9090/api/get-all-item");
      const responseData = (await apiResponse).json();
      setData(responseData.data)

      console.log(responseData);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllItemsData();
  }, []);

  console.log(
    itemData , 'itemData ==>'
  )

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
          <div className='col-md-6'>
            <h3 className='border text-center'>Create Item</h3>

            <Form className='my-5'>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control type="Text" placeholder="Enter Item Name" onChange={() => handleOnChange(event)} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Discription</Form.Label>
                  <Form.Control type='text' placeholder='Enter Discription' />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Purchase Price </Form.Label>
                  <Form.Control type="Number" placeholder="Enter Purchase Price" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress1">
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control type='Number' placeholder="Enter Selling Price" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type='Number' placeholder='Enter Quantity' />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Unit</Form.Label>
                  <Form.Select defaultValue="Choose Unit">
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
                  <th>Discription</th>
                  <th>Purchase Price</th>
                  <th>Selling price</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                

                {
                  itemData && itemData.map((each , index) => {
                    return (
                      <tr>
                        <td>{each.name}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>

          </div>
        </div>

      </div>

    </>
  )
}

export default App

