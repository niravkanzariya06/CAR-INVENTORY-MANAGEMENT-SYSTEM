import { render, screen } from '@testing-library/react';
import { beforeEach, describe, it, expect } from 'vitest';
import React from 'react';
import { VehicleCard } from '../components/VehicleCard';
import { AuthProvider } from '../context/AuthContext';
import { VehicleProvider } from '../context/VehicleContext';

const mockVehicle = {
  _id: '123',
  make: 'Tesla',
  model: 'Model Y',
  category: 'Electric',
  year: 2024,
  price: 52990,
  quantity: 0,
  vin: 'TSLA111222333',
  imageUrl: 'https://example.com/teslamodely.jpg',
  description: 'Electric crossover',
};

describe('VehicleCard Component (Frontend TDD JS)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders vehicle information correctly', () => {
    render(
      <AuthProvider>
        <VehicleProvider>
          <VehicleCard vehicle={mockVehicle} onEdit={() => {}} onRestock={() => {}} />
        </VehicleProvider>
      </AuthProvider>
    );

    expect(screen.getByText('Tesla Model Y')).toBeInTheDocument();
    expect(screen.getByText('$52,990')).toBeInTheDocument();
    expect(screen.getAllByText('Out of Stock').length).toBeGreaterThan(0);
  });

  it('disables purchase button when vehicle quantity is 0', () => {
    render(
      <AuthProvider>
        <VehicleProvider>
          <VehicleCard vehicle={mockVehicle} onEdit={() => {}} onRestock={() => {}} />
        </VehicleProvider>
      </AuthProvider>
    );

    const purchaseBtn = screen.getByRole('button', { name: /out of stock|purchase/i });
    expect(purchaseBtn).toBeDisabled();
  });

  it('hides the purchase button for admin users', () => {
    localStorage.setItem('token', 'admin-token');
    localStorage.setItem(
      'user',
      JSON.stringify({ role: 'admin', name: 'System Admin', email: 'admin@dealership.com' })
    );

    const availableVehicle = { ...mockVehicle, quantity: 5 };

    render(
      <AuthProvider>
        <VehicleProvider>
          <VehicleCard vehicle={availableVehicle} onEdit={() => {}} onRestock={() => {}} />
        </VehicleProvider>
      </AuthProvider>
    );

    expect(screen.queryByRole('button', { name: /purchase vehicle/i })).not.toBeInTheDocument();
  });
});
