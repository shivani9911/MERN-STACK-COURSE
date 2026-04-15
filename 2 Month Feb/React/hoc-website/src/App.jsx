import 'bootstrap/dist/css/bootstrap.min.css';
import DetailsCard from './components/DetailsCard';  //Resuable Components


function App() {


  //javascript concepts

  console.log("HOC");

  //variable
  //Declaration
  const name = "HOC" // we can not change const value
  let age = 24 // we can change the let value // it's block scop
  var city = "Karad" //we can variable redecleare and reassign value
  console.log(name, "shivani");
  console.log(city, "karad");
  console.log(age, "24");

  //string
  //In double quotation ""
  const a = "Hoc solution tech"
  console.log(a,);

  //Array
  //In sqare braket[]
  const b = ["Apple", "Banana", "Mango"];

  //object
  //In curly braces{} with key & value
  const data = {
    name: "test",
    city: "pune",
  };

  // if-else - ternari operator

  const fullName = "shivani"
  if (fullName == "shivani") {
    console.log(true);
  } else {
    console.log(false);
  }

  //function
  function addNumber() {
    console.log("Click");
  }

  //arrarys of object
  const cardData = [
    {
      CardTitle: "Test 1",
      CardDescription: "Test Description 1"
    },
    {
      CardTitle: "Test 2",
      CardDescription: "Test Description 2"
    },
    {
      CardTitle: "Test 2",
      CardDescription: "Test Description 2"
    },
    {
      CardTitle: "Test 2",
      CardDescription: "Test Description 2"
    },
    {
      CardTitle: "Test 2",
      CardDescription: "Test Description 2"
    },
    {
      CardTitle: "Test 2",
      CardDescription: "Test Description 2"
    },
  ];

  console.log(cardData, "======")
  return (
    <>
      <button className='btn btn-primary' onClick={addNumber}> Click Me</button>
      <div className='container'>
        <div className='row my-2'>
          { cardData.map((each) => {
            <div className='col-md-3'>
              {/* CardTitle - props || cardDescription -props || we can add more props also */}
s
              <DetailsCard CardTitle={each.CardTitle} CardDescriptionard={each.CardDescription} />         

            </div>
          }
          )
            }



        </div>

      </div>
    </>
  )
}

export default App 
