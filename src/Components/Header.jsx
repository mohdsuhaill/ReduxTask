import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
    const  List = useSelector((state) => state.prodreducer);

    const totalPrice = List.reduce(
      (total, data) => total + data.price * (data.quantity || 1),
      0
    );
  
    const totalQuantity = List.reduce(
      (total, data) => total + (data.quantity || 1),
      0
    );
    return (
        <div>
        <h1 className="text-center text-danger"> Added Cards</h1>
        <div className="d-flex flex-wrap justify-content-between p-3">
        <div><h3>Total Quantity={totalQuantity}</h3></div>
        <div><h3 >Total Price={totalPrice}</h3></div>
        </div>
        </div>
    );
};
export default Header;