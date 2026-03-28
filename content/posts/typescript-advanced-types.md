---
title: 'TypeScript 高级类型指南'
description: '掌握 TypeScript 中的高级类型技巧和模式'
category: '前端'
tags: ['TypeScript', '类型系统']
date: '2026-03-24'
---

# TypeScript 高级类型指南

TypeScript 的类型系统非常强大，掌握高级类型技巧能让你的代码更加类型安全。

## 泛型（Generics）

泛型允许我们创建可重用的、类型安全的组件和函数。

```ts
// 泛型函数
function identity<T>(arg: T): T {
  return arg
}

identity<string>('hello')
identity<number>(42)

// 泛型约束
function printLength<T extends { length: number }>(arg: T): number {
  return arg.length
}
```

## 工具类型

TypeScript 内置了很多实用的工具类型：

### Partial / Required

```ts
interface User {
  id: number
  name: string
  email: string
}

// 所有属性可选
type PartialUser = Partial<User>

// 所有属性必填
type RequiredUser = Required<User>
```

### Pick / Omit

```ts
// 只选择某些属性
type UserName = Pick<User, 'name' | 'email'>

// 排除某些属性
type UserNoId = Omit<User, 'id'>
```

### Record

```ts
// 创建对象类型
type UserMap = Record<string, User>
const users: UserMap = {
  'user1': { id: 1, name: 'Alice', email: 'alice@example.com' }
}
```

## 条件类型

```ts
// 基础条件类型
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false
```

### infer 关键字

```ts
// 提取返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

const fn = () => ({ a: 1, b: 'hello' })
type FnReturn = ReturnType<typeof fn> // { a: number; b: string }
```

## 类型守卫

```ts
// typeof 守卫
function printId(id: number | string) {
  if (typeof id === 'number') {
    console.log(id.toFixed(2))
  } else {
    console.log(id.toUpperCase())
  }
}

// instanceof 守卫
function log(value: Date | string) {
  if (value instanceof Date) {
    console.log(value.toISOString())
  }
}

// 自定义类型守卫
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  )
}
```

## 总结

TypeScript 类型系统是一门深奥的学问，需要不断实践才能熟练掌握。
