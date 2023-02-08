import {useState} from 'react';
import './App.css';
import ShopCreate from './components/ShopCreate';
import ShopList from './components/ShopList';

function App(){
  const [shop, setShop] = useState([]);

  const editItemById = (id, newName) => {
    //must find the shop object with like id and adjust it
    //use map for this, to find it, copy over properties and put new title in
    const itemObject = shop.map((item) => {
      if(item.id === id) {
        return {...item, name: newName};  //will end up returning truthy after copying over item properties from original object
      }

      return item;  //ID we are not looking for gets returned back here without touching it
    });

    setShop(itemObject);
  };

  const deleteItemById = (id) => {
    //Use filter function to return a new copy of the array minus the id we don't object to equal to
    const updatedShop = shop.filter((item) => {
      return item.id !== id;
    });

    setShop(updatedShop);  //checks if state is different and will re-render if so
  };

  const onCreateShop = (item) => {
    const updatedShop = [
      ...shop,
      {id: Math.round(Math.random() * 10000), //Not a guarantee there won't be duplicates (normally bad)
      name: item} //rarely does React assign id; normally server side
    ];
    setShop(updatedShop);
  };
  
  return (
    <div className='app'>
      <section className='title'>
        <h1>Grocery Shopping List</h1>
        <h2>...with random image generator</h2>
      </section>
      <ShopList onEdit={editItemById} shop={shop} onDelete={deleteItemById}/>
      <ShopCreate onCreate={onCreateShop}/>
    </div>
  )
}

export default App;
