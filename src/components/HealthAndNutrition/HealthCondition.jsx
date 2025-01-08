import React, { useState } from 'react';

const HealthCondition = () => {
    const [meal, setMeal] = useState({
        havingMeal: '',
        havingFood: ['', ''],
    });
    const [isFoodDropdownOpen, setIsFoodDropdownOpen] = useState(false);
    const [foodSearch, setFoodSearch] = useState('');
    const allFoodOptions = [
        'Pancakes', 'Eggs', 'Cereal', 'Smoothie', 'Toast', 'Sandwich', 'Salad', 
        'Pasta', 'Burger', 'Soup', 'Steak', 'Roast Chicken', 'Pizza', 'Seafood', 
        'Nuts', 'Chips', 'Chocolate', 'Granola Bar', 'Apple', 'Banana', 'Orange', 
        'Strawberry', 'Mango', 'Grapes', 'Sushi', 'Ramen', 'Dumplings', 'Pad Thai', 
        'Spring Rolls', 'Kimchi', 'Pho', 'Biryani', 'Tandoori Chicken',
    ];

    const filteredFoodOptions = allFoodOptions.filter((food) =>
        food.toLowerCase().includes(foodSearch.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeal((prevMeal) => ({
            ...prevMeal,
            [name]: value,
        }));
    };

    const handleFoodChange = (value) => {
        setMeal((prevMeal) => ({
            ...prevMeal,
            havingFood: [prevMeal.havingFood[0], value],
        }));
        setIsFoodDropdownOpen(false); // Close dropdown on selection
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(meal);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700">Meal Type</label>
                <select
                    name="havingMeal"
                    value={meal.havingMeal}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                    <option value="" disabled>Select Meal Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snacks">Snacks</option>
                </select>
            </div>

            <div className="mb-4 relative">
                <label className="block text-gray-700">Food Type</label>
                <div
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer"
                    onClick={() => setIsFoodDropdownOpen(!isFoodDropdownOpen)}
                >
                    {meal.havingFood[1] || 'Select Food Type'}
                </div>

                {isFoodDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {/* Search Input */}
                        <input
                            type="text"
                            placeholder="Search Food..."
                            value={foodSearch}
                            onChange={(e) => setFoodSearch(e.target.value)}
                            className="w-full p-2 border-b border-gray-300 focus:outline-none"
                        />
                        {/* Food Options */}
                        <ul className="max-h-60 overflow-y-auto">
                            {filteredFoodOptions.map((food) => (
                                <li
                                    key={food}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleFoodChange(food)}
                                >
                                    {food}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                Submit
            </button>
        </form>
    );
};

export default HealthCondition;
