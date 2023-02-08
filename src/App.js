import axios from 'axios';
import {useState, useEffect} from 'react';
import './App.css';
import ShopCreate from './components/ShopCreate';
import ShopList from './components/ShopList';

function App(){
  const [shop, setShop] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:3001/items');

    //will now use reponse to update state data
    setShop(response.data);
  };

  useEffect(() => { //called upon first site render
    fetchItems();
  }, []); //using empty array so useEffect is never called again

  const editItemById = async (id, newName) => {
    const response = await axios.put(`http://localhost:3001/items/${id}`, {
      name: newName
    });

    //must find the shop object with like id and adjust it
    //use map for this, to find it, copy over properties and put new title in
    const itemObject = shop.map((item) => {
      if(item.id === id) {
        return {...item, ...response.data};  //will end up returning truthy after copying over item properties from original object
      }

      return item;  //ID we are not looking for gets returned back here without touching it
    });

    setShop(itemObject);
  };

  const deleteItemById = async (id) => {
    await axios.delete(`http://localhost:3001/items/${id}`);
    
    //Use filter function to return a new copy of the array minus the id we don't object to equal to
    const updatedShop = shop.filter((item) => {
      return item.id !== id;
    });

    setShop(updatedShop);  //checks if state is different and will re-render if so
  };

  const onCreateShop = async (item) => {
    const response = await axios.post('http://localhost:3001/items', {
      name: item
    })
    const updatedShop = [
      ...shop,
      response.data  //no longer manually adding data; but data returned to us 
    ];
    setShop(updatedShop);
  };
  
  return (
    <div className='app'>
      <h1>Grocery Shopping List</h1>
      <h2>...with random image generator</h2>
      <ShopList onEdit={editItemById} shop={shop} onDelete={deleteItemById}/>
      <ShopCreate onCreate={onCreateShop}/>
    </div>
  )
}

export default App;
