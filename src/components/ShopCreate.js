import './ShopCreate.css';
import {useState} from 'react';

function ShopCreate(props){
    const [item, setItem] = useState('');

    const onHandleChange = (event) => {
        setItem(event.target.value);
    };

    const onHandleSubmit = (event) => {
        event.preventDefault();
        props.onCreate(item);
        setItem('');
    };

    return (
        <div className='shop-create'>
            <h3>Add a grocery item</h3>
            <form onSubmit={onHandleSubmit}>
                <label>Grocery Name</label>
                <input className='input' value={item} onChange={onHandleChange}/>
                <button className='button'>Add!</button>
            </form>
        </div>
    )
}

export default ShopCreate;
