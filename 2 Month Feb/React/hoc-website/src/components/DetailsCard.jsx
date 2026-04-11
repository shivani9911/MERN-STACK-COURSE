import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const DetailsCard = ({CardTitle , CardDescription }) => {
  return (
    <div>
      <Card className=''>
              <Card.Img variant="top" src="https://tse2.mm.bing.net/th/id/OIP.Xf4lYOponCb2MBx72BI4NAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"/>
              <Card.Body>
                <Card.Title>{CardTitle}</Card.Title>
                <Card.Text>
                  {CardDescription}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
    </div>
  )
}

export default DetailsCard
