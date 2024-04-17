import { boolean, date, index, text, varchar } from "drizzle-orm/pg-core";
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
    createdByIdIdx: index("products_createdById_idx").on(example.createdById),
    nameIndex: index("products_name_idx").on(example.name),
  }),
);

export const productsRelations = relations(products, ({ one, many }) => ({
  wishlist: one(wishlists, {
    fields: [products.wishlistId],
    references: [wishlists.id],
  }),
  commitments: many(productCommitments),
}));

export const productCommitments = createTable(
  "product_commitments",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    productId: varchar("productId", { length: 255 }).notNull(),
    wishlistId: varchar("wishlistId", { length: 255 }).notNull(),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    productIdIdx: index("productId_idx").on(example.productId),
  }),
);

export const productCommitmentsRelations = relations(
  productCommitments,
  ({ one }) => ({
    wishlist: one(wishlists, {
      fields: [productCommitments.wishlistId],
      references: [wishlists.id],
    }),
    product: one(products, {
      fields: [productCommitments.productId],
      references: [products.id],
    }),
    user: one(users, {
      fields: [productCommitments.createdById],
      references: [users.id],
    }),
  }),
);

export const wishlists = createTable(
  "wishlists",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    image: varchar("image", { length: 255 }),
    isSecret: boolean("isSecret").default(false).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    privacyType: varchar("privacyType", {
      length: 255,
      enum: ["private", "public", "link"],
    })
      .notNull()
      .default("private"),
    dueDate: date("date"),
    color: varchar("color", {
      length: 255,
      enum: [
        "red",
        "green",
        "yellow",
        "pink",
        "orange",
        "blue",
        "white",
        "lavender",
      ],
    })
      .default("white")
      .notNull(),
  },
  (example) => ({
    createdByIdIdx: index("wishlists_createdById_idx").on(example.createdById),
    nameIndex: index("wishlists_name_idx").on(example.name),
  }),
);

export const wishlistsRelations = relations(wishlists, ({ many }) => ({
  products: many(products),
  wishlistShares: many(wishlistShares),
  productCommitments: many(productCommitments),
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
    sharedWithUserId: index("wishlist_shares_sharedWithUserId").on(
      example.sharedWithUserId,
    ),
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
