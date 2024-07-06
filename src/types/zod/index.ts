import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','account_name','display_name','biography','external_url','icon_url','created_at','updated_at','deleted_at']);

export const PostScalarFieldEnumSchema = z.enum(['id','user_id','image_url','created_at','updated_at','deleted_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  account_name: z.string().min(6).max(32),
  display_name: z.string().min(1).max(32),
  biography: z.string().nullish(),
  external_url: z.string().url().nullish(),
  icon_url: z.string().url().nullish(),
  created_at: z.coerce.date().nullish(),
  updated_at: z.coerce.date().nullish(),
  deleted_at: z.coerce.date().nullish(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number().int(),
  user_id: z.string(),
  image_url: z.string().url(),
  created_at: z.coerce.date().nullish(),
  updated_at: z.coerce.date().nullish(),
  deleted_at: z.coerce.date().nullish(),
})

export type Post = z.infer<typeof PostSchema>
