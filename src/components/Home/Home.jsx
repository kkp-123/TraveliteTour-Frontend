import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router";


export default function Home() {
  const navigate = useNavigate();
  const Base_url = import.meta.env.VITE_BASE_URL;

  const [toursData,setToursData] = useState([]);
   const scrollRef = useRef(null);
  
  useEffect(()=>{

    const fetchTour = async ()=>{
      try{

        const tdata = await fetch(`${Base_url}/tourPackage`,{
          method:"GET",
          headers:{"Content-Type":"application/json"}
        }) 
        const result = await tdata.json();
      

        if(result.success && result.data)
        {
            // console.log("data fetch");
            setToursData(result.data.tourData);
        }

      }
      catch(err)
      {
        console.log("error while fetching tour data");
      }
    }
    fetchTour();


  },[])
   useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += 2; // speed of scroll (px per interval)
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0; // reset to start
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
    }, 20); // interval speed (ms)

    return () => clearInterval(interval);
  }, []);

  const hotTours = toursData.filter(tour=>tour.offer.discountPercent>20)
  .sort((a,b)=>a.offer.discountPercent - b.offer.discountPercent);
  
  return (
    <div className="overflow-x-hidden"> {/* Prevent horizontal scroll */}
      {/* Hero Section */}
      <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          src="/assets/images/bgvid.mp4"
          muted
          loop
          autoPlay
          className="absolute top-0 left-0 w-full h-full object-cover"
        ></video>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-black/40 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">TRAVELITE TRAVELS</h1>
          <p className="text-lg md:text-2xl mb-6">
            Plan your trip with us and explore India with the most affordable packages!
          </p>
          <a
            href="/SignIn"
            className="px-6 py-2 bg-white text-green-800 rounded-2xl hover:bg-green-800 hover:text-white transform hover:scale-105 transition-all duration-300"
          >
            Register Now!
          </a>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-10 bg-gray-300 max-w-screen-xl mx-auto">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Travelling opens the doors to creating <span className="text-amber-600">memories</span>
          </h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem ea, numquam dicta
            eveniet exercitationem aut eligendi culpa cum quas nisi?
          </p>
        </div>

        {/* Responsive Image Gallery */}
        <div id="Gallary" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          <img
            className="w-full h-80 object-cover rounded-2xl shadow-md"
            src="https://plus.unsplash.com/premium_photo-1667223722867-cb8922670f29?q=80&w=687&auto=format&fit=crop"
            alt="Travel 1"
          />
          <img
            className="w-full h-80 object-cover rounded-2xl shadow-md"
            src="https://images.pexels.com/photos/2178175/pexels-photo-2178175.jpeg"
            alt="Travel 2"
          />
          <img
            className="w-full h-80 object-cover rounded-2xl shadow-md"
            src="https://images.pexels.com/photos/11020789/pexels-photo-11020789.jpeg"
            alt="Travel 3"
          />
        </div>

      </div>
        {/* hot offers */}
        <div className="hot-selling-section my-10">
  <h2 className="text-3xl font-bold mb-6 text-center">Hot Selling Tours</h2>
  
  <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 py-4">
    {hotTours.map((tour) => (
      <div
        key={tour._id}
        className="tour-card flex-shrink-0 w-72 border border-gray-200 shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 relative"
      >
        <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-md">
          {tour.offer?.discountPercent}% OFF
        </div>

        <img
          src={tour.img_url}
          alt={tour.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold mb-2">{tour.title}</h2>
          <p className="text-gray-600 text-sm mb-2">{tour.description}</p>

          {tour.offer?.hasOffer ? (
            <p className="text-lg font-semibold">
              <span className="line-through text-gray-400 mr-2">${tour.price}</span>
              <span className="text-red-500">${tour.offer.finalPrice}</span>
            </p>
          ) : (
            <p className="text-lg font-semibold">${tour.price}</p>
          )}

          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all mt-2"
            onClick={() => navigate("/booktour", { state: tour })}
          >
            Book Now
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


        
    </div>
  );
}
