import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','account_name','display_name','biography','external_url','icon_path','created_at','updated_at','deleted_at']);

export const PostScalarFieldEnumSchema = z.enum(['id','user_id','caption','image_path','camera','lens','focalLength','fnumber','shutter','iso','created_at','updated_at','deleted_at']);

export const CommentScalarFieldEnumSchema = z.enum(['id','user_id','post_id','text','created_at','updated_at','deleted_at']);

export const LikeScalarFieldEnumSchema = z.enum(['id','user_id','post_id','created_at','updated_at','deleted_at']);

export const FollowScalarFieldEnumSchema = z.enum(['user_id','follow_user_id','created_at','updated_at','deleted_at']);

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
  icon_path: z.string().nullish(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullish(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().max(10),
  user_id: z.string(),
  caption: z.string(),
  image_path: z.string(),
  camera: z.string().nullish(),
  lens: z.string().nullish(),
  focalLength: z.string().nullish(),
  fnumber: z.string().nullish(),
  shutter: z.string().nullish(),
  iso: z.string().nullish(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullish(),
})

export type Post = z.infer<typeof PostSchema>

// POST OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PostOptionalDefaultsSchema = PostSchema.merge(z.object({
  user_id: z.string().optional(),
  caption: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.number().int(),
  user_id: z.string(),
  post_id: z.string(),
  text: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullish(),
})

export type Comment = z.infer<typeof CommentSchema>

// COMMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CommentOptionalDefaultsSchema = CommentSchema.merge(z.object({
  id: z.number().int().optional(),
  user_id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type CommentOptionalDefaults = z.infer<typeof CommentOptionalDefaultsSchema>

/////////////////////////////////////////
// LIKE SCHEMA
/////////////////////////////////////////

export const LikeSchema = z.object({
  id: z.number().int(),
  user_id: z.string(),
  post_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullish(),
})

export type Like = z.infer<typeof LikeSchema>

// LIKE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LikeOptionalDefaultsSchema = LikeSchema.merge(z.object({
  id: z.number().int().optional(),
  user_id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type LikeOptionalDefaults = z.infer<typeof LikeOptionalDefaultsSchema>

/////////////////////////////////////////
// FOLLOW SCHEMA
/////////////////////////////////////////

export const FollowSchema = z.object({
  user_id: z.string(),
  follow_user_id: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullish(),
})

export type Follow = z.infer<typeof FollowSchema>

// FOLLOW OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FollowOptionalDefaultsSchema = FollowSchema.merge(z.object({
  user_id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type FollowOptionalDefaults = z.infer<typeof FollowOptionalDefaultsSchema>