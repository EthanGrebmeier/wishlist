import { index, varchar } from "drizzle-orm/mysql-core";
import { createTable } from "../schema";
import { relations } from "drizzle-orm";

export const products = createTable(
  "products",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: varchar("price", { length: 255 }),
    quantity: varchar("quantity", { length: 255 }),
    url: varchar("url", { length: 255 }),
    image: varchar("image", { length: 255 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    wishlistId: varchar("wishlistId", { length: 255 }).notNull(),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const productsRelations = relations(products, ({ one }) => ({
  wishlist: one(wishlists, {
    fields: [products.wishlistId],
    references: [wishlists.id],
  }),
}));

export const wishlists = createTable(
  "wishlists",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    image: varchar("image", { length: 255 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const wishlistsRelations = relations(wishlists, ({ many }) => ({
  products: many(products),
}));
