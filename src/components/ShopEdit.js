import './ShopEdit.css';
import {useState} from 'react';

function ShopEdit({item, onSubmit}){
    const [name, setName] = useState(item.name);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    //keeps track of save button
    const handleSaveName = (event) => {
        event.preventDefault();
        onSubmit(item.id, name);
    };

    return (
        <form className='shop-edit' onSubmit={handleSaveName} >
            <label>Grocery Name</label>
            <input className='input' value={name} onChange={handleNameChange}/>
            <button className='button'>
                Save
            </button>
        </form>
    )
}

export default ShopEdit;
