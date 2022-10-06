import { useState, useEffect } from "react";
import './App.css';
import { indexerClient, myAlgoConnect } from "./utils/constants";
import Farmer from "./components/Farmer"
import Navbar from "./components/Navbar";
import Cover from "./components/Cover";
import { editQuantityAction, getProductsAction, createProductAction, buyProductAction } from "./utils/marketplace";




function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchBalance = async (accountAddress) => {
    indexerClient.lookupAccountByID(accountAddress).do()
      .then(response => {
        const _balance = response.account.amount;
        setBalance(_balance);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const connectWallet = async () => {
    myAlgoConnect.connect()
      .then(accounts => {
        const _account = accounts[0];
        console.log(_account)
        setAddress(_account.address);
        fetchBalance(_account.address);
        if (_account.address) getProducts(_account.address);
      }).catch(error => {
        console.log('Could not connect to MyAlgo wallet');
        console.error(error);
      })
  };



  const buyProduct = async (product, count) => {
    console.log(product, count);
    buyProductAction(address, product, count)
      .then(() => {
        getProducts();
        fetchBalance(address);
      })
      .catch(error => {
        console.log(error)
      })
  };

  const editQuantity = async (product, _quantity) => {
    editQuantityAction(address, product, _quantity)
      .then(() => {
        getProducts(address);
        fetchBalance(address);
      })
      .catch(error => {
        console.log(error)
      })
  };

  const getProducts = async (_address) => {
    getProductsAction()
      .then(products => {
        if (products) {
          setProducts(products);
        }
      })
      .catch(error => {
        console.log(error);
      })

  };

  const createProduct = async (data) => {
    console.log(address, data);
    createProductAction(address, data)
      .then(() => {
        getProducts();
        fetchBalance(address);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <>
      {address ? <div>
        <Navbar balance={balance} />
        <Farmer
          products={products}
          createProduct={createProduct}
          buyProduct={buyProduct}
          editQuantity={editQuantity}
          address={address}
        />
      </div> : <Cover name={"Farm Scribe"} coverImg={"https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"} connect={connectWallet} />}
    </>
  );
}

export default App;
