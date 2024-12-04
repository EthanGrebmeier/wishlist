import {
  boolean,
  date,
  index,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
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
    priority: varchar("priority", {
      length: 255,
      enum: ["high", "normal", "low"],
    })
      .default("normal")
      .notNull(),
    imageUrl: varchar("imageUrl", { length: 255 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    wishlistId: varchar("wishlistId", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3,
    }).defaultNow(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .$onUpdate(() => new Date()),
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
  receipts: many(productReceipts),
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
    isSecret: boolean("isSecret").default(false).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    imageUrl: varchar("imageUrl", { length: 255 }),
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
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3,
    }).defaultNow(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      precision: 3,
    })
      .defaultNow()
      .$onUpdate(() => new Date()),
    viewedAt: timestamp("viewedAt", {
      mode: "date",
      precision: 3,
    }),
  },
  (example) => ({
    createdByIdIdx: index("wishlists_createdById_idx").on(example.createdById),
    nameIndex: index("wishlists_name_idx").on(example.name),
  }),
);

export const wishlistsRelations = relations(wishlists, ({ many, one }) => ({
  products: many(products),
  wishlistShares: many(wishlistShares),
  productCommitments: many(productCommitments),
  productReceipts: many(productReceipts),
  magicWishlistLinks: one(magicWishlistLinks),
}));

export const wishlistShares = createTable(
  "wishlist-shares",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    wishlistId: varchar("wishlistId", { length: 255 }).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    sharedWithUserId: varchar("sharedWithUserId", { length: 255 }).notNull(),
    type: varchar("type", {
      enum: ["editor", "viewer", "invitee"],
    })
      .default("viewer")
      .notNull(),
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

export const productReceipts = createTable(
  "product-receipts",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    productId: varchar("productId", { length: 255 }).notNull(),
    wishlistId: varchar("wishlistId", { length: 255 }).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    purchasedByUserId: varchar("purchasedByUserId", { length: 255 }),
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3,
    }).defaultNow(),
  },
  (example) => ({
    sharedWithUserId: index("product_receipts_productId").on(example.productId),
  }),
);

export const productReceiptsRelations = relations(
  productReceipts,
  ({ one }) => ({
    wishlist: one(wishlists, {
      fields: [productReceipts.wishlistId],
      references: [wishlists.id],
    }),
    product: one(products, {
      fields: [productReceipts.productId],
      references: [products.id],
    }),
    users: one(users, {
      fields: [productReceipts.purchasedByUserId],
      references: [users.id],
    }),
  }),
);

export const magicWishlistLinks = createTable(
  "magic-wishlist-links",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    wishlistId: varchar("wishlistId", { length: 255 }).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt", {
      mode: "date",
      precision: 3,
    }).defaultNow(),
  },
  (example) => ({
    wishlistId: index("magic_wishlist_links_wishlistId").on(example.wishlistId),
  }),
);

export const magicWishlistLinksRelations = relations(
  magicWishlistLinks,
  ({ one }) => ({
    wishlist: one(wishlists, {
      fields: [magicWishlistLinks.wishlistId],
      references: [wishlists.id],
    }),
  }),
);
