"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import AddToCartButton from "@/app/product-variant/[slug]/components/add-to-cart-button";
import { Button } from "@/components/ui/button";

interface IProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: IProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button variant="ghost" size="icon" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button variant="ghost" size="icon" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
