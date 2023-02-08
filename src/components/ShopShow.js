import './ShopShow.css';
import {useState} from 'react';
import ShopEdit from './ShopEdit';

function ShopShow({item, onDelete, onEdit}){
    const [edit, setEdit] = useState(false);
        
    const handleSubmit = (id, newName) => {
        setEdit(false);
        onEdit(id, newName);
    }

    const handleEditClick = () => {
        setEdit(!edit);
    };

    const handleDeleteClick = () => {
        onDelete(item.id);
    };

    let content = <h3>{item.name}</h3>;
    if (edit) {
        content = <ShopEdit item={item} onSubmit={handleSubmit}/>;
    }
    
    return (
        <div className='shop-show'>
            <img src={`https://picsum.photos/seed/${item.id}/200/125`} alt="random image"/>
            <div>{content}</div>

            <div className='actions'>
                <button className='edit' onClick={handleEditClick}>
                    Edit
                </button>
                <button className='delete' onClick={handleDeleteClick}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default ShopShow;
