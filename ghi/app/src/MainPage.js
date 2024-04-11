import backgroundImage from "./images/inventory.jpg"

function MainPage() {
  return (
    <div>
      <div className="px-0 py-0 mb-0 text-center"
      style={{
      backgroundImage: `url(${backgroundImage})`,
      minHeight: '100vh',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundAttachment: 'scroll',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
      }}>
        <div className="col-lg-5 mx-auto my-5 text-center row align-items-center" >
          <div className="bg-dark text-white my-5">
            <h1 className="display-5 fw-bold py-3">CarCar</h1>
            <p className="lead mb-4">
              The premiere solution for automobile dealership
              management!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
