import { useEffect, useState, type ChangeEvent } from "react";

import axios, { AxiosError } from "axios";
import type { IProduct } from "../../interfaces/product.interface";
import Search from "../../components/Search/Search";
import Heading from "../../components/Search/Headling/Heading";
import { PREFIX } from "../../api/api";
import Menulist from "./Menulist/Menulist";

function Menu() {
  const [products, setProduskts] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const [filter, setFilter] = useState<string>("");
  const [debouncedFilter, setDebouncedFilter] = useState<string>("");

  const searchMenuProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [filter]);

  useEffect(() => {
    getMenu(debouncedFilter);
  }, [debouncedFilter]);

  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
        params: {
          name: name,
        },
      });
      setProduskts(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
      setError("Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Heading>Menu</Heading>
      <Search
        onChange={searchMenuProduct}
        type="search"
        className="search"
        placeholder="Input food"
      />
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && products.length > 0 && <Menulist products={products} />}
      {!isLoading && products.length === 0 && <p>Не найдено блюд по запросу</p>}
    </div>
  );
}

export default Menu;
