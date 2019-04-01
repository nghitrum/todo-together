module.exports = {
        typeDefs: // Code generated by Prisma (prisma@1.28.5). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

/* GraphQL */ `type AggregateColor {
  count: Int!
}

type AggregateLabel {
  count: Int!
}

type AggregateToDo {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Color {
  id: ID!
  name: String
  colorCode: String
}

type ColorConnection {
  pageInfo: PageInfo!
  edges: [ColorEdge]!
  aggregate: AggregateColor!
}

input ColorCreateInput {
  name: String
  colorCode: String
}

type ColorEdge {
  node: Color!
  cursor: String!
}

enum ColorOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  colorCode_ASC
  colorCode_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ColorPreviousValues {
  id: ID!
  name: String
  colorCode: String
}

type ColorSubscriptionPayload {
  mutation: MutationType!
  node: Color
  updatedFields: [String!]
  previousValues: ColorPreviousValues
}

input ColorSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ColorWhereInput
  AND: [ColorSubscriptionWhereInput!]
  OR: [ColorSubscriptionWhereInput!]
  NOT: [ColorSubscriptionWhereInput!]
}

input ColorUpdateInput {
  name: String
  colorCode: String
}

input ColorUpdateManyMutationInput {
  name: String
  colorCode: String
}

input ColorWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  colorCode: String
  colorCode_not: String
  colorCode_in: [String!]
  colorCode_not_in: [String!]
  colorCode_lt: String
  colorCode_lte: String
  colorCode_gt: String
  colorCode_gte: String
  colorCode_contains: String
  colorCode_not_contains: String
  colorCode_starts_with: String
  colorCode_not_starts_with: String
  colorCode_ends_with: String
  colorCode_not_ends_with: String
  AND: [ColorWhereInput!]
  OR: [ColorWhereInput!]
  NOT: [ColorWhereInput!]
}

input ColorWhereUniqueInput {
  id: ID
}

type Label {
  id: ID!
  name: String
}

type LabelConnection {
  pageInfo: PageInfo!
  edges: [LabelEdge]!
  aggregate: AggregateLabel!
}

input LabelCreateInput {
  name: String
}

input LabelCreateManyInput {
  create: [LabelCreateInput!]
  connect: [LabelWhereUniqueInput!]
}

type LabelEdge {
  node: Label!
  cursor: String!
}

enum LabelOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LabelPreviousValues {
  id: ID!
  name: String
}

input LabelScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [LabelScalarWhereInput!]
  OR: [LabelScalarWhereInput!]
  NOT: [LabelScalarWhereInput!]
}

type LabelSubscriptionPayload {
  mutation: MutationType!
  node: Label
  updatedFields: [String!]
  previousValues: LabelPreviousValues
}

input LabelSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LabelWhereInput
  AND: [LabelSubscriptionWhereInput!]
  OR: [LabelSubscriptionWhereInput!]
  NOT: [LabelSubscriptionWhereInput!]
}

input LabelUpdateDataInput {
  name: String
}

input LabelUpdateInput {
  name: String
}

input LabelUpdateManyDataInput {
  name: String
}

input LabelUpdateManyInput {
  create: [LabelCreateInput!]
  update: [LabelUpdateWithWhereUniqueNestedInput!]
  upsert: [LabelUpsertWithWhereUniqueNestedInput!]
  delete: [LabelWhereUniqueInput!]
  connect: [LabelWhereUniqueInput!]
  set: [LabelWhereUniqueInput!]
  disconnect: [LabelWhereUniqueInput!]
  deleteMany: [LabelScalarWhereInput!]
  updateMany: [LabelUpdateManyWithWhereNestedInput!]
}

input LabelUpdateManyMutationInput {
  name: String
}

input LabelUpdateManyWithWhereNestedInput {
  where: LabelScalarWhereInput!
  data: LabelUpdateManyDataInput!
}

input LabelUpdateWithWhereUniqueNestedInput {
  where: LabelWhereUniqueInput!
  data: LabelUpdateDataInput!
}

input LabelUpsertWithWhereUniqueNestedInput {
  where: LabelWhereUniqueInput!
  update: LabelUpdateDataInput!
  create: LabelCreateInput!
}

input LabelWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [LabelWhereInput!]
  OR: [LabelWhereInput!]
  NOT: [LabelWhereInput!]
}

input LabelWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createColor(data: ColorCreateInput!): Color!
  updateColor(data: ColorUpdateInput!, where: ColorWhereUniqueInput!): Color
  updateManyColors(data: ColorUpdateManyMutationInput!, where: ColorWhereInput): BatchPayload!
  upsertColor(where: ColorWhereUniqueInput!, create: ColorCreateInput!, update: ColorUpdateInput!): Color!
  deleteColor(where: ColorWhereUniqueInput!): Color
  deleteManyColors(where: ColorWhereInput): BatchPayload!
  createLabel(data: LabelCreateInput!): Label!
  updateLabel(data: LabelUpdateInput!, where: LabelWhereUniqueInput!): Label
  updateManyLabels(data: LabelUpdateManyMutationInput!, where: LabelWhereInput): BatchPayload!
  upsertLabel(where: LabelWhereUniqueInput!, create: LabelCreateInput!, update: LabelUpdateInput!): Label!
  deleteLabel(where: LabelWhereUniqueInput!): Label
  deleteManyLabels(where: LabelWhereInput): BatchPayload!
  createToDo(data: ToDoCreateInput!): ToDo!
  updateToDo(data: ToDoUpdateInput!, where: ToDoWhereUniqueInput!): ToDo
  updateManyToDoes(data: ToDoUpdateManyMutationInput!, where: ToDoWhereInput): BatchPayload!
  upsertToDo(where: ToDoWhereUniqueInput!, create: ToDoCreateInput!, update: ToDoUpdateInput!): ToDo!
  deleteToDo(where: ToDoWhereUniqueInput!): ToDo
  deleteManyToDoes(where: ToDoWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  color(where: ColorWhereUniqueInput!): Color
  colors(where: ColorWhereInput, orderBy: ColorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Color]!
  colorsConnection(where: ColorWhereInput, orderBy: ColorOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ColorConnection!
  label(where: LabelWhereUniqueInput!): Label
  labels(where: LabelWhereInput, orderBy: LabelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Label]!
  labelsConnection(where: LabelWhereInput, orderBy: LabelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LabelConnection!
  toDo(where: ToDoWhereUniqueInput!): ToDo
  toDoes(where: ToDoWhereInput, orderBy: ToDoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ToDo]!
  toDoesConnection(where: ToDoWhereInput, orderBy: ToDoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ToDoConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  color(where: ColorSubscriptionWhereInput): ColorSubscriptionPayload
  label(where: LabelSubscriptionWhereInput): LabelSubscriptionPayload
  toDo(where: ToDoSubscriptionWhereInput): ToDoSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type ToDo {
  id: ID!
  title: String
  description: String
  isDone: Boolean!
  user: User!
}

type ToDoConnection {
  pageInfo: PageInfo!
  edges: [ToDoEdge]!
  aggregate: AggregateToDo!
}

input ToDoCreateInput {
  title: String
  description: String
  isDone: Boolean
  user: UserCreateOneWithoutTodoesInput!
}

input ToDoCreateManyWithoutUserInput {
  create: [ToDoCreateWithoutUserInput!]
  connect: [ToDoWhereUniqueInput!]
}

input ToDoCreateWithoutUserInput {
  title: String
  description: String
  isDone: Boolean
}

type ToDoEdge {
  node: ToDo!
  cursor: String!
}

enum ToDoOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  isDone_ASC
  isDone_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ToDoPreviousValues {
  id: ID!
  title: String
  description: String
  isDone: Boolean!
}

input ToDoScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  isDone: Boolean
  isDone_not: Boolean
  AND: [ToDoScalarWhereInput!]
  OR: [ToDoScalarWhereInput!]
  NOT: [ToDoScalarWhereInput!]
}

type ToDoSubscriptionPayload {
  mutation: MutationType!
  node: ToDo
  updatedFields: [String!]
  previousValues: ToDoPreviousValues
}

input ToDoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ToDoWhereInput
  AND: [ToDoSubscriptionWhereInput!]
  OR: [ToDoSubscriptionWhereInput!]
  NOT: [ToDoSubscriptionWhereInput!]
}

input ToDoUpdateInput {
  title: String
  description: String
  isDone: Boolean
  user: UserUpdateOneRequiredWithoutTodoesInput
}

input ToDoUpdateManyDataInput {
  title: String
  description: String
  isDone: Boolean
}

input ToDoUpdateManyMutationInput {
  title: String
  description: String
  isDone: Boolean
}

input ToDoUpdateManyWithoutUserInput {
  create: [ToDoCreateWithoutUserInput!]
  delete: [ToDoWhereUniqueInput!]
  connect: [ToDoWhereUniqueInput!]
  set: [ToDoWhereUniqueInput!]
  disconnect: [ToDoWhereUniqueInput!]
  update: [ToDoUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ToDoUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ToDoScalarWhereInput!]
  updateMany: [ToDoUpdateManyWithWhereNestedInput!]
}

input ToDoUpdateManyWithWhereNestedInput {
  where: ToDoScalarWhereInput!
  data: ToDoUpdateManyDataInput!
}

input ToDoUpdateWithoutUserDataInput {
  title: String
  description: String
  isDone: Boolean
}

input ToDoUpdateWithWhereUniqueWithoutUserInput {
  where: ToDoWhereUniqueInput!
  data: ToDoUpdateWithoutUserDataInput!
}

input ToDoUpsertWithWhereUniqueWithoutUserInput {
  where: ToDoWhereUniqueInput!
  update: ToDoUpdateWithoutUserDataInput!
  create: ToDoCreateWithoutUserInput!
}

input ToDoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  isDone: Boolean
  isDone_not: Boolean
  user: UserWhereInput
  AND: [ToDoWhereInput!]
  OR: [ToDoWhereInput!]
  NOT: [ToDoWhereInput!]
}

input ToDoWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  auth0id: String
  todoes(where: ToDoWhereInput, orderBy: ToDoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ToDo!]
  labels(where: LabelWhereInput, orderBy: LabelOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Label!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  auth0id: String
  todoes: ToDoCreateManyWithoutUserInput
  labels: LabelCreateManyInput
}

input UserCreateOneWithoutTodoesInput {
  create: UserCreateWithoutTodoesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTodoesInput {
  auth0id: String
  labels: LabelCreateManyInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  auth0id_ASC
  auth0id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  auth0id: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  auth0id: String
  todoes: ToDoUpdateManyWithoutUserInput
  labels: LabelUpdateManyInput
}

input UserUpdateManyMutationInput {
  auth0id: String
}

input UserUpdateOneRequiredWithoutTodoesInput {
  create: UserCreateWithoutTodoesInput
  update: UserUpdateWithoutTodoesDataInput
  upsert: UserUpsertWithoutTodoesInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTodoesDataInput {
  auth0id: String
  labels: LabelUpdateManyInput
}

input UserUpsertWithoutTodoesInput {
  update: UserUpdateWithoutTodoesDataInput!
  create: UserCreateWithoutTodoesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  auth0id: String
  auth0id_not: String
  auth0id_in: [String!]
  auth0id_not_in: [String!]
  auth0id_lt: String
  auth0id_lte: String
  auth0id_gt: String
  auth0id_gte: String
  auth0id_contains: String
  auth0id_not_contains: String
  auth0id_starts_with: String
  auth0id_not_starts_with: String
  auth0id_ends_with: String
  auth0id_not_ends_with: String
  todoes_every: ToDoWhereInput
  todoes_some: ToDoWhereInput
  todoes_none: ToDoWhereInput
  labels_every: LabelWhereInput
  labels_some: LabelWhereInput
  labels_none: LabelWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  auth0id: String
}
`
      }
    