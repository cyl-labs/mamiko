"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import CheckoutButton from "./CheckoutButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function Cart({
  user,
  items,
  isOpen = false,
  onClose = () => {},
  setItems,
}) {
  const [confirmDelete, setConfirmDelete] = useState(null); // Store the item ID to be deleted
  const [editingQuantity, setEditingQuantity] = useState(null); // Store the item ID being edited
  const [tempQuantity, setTempQuantity] = useState(""); // Temporary quantity value while editing
  const [cartProducts, setCartProducts] = useState([]);
  const [profile, setProfile] = useState();

  async function selectCartProducts() {
    const ids = items.map((item) => item.id);
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .in("id", ids);

    if (error) console.error(error);
    else {
      setCartProducts(data);
    }
  }

  function findCartProduct(id) {
    return cartProducts.find((product) => product.id === id);
  }

  async function updateCartQuantity(id, quantity) {
    if (quantity > 0) {
      const newItems = items.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      );

      setItems(newItems);

      const { error } = await supabase
        .from("Carts")
        .update({ items: newItems })
        .eq("uid", user.id);

      if (error) console.error(error);
    }
  }

  async function deleteItem(id) {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);

    const { error } = await supabase
      .from("Carts")
      .update({ items: newItems })
      .eq("uid", user.id);

    if (error) console.error(error);
  }

  async function selectProfile() {
    const { data, error } = await supabase
      .from("Profiles")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) console.error(error);
    else setProfile(data);
  }

  useEffect(() => {
    if (!user) {
      const guestCart = localStorage.getItem("guestCart");
      const guestItems = guestCart ? JSON.parse(guestCart) : [];
      setItems(guestItems);
    }
  }, []);

  useEffect(() => {
    if (user) selectProfile();
  }, [user]);

  useEffect(() => {
    if (items && items.length > 0) {
      selectCartProducts();
    }
  }, [items]);

  // const handleQuantityDoubleClick = (id, currentQuantity) => {
  //   setEditingQuantity(id);
  //   setTempQuantity(currentQuantity.toString());
  // };

  // const handleQuantityChange = (e) => {
  //   const value = e.target.value;
  //   // Only allow numbers
  //   if (value === "" || /^\d+$/.test(value)) {
  //     setTempQuantity(value);
  //   }
  // };

  // const handleQuantitySubmit = (id) => {
  //   const newQuantity = parseInt(tempQuantity) || 0;
  //   if (newQuantity > 0) {
  //     updateQuantity(id, newQuantity);
  //   } else {
  //     // If quantity is 0 or invalid, remove the item
  //     setCartItems(cartItems.filter((item) => item.id !== id));
  //   }
  //   setEditingQuantity(null);
  //   setTempQuantity("");
  // };

  // const handleQuantityKeyDown = (e, id) => {
  //   if (e.key === "Enter") {
  //     handleQuantitySubmit(id);
  //   } else if (e.key === "Escape") {
  //     setEditingQuantity(null);
  //     setTempQuantity("");
  //   }
  // };

  // const handleQuantityBlur = (id) => {
  //   handleQuantitySubmit(id);
  // };

  // const removeItem = (id) => {
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  //   setConfirmDelete(null);
  // };

  // const handleDeleteClick = (id) => {
  //   setConfirmDelete(id);
  // };

  // const cancelDelete = () => {
  //   setConfirmDelete(null);
  // };

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );
  // const tax = subtotal * 0.08;
  // const total = subtotal + tax;

  // const itemToDelete = cartItems.find((item) => item.id === confirmDelete);

  if (items) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-40 transition-opacity duration-300"
            onClick={onClose}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed right-0 top-0 h-full w-5/6 md:w-[500px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 md:p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-medium text-gray-900">Cart</h2>
                <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {items.length}
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
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingCart className="w-12 h-12 mb-3 text-gray-300" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {items.map((item) => {
                    const product = findCartProduct(item.id);
                    if (!product) return null;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 group"
                      >
                        <div className="w-15 h-15 bg-[#b1d5ed] rounded flex items-center justify-center">
                          <div className="w-12 h-12 bg-[#e0f0f9] rounded relative">
                            <Image src={product?.image_url} alt="" fill />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {product?.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ${product?.price * item.quantity}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
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
                              onKeyDown={(e) =>
                                handleQuantityKeyDown(e, item.id)
                              }
                              onBlur={() => handleQuantityBlur(item.id)}
                              className="w-8 text-center text-sm font-medium border border-blue-300 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              autoFocus
                              maxLength="3"
                            />
                          ) : (
                            <span
                              className="w-8 text-center text-sm font-medium cursor-pointer hover:bg-gray-100 rounded px-1 py-0.5 transition-colors"
                              onDoubleClick={() =>
                                handleQuantityDoubleClick(
                                  item.id,
                                  item.quantity
                                )
                              }
                              title="Double-click to edit"
                            >
                              {item.quantity}
                            </span>
                          )}

                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            disabled={editingQuantity === item.id}
                          >
                            <Plus className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="p-1 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors group-hover:opacity-100"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will remove
                                this item from your cart.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="msx-sm:flex max-sm:flex-row max-sm:gap-4">
                              <DialogClose asChild>
                                <Button
                                  className="max-sm:w-1/2"
                                  type="button"
                                  variant="link"
                                >
                                  Close
                                </Button>
                              </DialogClose>
                              <DialogClose className="max-sm:w-1/2" asChild>
                                <Button
                                  className="bg-[#ed5471] text-white"
                                  type="button"
                                  variant="link"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  Delete
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-6">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      {/* ${subtotal.toFixed(2)} */}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      {/* ${tax.toFixed(2)} */}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium border-t border-gray-100 pt-3">
                    <span>Total</span>
                    <span>
                      $
                      {items
                        .reduce((acc, item) => {
                          const product = findCartProduct(item.id);
                          if (!product) return acc;

                          return acc + product?.price * item.quantity;
                        }, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
                <CheckoutButton
                  user={user}
                  profile={profile}
                  items={items}
                  cartProducts={cartProducts}
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
