import { index, text, varchar } from "drizzle-orm/mysql-core";
import { createTable } from "../schema";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const products = createTable(
  "products",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    brand: varchar("brand", { length: 255 }),
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
    privacyType: varchar("privacyType", {
      length: 255,
      enum: ["private", "public", "link"],
    })
      .notNull()
      .default("private"),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const wishlistsRelations = relations(wishlists, ({ many }) => ({
  products: many(products),
  wishlistShares: many(wishlistShares),
}));

export const wishlistShares = createTable(
  "wishlist-shares",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    wishlistId: varchar("wishlistId", { length: 255 }).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    sharedWithUserId: varchar("sharedWithUserId", { length: 255 }).notNull(),
  },
  (example) => ({
    sharedWithUserId: index("sharedWithUserId").on(example.sharedWithUserId),
  }),
);

export const wishlistSharesRelations = relations(wishlistShares, ({ one }) => ({
  wishlist: one(wishlists, {
    fields: [wishlistShares.wishlistId],
    references: [wishlists.id],
  }),
  users: one(users, {
    fields: [wishlistShares.sharedWithUserId],
    references: [users.id],
  }),
}));
