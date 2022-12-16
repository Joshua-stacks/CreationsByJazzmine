import Link from "next/link";
import Image from 'next/image';
import { getProducts } from "@/api";

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div>
      {products.map(({ name, _id: id, image_src }) => (
        <Link
          key={id}
          href="/"
          className="relative flex w-full flex-col items-center p-2"
        >
          <div className="relative h-36 w-36">
            <Image
              className="rounded-xl object-contain"
              src={image_src}
              alt={name}
              fill
            />
          </div>
          <span className="text-base">{name}</span>

          <div className="absolute -top-0.5 -right-0.5 rounded-xl bg-red-500 p-1">
            <span className="text-xs font-bold">17% Off</span>
          </div>
        </Link>
      ))
      }
    </div >
  );
}
