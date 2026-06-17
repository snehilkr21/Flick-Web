import axios from "axios"
import { BASE_URL } from "../utils/constant"
function Premium() {
    const [isPremiumUser, setIsPremiumUser] = React.useState(false);
    const verifyPremiumUser = async (response) => {
        const res = await axios.post(`${BASE_URL}/premium/verify`, { response }, { withCredentials: true });
        if (res.data.isPremiumUser) {
            setIsPremiumUser(true);
        }
    }
    const handleBuyClick = async (membershipType) => {
        const order = await axios.post(`${BASE_URL}/payment/create`, { membershipType }, { withCredentials: true });
        console.log("order ", order)
        
        const {amount, keyId, currency, notes, orderId} = order.data;
        // Open Razorpay Checkout
        const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount: amount, // Amount is in currency subunits.
            currency: currency,
            name: 'Filick',
            description: 'Connect to other developers and get your work done',
            order_id: orderId, // This is the order_id created in the backend
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.email,
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
            handler : verifyPremiumUser

            
        };
        const rzp = new Razorpay(options);
        rzp.open();
    }
    return (
        isPremiumUser ? (
            <div className="text-center text-2xl font-bold m-10">
                You are a Premium User
            </div>
        )
        :
        <div className="m-10">
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                    <h1 className="font-bold text-3xl">Silver Membership</h1>
                    <ul>
                        <li> - Chat</li>
                        <li> - 100 Request per day</li>
                        <li> - Blue Tick</li>
                        <li> - 3 Months</li>
                    </ul>
                    <button className="btn btn-secondary" onClick={()=>handleBuyClick("Silver")}>Buy Silver</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
                    <h1 className="font-bold text-3xl">Gold Membership</h1>
                    <ul>
                        <li> - Chat</li>
                        <li> - Unlimited Requests</li>
                        <li> - Blue Tick</li>
                        <li> - Priority Support</li>
                        <li> - 6 Months</li>
                    </ul>
                    <button className="btn btn-primary" onClick={()=>handleBuyClick("Gold")}>Buy Gold</button>
                </div>
            </div>
        </div>
        
    )
}

export default Premium