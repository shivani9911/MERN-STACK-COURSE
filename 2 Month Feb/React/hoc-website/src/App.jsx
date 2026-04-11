import 'bootstrap/dist/css/bootstrap.min.css';
import DetailsCard from './components/DetailsCard';  //Resuable Components


function App() {

  return (
    <>

      <div className='container'>
        <div className='row my-2'>
          <div className='col-md-3'>
            {/* CardTitle - props || cardDescription -props || we can add more props also */}
            <DetailsCard CardTitle='HOC' CardDescription='karad' />
          </div>
          <div className='col-md-3'>
            <DetailsCard CardTitle='HOC' CardDescription='karad' />
          </div>
          <div className='col-md-3'>
            <DetailsCard CardTitle='HOC' CardDescription='karad' />
          </div>
          <div className='col-md-3'>
            <DetailsCard CardTitle='HOC' CardDescription='karad' />
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-md-3'>
            <DetailsCard CardTitle='HOC' CardDescription='karad' />
          </div>
          <div className='col-md-3'>
            <DetailsCard CardTitle='HOC' CardDescription='karad' />
          </div>
          <div className='col-md-3'>
            <DetailsCard CardTitle='HOC' CardDescription='karad' />
          </div>
          <div className='col-md-3'>
            <DetailsCard CardTitle='HOC' CardDescription='karad' />
          </div>
        </div>

      </div>
    </>
  )
}

export default App 
