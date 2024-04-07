import Brands from "./Brands";
import Category from "./Category";

const CategoryAndBrand = () => {
  return (
    <div className="w-full h-screen p-3 grid grid-cols-2">
      <div className="p-2">
        <Category />
      </div>
      <div className="p-2">
        <Brands />
      </div>
    </div>
  );
};

export default CategoryAndBrand;
