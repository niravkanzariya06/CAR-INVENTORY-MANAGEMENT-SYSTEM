import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAPI } from '../services/api';
import { useAuth } from './AuthContext';

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [inStockOnly, setInStockOnly] = useState(false);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
  };

  const clearToast = () => setToastMessage(null);

  const loadVehicles = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPI('/vehicles');
      setVehicles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const purchaseVehicle = async (vehicleId) => {
    try {
      const res = await fetchAPI(`/vehicles/${vehicleId}/purchase`, {
        method: 'POST',
      });

      setVehicles((prev) =>
        prev.map((v) => (v._id === vehicleId ? res.vehicle : v))
      );
      showToast(res.message || 'Vehicle purchased successfully!', 'success');
      return res.vehicle;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const restockVehicle = async (vehicleId, amount = 1) => {
    try {
      const res = await fetchAPI(`/vehicles/${vehicleId}/restock`, {
        method: 'POST',
        body: JSON.stringify({ amount }),
      });

      setVehicles((prev) =>
        prev.map((v) => (v._id === vehicleId ? res.vehicle : v))
      );
      showToast(res.message || 'Vehicle restocked successfully!', 'success');
      return res.vehicle;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const addVehicle = async (vehicleData) => {
    try {
      const newVehicle = await fetchAPI('/vehicles', {
        method: 'POST',
        body: JSON.stringify(vehicleData),
      });

      setVehicles((prev) => [newVehicle, ...prev]);
      showToast('New vehicle added to inventory!', 'success');
      return newVehicle;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const updateVehicle = async (vehicleId, vehicleData) => {
    try {
      const updated = await fetchAPI(`/vehicles/${vehicleId}`, {
        method: 'PUT',
        body: JSON.stringify(vehicleData),
      });

      setVehicles((prev) =>
        prev.map((v) => (v._id === vehicleId ? updated : v))
      );
      showToast('Vehicle details updated!', 'success');
      return updated;
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  const deleteVehicle = async (vehicleId) => {
    try {
      await fetchAPI(`/vehicles/${vehicleId}`, {
        method: 'DELETE',
      });

      setVehicles((prev) => prev.filter((v) => v._id !== vehicleId));
      showToast('Vehicle deleted from inventory', 'info');
    } catch (err) {
      showToast(err.message, 'error');
      throw err;
    }
  };

  // Filtered vehicles derivation
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      v.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesPrice = v.price <= maxPrice;

    const matchesStock = !inStockOnly || v.quantity > 0;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        filteredVehicles,
        loading,
        error,
        toastMessage,
        showToast,
        clearToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        maxPrice,
        setMaxPrice,
        inStockOnly,
        setInStockOnly,
        loadVehicles,
        purchaseVehicle,
        restockVehicle,
        addVehicle,
        updateVehicle,
        deleteVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => useContext(VehicleContext);
