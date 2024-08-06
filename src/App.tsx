import { useEffect, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import { Response } from './Types/data';
import React from 'react';

const App = React.memo(() => {
  const [showData , setShowData] = useState<boolean>(false);
  const [data, setData] = useState<Response>([]);
    const [loading, setLoading] = useState(true);

    
    useEffect( () => {
      const fetchData = async () => {
        try{
          const res = await fetch('https://server-vg3c.onrender.com/data');
          const parsed = await res.json();
          setData(parsed)
          setLoading(false)
        
        }
        catch(err){
          console.log("An error occured:" , err)
        }
      }
  
      fetchData();
  
    },[])

    if(loading){
      return <div className='w-screen h-screen flex justify-center items-center bg-black text-white'>Loading...</div>
    }
    
  return (
    <div className='w-screen h-full  flex flex-col justify-between bg-black'>
      <div className='h-full space-y-6 flex flex-col items-center'>
        <h1 className='text-white text-4xl text-center py-4'>Data Table</h1>
        <p className='text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla consequatur voluptas odio iure possimus quod voluptate ducimus! Ex cupiditate laborum debitis molestiae accusamus doloremque, quasi, ipsum modi alias magnam illum.</p>
        <ul className='flex flex-col items-center'>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <button onClick={() => setShowData(!showData)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl mx-auto'>Show Data</button>
      </div>
      {showData ? <Table Data ={data} /> : null}
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quo quis optio sequi exercitationem repudiandae dolore magni, id omnis dolorum praesentium itaque sed modi explicabo atque expedita mollitia doloribus voluptatibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, earum praesentium commodi optio enim nostrum nemo asperiores alias necessitatibus tempora. Sapiente, minus maxime! Magnam neque, maxime magni laudantium saepe dolores!</p>
      </div>
    </div>
  );
});

export default App;


