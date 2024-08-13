import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchInput.css";

const SearchInput = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
    }
  };

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </div>
  );
};

export default SearchInput;
