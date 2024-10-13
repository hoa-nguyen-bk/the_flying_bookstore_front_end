import Image from "next/image";

import Book from "@/assets/images/book loading.gif";
import "./Category.scss"
import { ICategory } from "@/types/category";
import { useRouter } from "next/navigation";
import { useStoreSearch } from "@/hooks/search";

const Category = ({category}: {category:ICategory}) => {
  const { updateCategoryParam } = useStoreSearch();
  const router = useRouter();
  const onNavigate = () => {
    updateCategoryParam(category);
    router.push("/search"); 
  };
  return (
    <div className=" text-center cursor-pointer" >
      <div className="mx-auto w-8/12">
        <Image
          src={Book}
          alt="Picture of the author"
          className="card-image"
          unoptimized
          onClick={onNavigate}
        />
      </div>
      <h4 className="text-lg font-semibold py-3">{category.nameVn}</h4>
    </div>
  );
};

export default Category;
