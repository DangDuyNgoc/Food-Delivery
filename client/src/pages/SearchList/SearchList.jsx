import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useLocation } from "react-router-dom";
import FoodItem from './../../components/FoodItem/FoodItem';

const SearchList = () => {
  const { searchProducts } = useContext(StoreContext);
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword");

    if (keyword) {
      const searchResults = searchProducts(keyword);
      setResults(searchResults);
    }
  }, [location.search, searchProducts]);

  return (
    <div>
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <div className="food-list">
          {results.map((product, index) => (
            <FoodItem
              key={index}
              id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchList;
