import Image from "next/image";

const brands = [
  {
    src: "/simple-icons_nike.svg",
    alt: "Nike",
    name: "Nike",
  },
  {
    src: "/simple-icons_adidas.svg",
    alt: "Adidas",
    name: "Adidas",
  },
  {
    src: "/simple-icons_puma.svg",
    alt: "Puma",
    name: "Puma",
  },
  {
    src: "/simple-icons_newbalance.svg",
    alt: "New Balance",
    name: "New Balance",
  },
];

interface IPartnersBrandsProps {
  src?: string;
  alt?: string;
  name?: string;
}

const PartnersBrands = ({ src, alt, name }: IPartnersBrandsProps) => {
  return (
    <>
      {brands.map((brand) => {
        return (
          <div
            key={brand.alt}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="grid h-24 w-24 items-center justify-center rounded-3xl border-2 border-[#F1F1F1]">
              <Image
                src={brand.src}
                alt={brand.alt}
                height={48}
                width={48}
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="text-[14px] font-semibold">{brand.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default PartnersBrands;
