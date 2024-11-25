import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ShopCard from './components/ShopCard';
import VegetableFilters from './components/VegetableFilters';
import { Search } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface VegetablePrice {
  name: string;
  price: number;
  category: 'mandatory' | 'premium';
}

interface Shop {
  id: number;
  name: string;
  image: string;
  location: Location;
  vegetables: VegetablePrice[];
}

function App() {
  const [shops] = useState<Shop[]>([
    {
      id: 1,
      name: "VENKAT VEGGES",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8437,
        lng: 77.6594,
        address: "Electronics City Phase 1, Near Infosys Gate 1, Bangalore"
      },
      vegetables: [
        { name: "Tomatoes", price: 40, category: 'mandatory' },
        { name: "Onions", price: 35, category: 'mandatory' },
        { name: "Potatoes", price: 30, category: 'mandatory' },
        { name: "Lady Finger", price: 45, category: 'mandatory' },
        { name: "Eggplant", price: 38, category: 'mandatory' },
        { name: "Cucumber", price: 42, category: 'mandatory' },
        { name: "Green Beans", price: 50, category: 'mandatory' },
        { name: "Cauliflower", price: 45, category: 'mandatory' },
        { name: "Spinach", price: 30, category: 'mandatory' },
        { name: "Mint Leaves", price: 20, category: 'mandatory' },
        { name: "Broccoli", price: 90, category: 'premium' },
        { name: "Bell Peppers", price: 80, category: 'premium' },
        { name: "Frozen Peas", price: 60, category: 'premium' }
      ]
    },
    {
      id: 2,
      name: "RAMU VEGGES",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8456,
        lng: 77.6612,
        address: "Electronics City Phase 2, Near Wipro Gate, Bangalore"
      },
      vegetables: [
        { name: "Tomatoes", price: 45, category: 'mandatory' },
        { name: "Onions", price: 40, category: 'mandatory' },
        { name: "Potatoes", price: 35, category: 'mandatory' },
        { name: "Lady Finger", price: 48, category: 'mandatory' },
        { name: "Eggplant", price: 42, category: 'mandatory' },
        { name: "Cucumber", price: 45, category: 'mandatory' },
        { name: "Green Beans", price: 55, category: 'mandatory' },
        { name: "Cauliflower", price: 50, category: 'mandatory' },
        { name: "Spinach", price: 35, category: 'mandatory' },
        { name: "Mint Leaves", price: 25, category: 'mandatory' },
        { name: "Asparagus", price: 120, category: 'premium' },
        { name: "Cherry Tomatoes", price: 90, category: 'premium' },
        { name: "Baby Corn", price: 70, category: 'premium' }
      ]
    },
    {
      id: 3,
      name: "SHILPA VEGGES",
      image: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8484,
        lng: 77.6571,
        address: "Electronics City Phase 1, Near BHEL, Bangalore"
      },
      vegetables: [
        { name: "Tomatoes", price: 42, category: 'mandatory' },
        { name: "Onions", price: 38, category: 'mandatory' },
        { name: "Potatoes", price: 32, category: 'mandatory' },
        { name: "Lady Finger", price: 46, category: 'mandatory' },
        { name: "Eggplant", price: 40, category: 'mandatory' },
        { name: "Cucumber", price: 44, category: 'mandatory' },
        { name: "Green Beans", price: 52, category: 'mandatory' },
        { name: "Cauliflower", price: 48, category: 'mandatory' },
        { name: "Spinach", price: 32, category: 'mandatory' },
        { name: "Mint Leaves", price: 22, category: 'mandatory' },
        { name: "Zucchini", price: 85, category: 'premium' },
        { name: "Mushrooms", price: 100, category: 'premium' },
        { name: "Red Cabbage", price: 75, category: 'premium' }
      ]
    },
    {
      id: 4,
      name: "ROSHAN VEGGES",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80",
      location: {
        lat: 12.8401,
        lng: 77.6637,
        address: "Electronics City Phase 2, Near Siemens, Bangalore"
      },
      vegetables: [
        { name: "Tomatoes", price: 38, category: 'mandatory' },
        { name: "Onions", price: 32, category: 'mandatory' },
        { name: "Potatoes", price: 28, category: 'mandatory' },
        { name: "Lady Finger", price: 42, category: 'mandatory' },
        { name: "Eggplant", price: 36, category: 'mandatory' },
        { name: "Cucumber", price: 40, category: 'mandatory' },
        { name: "Green Beans", price: 48, category: 'mandatory' },
        { name: "Cauliflower", price: 44, category: 'mandatory' },
        { name: "Spinach", price: 28, category: 'mandatory' },
        { name: "Mint Leaves", price: 18, category: 'mandatory' },
        { name: "Sweet Corn", price: 65, category: 'premium' },
        { name: "Celery", price: 95, category: 'premium' },
        { name: "Spring Onions", price: 45, category: 'premium' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleGetDirections = (location: Location) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${location.lat},${location.lng}`;
        window.open(url, '_blank');
      }, (error) => {
        console.error("Error getting location:", error);
        const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
        window.open(url, '_blank');
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const { 
    sortedShops, 
    searchedVegetable, 
    averageVegetablePrice, 
    uniqueVegetables 
  } = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    // Calculate average price of mandatory vegetables for each shop
    const shopsWithAvgPrice = shops.map(shop => {
      const mandatoryVegetables = shop.vegetables.filter(v => v.category === 'mandatory');
      const avgPrice = mandatoryVegetables.reduce((acc, v) => acc + v.price, 0) / mandatoryVegetables.length;
      return { ...shop, averagePrice: avgPrice };
    });

    // Sort shops by average price of mandatory vegetables
    const sorted = [...shopsWithAvgPrice].sort((a, b) => a.averagePrice - b.averagePrice);

    // Get all unique vegetables
    const allVegetables = new Set<string>();
    shops.forEach(shop => {
      shop.vegetables.forEach(veg => allVegetables.add(veg.name));
    });

    // Check if search matches any vegetable
    const matchingVegetable = shops.some(shop => 
      shop.vegetables.some(veg => veg.name.toLowerCase() === normalizedSearch)
    ) ? normalizedSearch : null;

    // Filter shops based on search term
    const filtered = sorted.filter(shop => {
      if (!normalizedSearch) return true;
      
      if (matchingVegetable) {
        return shop.vegetables.some(veg => 
          veg.name.toLowerCase() === matchingVegetable
        );
      }
      
      return (
        shop.name.toLowerCase().includes(normalizedSearch) ||
        shop.vegetables.some(veg => 
          veg.name.toLowerCase().includes(normalizedSearch)
        )
      );
    });

    // Calculate average price for searched vegetable
    let avgVegPrice = 0;
    if (matchingVegetable) {
      const prices = filtered.map(shop => 
        shop.vegetables.find(v => v.name.toLowerCase() === matchingVegetable)?.price ?? 0
      );
      avgVegPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    }

    return {
      sortedShops: filtered,
      searchedVegetable: matchingVegetable,
      averageVegetablePrice: avgVegPrice,
      uniqueVegetables: Array.from(allVegetables).sort()
    };
  }, [shops, searchTerm]);

  const handleVegetableSelect = (vegetable: string) => {
    setSearchTerm(searchTerm === vegetable ? '' : vegetable);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        averagePrice={sortedShops[0]?.averagePrice ?? 0}
        searchedVegetable={searchedVegetable}
        averageVegetablePrice={averageVegetablePrice}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="py-8">
          <div className="relative max-w-xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search shops or vegetables..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <VegetableFilters
            vegetables={uniqueVegetables}
            onSelect={handleVegetableSelect}
            selectedVegetable={searchedVegetable}
          />

          {searchedVegetable && (
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Showing shops selling {searchedVegetable.charAt(0).toUpperCase() + searchedVegetable.slice(1)}
              </h2>
              <p className="text-gray-600 mt-1">
                Found {sortedShops.length} shop{sortedShops.length !== 1 ? 's' : ''} with this vegetable
              </p>
              <p className="text-green-600 font-medium mt-1">
                Average price: ₹{averageVegetablePrice}/KG
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {sortedShops.map((shop) => (
              <ShopCard
                key={shop.id}
                name={shop.name}
                averagePrice={shop.averagePrice}
                image={shop.image}
                location={shop.location}
                vegetables={shop.vegetables}
                onGetDirections={() => handleGetDirections(shop.location)}
                highlightedVegetable={searchedVegetable}
                averageVegetablePrice={averageVegetablePrice}
              />
            ))}
          </div>

          {sortedShops.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No shops found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;