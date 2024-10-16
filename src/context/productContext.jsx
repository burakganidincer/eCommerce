import axios from "axios";
import { createContext, useEffect, useState } from "react";

/*
  Context API
  Uygulamada birden çok bileşin ihtiyacı olan verileri
  Bileşenlerden bağımsız bir şekilde konumlanan merkezlerde yönetmeye yarar.
  Context yapısı içerisinde verilerin state'ini ve verileri değiştirmeye yarayan fonksiyonlar tutulabilir.
  Context, tuttuğumuz değişkenleri bileşenlere doğrudan aktarım yapbilen merkezi state yönetim aracıdır.

*/

//! Context yapısının temelini oluşturma
export const ProductContext = createContext();

//! Sağlayıcı ve onun tuttuğu verileri tanımla
export function ProductProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    // önceki ürünleri kaldır, yükleniyor tetikler
    setProducts(null);

    // hangi url'e istek atılacağını belirle
    const url =
      category === "all"
        ? "https://fakestoreapi.com/products" //eğer all ise tüm ürünleri görüntüle
        : `https://fakestoreapi.com/products/category/${category}`; //hangi kategori seçili ise o kategorideki ürünleri getir

    // api isteği at
    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  // context yapısında tuttuğumuz verileri bileşenlere sağla
  // Value olarak eklenen veriler projedeki bütün bileşenler tarafından erişilebilir olur

  return (
    <ProductContext.Provider value={{ products, category, setCategory }}>
      {children}
    </ProductContext.Provider>
  );
}
