"use client";
import { useState } from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";

const Cart = ({ isOpen = false, onClose = () => {} }) => {
  const [confirmDelete, setConfirmDelete] = useState(null); // Store the item ID to be deleted
  const [editingQuantity, setEditingQuantity] = useState(null); // Store the item ID being edited
  const [tempQuantity, setTempQuantity] = useState(""); // Temporary quantity value while editing
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      image: "/api/placeholder/60/60",
    },
    {
      id: 2,
      name: "Smartphone Case",
      price: 24.99,
      quantity: 2,
      image: "/api/placeholder/60/60",
    },
    {
      id: 3,
      name: "USB-C Cable",
      price: 12.99,
      quantity: 1,
      image: "/api/placeholder/60/60",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleQuantityDoubleClick = (id, currentQuantity) => {
    setEditingQuantity(id);
    setTempQuantity(currentQuantity.toString());
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setTempQuantity(value);
    }
  };

  const handleQuantitySubmit = (id) => {
    const newQuantity = parseInt(tempQuantity) || 0;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      // If quantity is 0 or invalid, remove the item
      setCartItems(cartItems.filter((item) => item.id !== id));
    }
    setEditingQuantity(null);
    setTempQuantity("");
  };

  const handleQuantityKeyDown = (e, id) => {
    if (e.key === "Enter") {
      handleQuantitySubmit(id);
    } else if (e.key === "Escape") {
      setEditingQuantity(null);
      setTempQuantity("");
    }
  };

  const handleQuantityBlur = (id) => {
    handleQuantitySubmit(id);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setConfirmDelete(null);
  };

  const handleDeleteClick = (id) => {
    setConfirmDelete(id);
  };

  const cancelDelete = () => {
    setConfirmDelete(null);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const itemToDelete = cartItems.find((item) => item.id === confirmDelete);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-60 transition-opacity duration-200"
            onClick={cancelDelete}
          />
          <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all duration-200 scale-100">
              <div className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-500" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Remove Item
                </h3>

                <p className="text-gray-500 text-sm mb-6">
                  Are you sure you want to remove "{itemToDelete?.name}" from
                  your cart?
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => removeItem(confirmDelete)}
                    className="flex-1 px-4 py-2.5 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors duration-150"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-[500px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-900">Cart</h2>
              <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-12 h-12 mb-3 text-gray-300" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="w-15 h-15 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={editingQuantity === item.id}
                      >
                        <Minus className="w-4 h-4 text-gray-500" />
                      </button>

                      {editingQuantity === item.id ? (
                        <input
                          type="text"
                          value={tempQuantity}
                          onChange={handleQuantityChange}
                          onKeyDown={(e) => handleQuantityKeyDown(e, item.id)}
                          onBlur={() => handleQuantityBlur(item.id)}
                          className="w-8 text-center text-sm font-medium border border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          autoFocus
                          maxLength="3"
                        />
                      ) : (
                        <span
                          className="w-8 text-center text-sm font-medium cursor-pointer hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
                          onDoubleClick={() =>
                            handleQuantityDoubleClick(item.id, item.quantity)
                          }
                          title="Double-click to edit"
                        >
                          {item.quantity}
                        </span>
                      )}

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        disabled={editingQuantity === item.id}
                      >
                        <Plus className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors group-hover:opacity-100"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 p-6">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-medium border-t border-gray-100 pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-lg harmonia-regular hover:bg-gray-800 transition-colors">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
