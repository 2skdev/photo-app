import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','accountName','displayName','biography','externalUrl','iconPath','coverPath','createdAt','updatedAt','deletedAt']);

export const PostScalarFieldEnumSchema = z.enum(['id','userId','spotId','text','imagePath','camera','lens','focalLength','fnumber','shutter','iso','wb','shotAt','private','createdAt','updatedAt','deletedAt']);

export const HashtagScalarFieldEnumSchema = z.enum(['id','postId','tag']);

export const SpotScalarFieldEnumSchema = z.enum(['id','userId','name','latitude','longitude','private','createdAt','updatedAt','deletedAt']);

export const CommentScalarFieldEnumSchema = z.enum(['id','userId','postId','text','createdAt','updatedAt','deletedAt']);

export const LikeScalarFieldEnumSchema = z.enum(['id','userId','postId','createdAt','updatedAt','deletedAt']);

export const FollowScalarFieldEnumSchema = z.enum(['id','userId','followUserId','createdAt','updatedAt','deletedAt']);

export const NotificationScalarFieldEnumSchema = z.enum(['id','userId','eventId','eventType','read','createdAt','updatedAt','deletedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const EventTypeSchema = z.enum(['Comment','Like','Follow']);

export type EventTypeType = `${z.infer<typeof EventTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  accountName: z.string().min(6).max(32),
  displayName: z.string().min(1).max(32),
  biography: z.string().nullish(),
  externalUrl: z.string().url().nullish(),
  iconPath: z.string().nullish(),
  coverPath: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
})

export type User = z.infer<typeof UserSchema>

// USER OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().max(10),
  userId: z.string(),
  spotId: z.number().int().nullish(),
  text: z.string(),
  imagePath: z.string(),
  camera: z.string().nullish(),
  lens: z.string().nullish(),
  focalLength: z.string().nullish(),
  fnumber: z.string().nullish(),
  shutter: z.string().nullish(),
  iso: z.string().nullish(),
  wb: z.string().nullish(),
  shotAt: z.coerce.date().nullish(),
  private: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
})

export type Post = z.infer<typeof PostSchema>

// POST OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const PostOptionalDefaultsSchema = PostSchema.merge(z.object({
  text: z.string().optional(),
  private: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type PostOptionalDefaults = z.infer<typeof PostOptionalDefaultsSchema>

/////////////////////////////////////////
// HASHTAG SCHEMA
/////////////////////////////////////////

export const HashtagSchema = z.object({
  id: z.number().int(),
  postId: z.string(),
  tag: z.string(),
})

export type Hashtag = z.infer<typeof HashtagSchema>

// HASHTAG OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const HashtagOptionalDefaultsSchema = HashtagSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type HashtagOptionalDefaults = z.infer<typeof HashtagOptionalDefaultsSchema>

/////////////////////////////////////////
// SPOT SCHEMA
/////////////////////////////////////////

export const SpotSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  private: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
})

export type Spot = z.infer<typeof SpotSchema>

// SPOT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const SpotOptionalDefaultsSchema = SpotSchema.merge(z.object({
  id: z.number().int().optional(),
  private: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type SpotOptionalDefaults = z.infer<typeof SpotOptionalDefaultsSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  postId: z.string(),
  text: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
})

export type Comment = z.infer<typeof CommentSchema>

// COMMENT OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const CommentOptionalDefaultsSchema = CommentSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CommentOptionalDefaults = z.infer<typeof CommentOptionalDefaultsSchema>

/////////////////////////////////////////
// LIKE SCHEMA
/////////////////////////////////////////

export const LikeSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  postId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
})

export type Like = z.infer<typeof LikeSchema>

// LIKE OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const LikeOptionalDefaultsSchema = LikeSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type LikeOptionalDefaults = z.infer<typeof LikeOptionalDefaultsSchema>

/////////////////////////////////////////
// FOLLOW SCHEMA
/////////////////////////////////////////

export const FollowSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  followUserId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
})

export type Follow = z.infer<typeof FollowSchema>

// FOLLOW OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const FollowOptionalDefaultsSchema = FollowSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type FollowOptionalDefaults = z.infer<typeof FollowOptionalDefaultsSchema>

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
  eventType: EventTypeSchema,
  id: z.number().int(),
  userId: z.string(),
  eventId: z.number().int(),
  read: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
})

export type Notification = z.infer<typeof NotificationSchema>

// NOTIFICATION OPTIONAL DEFAULTS SCHEMA
//------------------------------------------------------

export const NotificationOptionalDefaultsSchema = NotificationSchema.merge(z.object({
  id: z.number().int().optional(),
  read: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type NotificationOptionalDefaults = z.infer<typeof NotificationOptionalDefaultsSchema>
