import { useCallback, useState } from 'react';

const API_BASE_URL = 'http://localhost:8080/api';

export const useCart = (userId) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCart = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setCartItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      if (!userId) {
        setError('User ID is required');
        return null;
      }
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/cart/add?userId=${userId}&productId=${productId}&quantity=${quantity}`,
          { method: 'POST' }
        );
        if (!response.ok) {
          if (response.status === 400) throw new Error('Sản phẩm hết hàng hoặc yêu cầu không hợp lệ');
          throw new Error('Failed to add to cart');
        }
        const newItem = await response.json();
        setCartItems([...cartItems, newItem]);
        setError(null);
        return newItem;
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [userId, cartItems]
  );

  const updateQuantity = useCallback(async (cartItemId, newQuantity) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/cart/update/${cartItemId}?quantity=${newQuantity}`,
        { method: 'PUT' }
      );
      if (!response.ok) throw new Error('Failed to update quantity');
      const updatedItem = await response.json();
      setCartItems(
        cartItems.map(item => (item.id === cartItemId ? updatedItem : item))
      );
      setError(null);
      return updatedItem;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [cartItems]);

  const removeFromCart = useCallback(
    async (cartItemId) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/cart/${cartItemId}`,
          { method: 'DELETE' }
        );
        if (!response.ok) throw new Error('Failed to remove from cart');
        setCartItems(cartItems.filter(item => item.id !== cartItemId));
        setError(null);
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [cartItems]
  );

  const clearCart = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear/${userId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      setCartItems([]);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return {
    cartItems,
    loading,
    error,
    getCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };
};

export const useOrder = (userId) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getOrders = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/order/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createOrder = useCallback(
    async (paymentMethod, shippingAddress, cartItemIds) => {
      if (!userId) {
        setError('User ID is required');
        return null;
      }
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/order/create/${userId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentMethod,
              shippingAddress,
              cartItemIds
            })
          }
        );
        if (!response.ok) throw new Error('Failed to create order');
        const newOrder = await response.json();
        if (newOrder.id) {
          setOrders([...orders, newOrder]);
        }
        setError(null);
        return newOrder;
      } catch (err) {
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [userId, orders]
  );

  return {
    orders,
    loading,
    error,
    getOrders,
    createOrder
  };
};
