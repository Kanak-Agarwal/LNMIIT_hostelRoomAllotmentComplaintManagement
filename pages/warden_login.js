import React from 'react'
import Link from 'next/link'
import {useEffect,useState}from 'react'
import Header from './header'
import {db} from './firebase-config'
import {auth} from './firebase-config'
import { signOut } from 'firebase/auth';
import { saveAs } from 'file-saver'
import { jsPDF } from "jspdf";
import { useRouter } from "next/router"

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function warden_login() {
  const router = useRouter();

    const signUserOut = () => {
        signOut(auth).then(() => {
            window.alert("logged out")
            router.push('/run')
        });
      };
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [display, setD] = useState(false);
  const usersCollectionRef = collection(db,"flag") ;
  const usersCollectionRef2 = collection(db,"users") ;
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const data2 = await getDocs(usersCollectionRef2);
      setUsers2(data2.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    };

    getUsers();
  }, []);

  const updateUser = async (id, val) => {
    const userDoc = doc(db, "flag", id);
    const newFields = { flag: val };
    await updateDoc(userDoc, newFields);
  };

// let g = users[0];
// console.log("its g time"+g)
  const func1 = () => {
    updateUser("WRd6i3Rp9LenZYLXZQYj", "true");
    window.alert(" Enabled");
  }
  const funcc1 = () => {
    updateUser("WRd6i3Rp9LenZYLXZQYj", "false");
    window.alert("Disabled ");
  }
  
  const func2 = () => {
    console.log(users2)
    
let data = { a: 'aaa' , b: 'bbb' }
var blob = ""

// var s = "my csv text content";
var doc = new jsPDF();
users2.forEach(function(gg, i){
    doc.text(2, 40 + (i * 20), 
        "RollNumber: " + gg.RollNo+
        " Hostel: " + gg.RollNo+
        " RoomNumber: " + gg.room
        // + "\n"+1
         
        );
});
doc.save('Test.pdf');
window.alert("DOWNLOADED");
  }
  const func3 = () => {
    
    window.alert("Disabled");
  }
  return (
    <div>
      <div>
        <Header />
      </div>
      <div class="space"></div>
      <div class="valed">
                <div class="ll max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfV72jN_mCWtvAqBcmTtmXbVu00GVbAyLFYA&usqp=CAU" alt="Sunset in the mountains" />
        <div class="px-6 py-4">
        <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1">
  You are present in Warden section
</span>
        </div>
        </div>
                </div>
      <div>
        
        
        <button onClick={func1} class="val3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click to enable room allot forum.
      </button>
      <button onClick={funcc1} class="val3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click to disable room allot forum.
      </button>
      
        <button onClick={func2} class="val3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download combined room allotment list
      </button>
      
      <Link href="details">
        <button  class="val3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Student Details
      </button></Link>
      {/* <Link href="comp_warden">
        <button  class="val3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Handle Complaints
      </button></Link> */}
      <Link href="make_announce">
        <button  class="val3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Make Announcement
      </button></Link>
      
        <button onClick={signUserOut} class="val3  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Log Out
      </button>
      <div class="space2"></div>
  

 
      

  </div>
    </div>
    
  )
}

export default warden_login