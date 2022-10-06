import { useState } from "react";
import { stringToMicroAlgos, microAlgosToString } from '../utils/conversions';


// import ipfs from "../ipfs";

const Farmer = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [editQuantity, setEditQuantity] = useState("")

  const formHandler = async (event) => {
    event.preventDefault();
    props.createProduct({ name, description, image, quantity: parseInt(quantity), amount: stringToMicroAlgos(price) });
  }


  const buyProduct = (product, _quantity) => {
    if (!buyQuantity || buyQuantity <= 0) { alert("Please input a valid figure"); return }
    props.buyProduct(product, buyQuantity);

  };

  const editQuantityHandler = (product) => {
    if (!editQuantity || editQuantity <= 0) { alert("Please input a valid figure"); return }
    props.editQuantity(product, editQuantity);
  }


  return (
    <div style={{ padding: "36px" }}>
      <div className="row row-cols-2 row-cols-md-3 mb-3">
        {props.products.map((product) => (
          <div className="col">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div className="card-body">
                <img
                  style={{ "width": "300px" }}
                  src={product.image}
                  alt=""
                />
                <h3 className="card-title pricing-card-title">
                  {product.name}
                </h3>
                <p>{product.description}</p>

                <h5>Price: {microAlgosToString(product.amount)} ALGO</h5>
                <h5>Quantity: {product.quantity}</h5>
                <div className="d-flex justify-content-between">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="How many do you want to buy"
                    onChange={(e) => setBuyQuantity(e.target.value)}
                  />
                </div>
                {props.address === product.owner &&
                  <>
                    <h5>Edit Quantity</h5>
                    <div className="d-flex justify-content-between">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quantity"
                        onChange={(e) => setEditQuantity(e.target.value)}
                      />
                    </div>
                  </>
                }
                <div className="row">
                  <div className="col-6">
                    <button
                      onClick={() => buyProduct(product)}
                      className="btn btn-outline-primary"
                    >
                      Buy
                    </button>
                  </div>
                  {props.address === product.owner && <div className="col-6">
                    <button
                      onClick={() => editQuantityHandler(product)}
                      className="btn btn-outline-primary"
                    >
                      Edit
                    </button>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-6">
          <form onSubmit={formHandler}>
            <h2>Add your product</h2>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows={5}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <input
                type="text"
                className="form-control"
                placeholder="Image"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Farmer

