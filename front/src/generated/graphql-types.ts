export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  updateUser?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  getUsers?: Maybe<Array<Maybe<User>>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type GetUsersListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersListQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id: string, name: string } | null> | null };

export type AddUserMutationVariables = Exact<{ [key: string]: never; }>;


export type AddUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string, name: string } | null };

export type UpdateUserMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string, name: string } | null };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'User', id: string, name: string } | null };
