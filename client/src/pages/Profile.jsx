import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Profile(){

return(

<>

<Navbar/>

<div className="d-flex">

<Sidebar/>

<div className="container p-5">

<div className="card shadow">

<div className="card-body text-center">

<img
src="https://i.pravatar.cc/150"
alt=""
className="rounded-circle"
/>

<h3 className="mt-3">

Admin

</h3>

<p>

admin@gmail.com

</p>

</div>

</div>

</div>

</div>

</>

);

}