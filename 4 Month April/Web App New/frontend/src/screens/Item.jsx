import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Item() {

  // ----------------------
  // State Variables
  // ----------------------
  const [itemName, setItemName] = useState("")
  const [discription, setDiscription] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("")

  // List of all items from API
  const [itemData, setItemData] = useState([])

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState("")

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false)
  const [editItem, setEditItem] = useState(null)  // stores item being edited

  // ----------------------
  // Helper: get token from localStorage
  // ----------------------
  const getToken = () => localStorage.getItem("token")

  // ----------------------
  // CREATE - Submit new item form
  // ----------------------
  const SubmitForm = async (e) => {
    try {
      e.preventDefault()

      const data = {
        name: itemName,
        decription: discription,
        sellingPrice: sellingPrice,
        purchasePrice: purchasePrice,
        quantity: quantity,
        unit: unit
      }

      // Send POST request with token in headers
      await axios.post(
        `${import.meta.env.VITE_API_URL_BACKED}/create-item`,
        data,
        {
          headers: { "x-auth-token": getToken() }
        }
      )

      // Clear form fields after submit
      setItemName("")
      setDiscription("")
      setPurchasePrice("")
      setSellingPrice("")
      setQuantity("")
      setUnit("")

      // Refresh item list
      getAllItemsData()

      toast.success("Item Added Successfully!")

    } catch (error) {
      console.log(error)
      toast.error("Failed to add item!")
    }
  }

  // ----------------------
  // READ - Fetch all items from API
  // ----------------------
  const getAllItemsData = async () => {
    try {
      const apiResponse = await axios.get(
        `${import.meta.env.VITE_API_URL_BACKED}/get-all-item`,
        {
          headers: { "x-auth-token": getToken() }
        }
      )

      setItemData(apiResponse.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  // Load items when page first opens
  useEffect(() => {
    getAllItemsData()
  }, [])

  // ----------------------
  // DELETE - Open confirmation modal
  // ----------------------
  const openDeleteModal = (_id) => {
    setShowDeleteModal(true)
    setDeleteId(_id)
  }

  // DELETE - Confirm and delete item
  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL_BACKED}/delete-item/${deleteId}`,
        {
          headers: { "x-auth-token": getToken() }
        }
      )

      setShowDeleteModal(false)
      getAllItemsData()
      toast.success("Item Deleted!")

    } catch (error) {
      console.log(error)
      toast.error("Failed to delete item!")
    }
  }

  // ----------------------
  // EDIT - Open edit modal with item data pre-filled
  // ----------------------
  const openEditModal = (item) => {
    // Store the item we want to edit in state
    setEditItem(item)
    setShowEditModal(true)
  }

  // EDIT - Submit updated item to API
  const handleEditSubmit = async () => {
    try {
      // Send PUT request with updated item data
      await axios.put(
        `${import.meta.env.VITE_API_URL_BACKED}/update-item`,
        {
          id: editItem._id,              // which item to update
          name: editItem.name,
          decription: editItem.decription,
          sellingPrice: editItem.sellingPrice,
          purchasePrice: editItem.purchasePrice,
          quantity: editItem.quantity,
          unit: editItem.unit
        },
        {
          headers: { "x-auth-token": getToken() }
        }
      )

      setShowEditModal(false)
      getAllItemsData()
      toast.success("Item Updated!")

    } catch (error) {
      console.log(error)
      toast.error("Failed to update item!")
    }
  }

  return (
    <>
      <h1 className="text-danger text-center my-5"><b>Manage Items</b></h1>

      <div className="container">
        <div className="row">

          {/* ---- LEFT SIDE: Create Item Form ---- */}
          <div className="col-md-5">
            <h3 className="border text-center p-2">Create Item</h3>

            <Form className="my-4">
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Purchase Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Purchase Price"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Selling Price"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Unit</Form.Label>
                  <Form.Select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="">Choose Unit</option>
                    <option>Piece</option>
                    <option>Box</option>
                    <option>Kg</option>
                    <option>Gram</option>
                    <option>Liter</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <div className="text-center">
                <Button variant="primary" type="submit" className="w-50" onClick={SubmitForm}>
                  Add Item
                </Button>
              </div>
            </Form>
          </div>

          {/* ---- RIGHT SIDE: Items Table ---- */}
          <div className="col-md-7">
            <h3 className="border text-center p-2">All Items</h3>

            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Buy Price</th>
                  <th>Sell Price</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {itemData && itemData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.decription}</td>
                    <td>{item.purchasePrice}</td>
                    <td>{item.sellingPrice}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>
                      {/* Edit button - opens edit modal with this item's data */}
                      <button
                        className="btn btn-success btn-sm me-1"
                        onClick={() => openEditModal(item)}
                      >
                        Edit
                      </button>
                      {/* Delete button - opens delete confirmation modal */}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => openDeleteModal(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Show message if no items */}
                {itemData && itemData.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">No items found. Add your first item!</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

        </div>
      </div>

      {/* ---- DELETE Confirmation Modal ---- */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      {/* ---- EDIT Modal ---- */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editItem && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editItem.name}
                  // Update editItem state when user types
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={editItem.decription}
                  onChange={(e) => setEditItem({ ...editItem, decription: e.target.value })}
                />
              </Form.Group>

              <Row>
                <Form.Group as={Col} className="mb-2">
                  <Form.Label>Purchase Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editItem.purchasePrice}
                    onChange={(e) => setEditItem({ ...editItem, purchasePrice: e.target.value })}
                  />
                </Form.Group>

                <Form.Group as={Col} className="mb-2">
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editItem.sellingPrice}
                    onChange={(e) => setEditItem({ ...editItem, sellingPrice: e.target.value })}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} className="mb-2">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={editItem.quantity}
                    onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                  />
                </Form.Group>

                <Form.Group as={Col} className="mb-2">
                  <Form.Label>Unit</Form.Label>
                  <Form.Select
                    value={editItem.unit}
                    onChange={(e) => setEditItem({ ...editItem, unit: e.target.value })}
                  >
                    <option>Piece</option>
                    <option>Box</option>
                    <option>Kg</option>
                    <option>Gram</option>
                    <option>Liter</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleEditSubmit}>Save Changes</Button>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Item
