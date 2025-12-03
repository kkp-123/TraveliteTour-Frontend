import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function BookTour() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTour = location.state || {};

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [email, setEmail] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [toast, setToast] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const logindata = JSON.parse(localStorage.getItem("logindetails")) || {};
  const tourid = selectedTour._id;
  const userid = logindata?.userid;
  const title = selectedTour.title;

  useEffect(()=>{

     if (!logindata || !logindata?.isLogin) {
      navigate("/Login");
      return;
    }
  },[])

  if (!tourid) {
    return <p className="p-10 text-center">Invalid Tour Selected</p>;
  }

  const showToast = (msg) => {
  setToast(msg);
  setTimeout(() => setToast(null), 3000);
};


  // Use offer price if available
  const pricePerPerson = selectedTour.offer?.hasOffer
    ? selectedTour.offer.finalPrice
    : selectedTour.price;

  const serviceCharge = 10;
  const total = pricePerPerson * guests + serviceCharge;
  const ratingsTotal = reviews.reduce((sum, item) => sum + item.rating, 0);

  useEffect(() => {
    console.log(selectedTour);
  }, [selectedTour]);

  // Fetch reviews
  const loadReviews = async () => {
    const res = await fetch(`${baseUrl}/ratings/${tourid}`);
    const dataRev = await res.json();
    setReviews(dataRev.reviewsData || []);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  // Booking handler
  const handleBooking = async () => {
    if (!fullName || !email || !phone || !guests || !date) {
      alert("Please fill all the fields!");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/sendOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          purpose:"Booking"
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSendOtp(true);
        showToast("OTP sent to your email!");
      }
      else{
        showToast(result?.message);
      }
    } catch (err) {
      console.error("Error while sending OTP:", err);
      alert(
        "Something went wrong while sending OTP. Please check your internet or server."
      );
    }
  };

  const handleOtpVerify = async () => {
    try {
      const response = await fetch(`${baseUrl}/verifyOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();
      showToast(result.message);

      if (result.success) {
        try {
          const bookingResponse = await fetch(`${baseUrl}/BookingTour`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              name: fullName,
              title,
              contactno: phone,
              departure_date: date,
              persons: guests,
              price: total,
              userid:userid,
              tourid:tourid

            }),
          });
          const bookingResult = await bookingResponse.json();
          showToast(bookingResult.message);
          navigate("/UserBookingDetails");
        } catch (err) {
          console.log("Error while booking tour:", err);
          alert("Something went wrong while booking. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      alert(
        "Something went wrong while verifying OTP. Please check your server or internet."
      );
    }
  };

  const reviewSubmit = async () => {
    try {
      const response = await fetch(`${baseUrl}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          comment,
          tourid,
          username: logindata.username,
          userid: logindata.userid,
        }),
      });
      const data = await response.json();

      if (data.success) {
        alert(data.message);
        showToast("Review added successfully!");
        loadReviews();
        setRating(0);
        setComment("");
      } else {
        showToast(data.message);
        // setTimeout(() => setToast(null), 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const Toast = ({ message, onClose }) => (
    <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
      {message}
      <button className="ml-3 text-white text-lg leading-none" onClick={onClose}>
        ✖
      </button>
    </div>
  );

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="p-6 md:p-20 flex flex-col-reverse md:flex-row justify-center items-center md:gap-10">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      <div className="flex flex-col w-full md:w-1/2 gap-6 md:p-20">
        <img
          className="w-full md:w-full h-auto rounded-2xl object-cover shadow-md"
          src={selectedTour.img_url}
          alt=""
        />
        <div className="w-full md:w-full p-5 rounded-xl shadow-md flex flex-col gap-4">
          <p className="text-2xl font-bold">{selectedTour.title}</p>
          <p className="text-md">Rating</p>
          <div className="flex flex-col md:flex-row md:gap-6 gap-2">
            <p className="text-md">Location: India</p>
            {selectedTour.offer?.hasOffer?( <p className="text-md line-through">Price/person: ₹{selectedTour.price}</p>):( <p className="text-md ">Price/person: ₹{pricePerPerson}</p>)}
           
            {selectedTour.offer?.hasOffer && (
              <p className="text-green-600 font-bold"> Price/person: ₹{selectedTour.offer.finalPrice}</p>
            )}
          </div>
          <p className="text-2xl font-bold mt-4">Description</p>
          <p className="text-md">{selectedTour.description}</p>

          {/* Ratings */}
          <div className="mt-4">
            <p className="text-2xl mb-2">Ratings (data)</p>
            <div className="flex flex-row gap-2 md:gap-5 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} className="flex items-center gap-1 p-2 bg-gray-100 rounded" onClick={() => setRating(num)}>
                  <img
                    src={num <= rating ? "/assets/images/star.png" : "/assets/images/blankStar.png"}
                    className="w-5 h-5"
                  />
                </button>
              ))}
            </div>

            {/* Input + Button */}
            <div className="relative mt-4 w-full md:w-3/4">
              <input
                type="text"
                className="px-5 py-2 w-full rounded-full shadow-md border"
                placeholder="Write a review..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button
                type="submit"
                onClick={reviewSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-full"
              >
                Submit
              </button>
              {toast && <Toast message={toast} onClose={() => setToast(null)} />}
            </div>

            <div className="mt-4">
              <p className="text-2xl mb-2">Reviews</p>
              <div className="max-h-40 overflow-y-auto border-t border-gray-300 pt-4">
                {reviews.map((i, index) => (
                  <div key={index} className="flex flex-row gap-6 md:gap-10 mt-5 justify-between">
                    <div className="flex flex-row gap-4 items-center">
                      <img src="/assets/images/user2.png" className="h-[40px] w-[40px] rounded-full" />
                      <div>
                        <h1 className="text-lg font-semibold">{i.username}</h1>
                        <p className="text-gray-500 text-sm">{formatDate(i.createdAt)}</p>
                        <p className="mt-3 text-gray-800">{i.comment}</p>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <h1 className="text-xl">{i.rating}</h1>
                      <img src="/assets/images/star.png" className="h-[40px] w-[40px]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full md:w-1/3 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold">₹{pricePerPerson}</p>
          <div className="flex items-center gap-1 text-yellow-500 text-2xl font-semibold mt-3">
            ★ {ratingsTotal / reviews.length || 0}
            <span className="text-gray-600 text-2xl">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-semibold mb-1">Information</p>
          <input type="text" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 mb-2 border rounded" />
          <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 mb-2 border rounded" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-2 border rounded" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 mb-2 border rounded" />
          <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full p-2 mb-2 border rounded" placeholder="Guests" />
        </div>

        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between mb-2">
            <span>₹{pricePerPerson} × {guests} person</span>
            <span>₹{pricePerPerson * guests}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Service charge</span>
            <span>₹{serviceCharge}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button onClick={handleBooking} className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition">
            Book Now
          </button>
        </div>

        {/* OTP verification */}
        {sendOtp && (
          <div className="border-t border-gray-300 pt-4">
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 mb-2 border rounded" placeholder="Enter OTP" />
            <button onClick={handleOtpVerify} className="w-full bg-green-800 text-white py-2 rounded-full hover:bg-green-900 hover:cursor-pointer transition">
              Submit OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
