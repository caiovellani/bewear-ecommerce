"use server";

import { headers } from "next/headers";

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "@/actions/create-shipping-address/schema";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const createShippingAddress = async (
  data: CreateShippingAddressSchema,
) => {
  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      name: data.fullName,
      address: data.address,
      recipientName: data.fullName,
      street: data.address,
      number: String(data.number),
      complement: data.complement ?? null,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      zipCode: data.zipCode,
      country: "Brasil",
      phone: data.phone,
      email: data.email,
      cpfOrCnpj: data.cpf,
    })
    .returning();

  return shippingAddress;
};
