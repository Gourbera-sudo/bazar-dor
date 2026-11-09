import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import PriceDecreasedProducts from "@/components/PriceDecreasedProducts";
import PriceIncreasedProducts from "@/components/PriceIncreasedProducts";




export default function Home() {
  return (
    <div>
      
      <Banner></Banner>
      <PriceIncreasedProducts></PriceIncreasedProducts>
      <PriceDecreasedProducts></PriceDecreasedProducts>
      <AllProducts></AllProducts>
      
    </div>
  );
}
