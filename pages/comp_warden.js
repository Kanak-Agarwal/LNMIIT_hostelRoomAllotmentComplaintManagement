import React from 'react'
import Link from 'next/link'
import {useEffect,useState}from 'react'
import Header from './header'
import {db} from './firebase-config'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";//

function comp_warden() {
  const [display, setDisp] = useState(false);
  const [dd, setD] = useState("");
  const [d, setDD] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db,"complaints") ;
  const v = () => {
    console.log(dd);
    window.alert("deleted");
  }
  const view = () => {
    console.log(dd);
    window.alert("viewed");
  }
  const b = () => {
    // console.log(users[0].Student1);
    setDisp(true);
    // window.alert(display);
  }
  const stat = () => {
    let g = dd+' '+d ;
    console.log(g);
    window.alert("entered description");
  }
  const ggg = () => {
    let g = dd;
    console.log(g);
    window.alert("Sent to higher authority.");
  }
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    };

    getUsers();
  }, []);
  const deleted = () => {
    
    window.alert("deleted");
  }
  return (
    <div>
      <Header />
        <div class="space"></div>
        <div class="tok">
        <button onClick={view} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click this button to list all the complaints.
        </button>
      
        </div>
        <div>
  {users.map((user) => {
          if( display==true){
            return(<div>
            {""}
              {/* console.log(user); */}
              <k>
              <h1>Swap Request:-</h1>
              <h1>Roll Number-1: {user.Student1}</h1>
              <h1>Roll Number-2: {user.Student2}</h1>
              
              </k>
              
              
              <div class="mani"> 
              <button onClick={bb} class="mani bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click to stop viewing.
        </button>
              
              </div>
              </div>)
            }
          }
          )}

  </div>
        <div class="tok">
            
            <label  class="block mb-2 text-sm font-large text-gray-900 dark:text-gray-900">Enter Roll Number whose room swap request has to be deleted. </label>
            <input value={dd} onChange={(e) => setD(e.target.value)} type="text" id="rollD" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="20ucs021" required />
        </div>
        <div class="tok">
        <button onClick={view} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          View this roll number's complaint.
        </button>
        
        <button onClick={v} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click to delete this roll number complaint.
        </button>
        <div>
            <label  class="block mb-2 text-sm font-large text-gray-900 dark:text-gray-900">Enter description </label>
            <input value={d} onChange={(e) => setDD(e.target.value)} type="text" id="desc" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Resolved/UnderConsideration/Rejected- Enter Descriptioin" required />
        </div>
        <div></div>
        <button onClick={stat} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>

        </div>
        <div class="tok">
        <button onClick={ggg} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click this button if this request need to be sent to higher authority.
        </button>
        </div>
        <div class="tok"><Link href="warden_login">
        <button  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button></Link>
        </div>
        
          
    </div>
  )
}

export default comp_warden