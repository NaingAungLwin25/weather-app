import React, { memo, useState } from "react";

interface SearchBarProps {
  location: string;
  handleSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ location, handleSearch }) => {
  const [search, setSearch] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOnSearch = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleSearch(search);
  };

  return (
    <form className="max-w-screen-sm w-full mx-auto mb-10 rounded-xl ring-8 ring-white ring-opacity-40">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none"
          placeholder="Country, City..."
          defaultValue={location || ""}
          onChange={handleInputChange}
          required
        />
        <button
          onClick={(e) => handleOnSearch(e)}
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default memo(SearchBar);
