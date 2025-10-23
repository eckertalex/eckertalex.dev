---
title: A Practical Evaluation of Typescript Branded Types
pubDate: 2025-10-23
modTime: 2025-10-23
description: 
draft: true
---

# Blog Post Structure: TypeScript Branded Types - A Practical Evaluation

## 1. Introduction
- Hook: Start with a real bug scenario
  - Example: `updateUserEmail(orderId, newEmail)` - wrong ID type passed, user gets someone else's order confirmations
  - Or: `calculateShipping(priceInCents, weightInPounds)` but you pass `(weightInPounds, priceInCents)` - compiles fine, creates nonsense
  - "This shouldn't compile, but it does. Why?"
- Set expectations: This post is skeptical of branded types
  - They solve a real problem, but create new ones
  - Most codebases don't need them
  - When you do need them, use them surgically

## 2. The Root Problem: Structural vs Nominal Typing

### 2.1 TypeScript's Structural Type System
- Brief explanation: Types are compatible if their structure matches
- Example showing the problem:
```typescript
type UserId = string;
type OrderId = string;

function getUserOrders(userId: UserId): Order[] { /* ... */ }
function getOrderDetails(orderId: OrderId): OrderDetail { /* ... */ }

const userId: UserId = "user_123";
const orderId: OrderId = "order_456";

// Both compile - they're just strings
getUserOrders(orderId);  // Wrong! Returns empty array or someone else's orders
getOrderDetails(userId); // Wrong! Returns null or wrong order
```
- Why this happens: Structural typing means `UserId` and `OrderId` are identical
- The tension: JavaScript is structurally typed, TypeScript follows suit

### 2.2 What Nominal Typing Would Look Like
- Languages with nominal typing (Java, C#, Rust, Go)
- Brief explanation: Types are distinct even if structure is identical
- Show what we wish we could do:
```typescript
// This isn't valid TypeScript
nominal type UserId = string;
nominal type OrderId = string;

getUserOrders(orderId); // ✗ Compile error!
```
- The gap: We want nominal guarantees in a structural system
- **But should we hack our way there?**

## 3. Valid Use Cases (Rare and Specific)

### 3.1 Internal Library Code with Multiple ID Types
- **The scenario:** You're building an internal data access library used across teams
- Multiple entity types: `UserId`, `OrderId`, `ProductId`, `OrganizationId`
- High risk: Teams mix these up, causes real bugs
- Library boundary enforcement makes sense here
```typescript
// In your data-access library
type UserId = string & { readonly __brand: unique symbol };
type OrderId = string & { readonly __brand: unique symbol };

// Forces consuming teams to be explicit
export function getUserById(id: UserId): Promise<User>;
export function getOrderById(id: OrderId): Promise<Order>;
```

### 3.2 Units of Measurement in Domain-Critical Code
- Example: `Meters`, `Feet`, `Kilograms`, `Pounds`
- Only if your domain makes this critical (engineering, physics, finance)
```typescript
type Meters = number & { readonly __brand: unique symbol };
type Feet = number & { readonly __brand: unique symbol };

function setAltitude(altitude: Meters) { /* ... */ }
const planeHeight: Feet = Feet(30000);
setAltitude(planeHeight); // ✗ Type error - good!
```
- **Ask yourself:** Has your team actually confused units in production? If not, don't add this.

### 3.3 Validated vs Unvalidated Data (With Caution)
- Example: `ValidatedInput` vs raw `string`, `SanitizedHTML` vs `string`
- Encode that validation has occurred in the type
- But: This only works if you control ALL entry points
```typescript
type SanitizedHTML = string & { readonly __brand: unique symbol };

function renderUserContent(html: SanitizedHTML) {
  document.innerHTML = html; // Safe - type proves it's sanitized
}
```
- **Reality check:** One `as` cast anywhere ruins everything

### 3.4 When NOT to Use Them (Most of the Time)
- **Application code in general:** Variable names and good structure are better
- **Few entity types:** If you only have 2-3 ID types, the complexity isn't worth it
- **Types that rarely interact:** If `UserId` and `ProductId` never appear in the same function, no confusion possible
- **High-trust codebases:** If your team doesn't make these mistakes, why add complexity?
- **Any time you can solve it with better naming:**
  ```typescript
  // Instead of branded types:
  function updateUserEmail(userId: string, email: string) // Bad naming
  
  // Just name things well:
  function updateUserEmail(args: { userId: string; newEmail: string }) // Clear
  ```

## 4. Implementation Approaches (And Why They All Have Problems)

### 4.1 Type Alias - THE DANGEROUS ILLUSION

**DO NOT DO THIS. EVER.**

```typescript
type UserId = string;
type OrderId = string;

const userId: UserId = "user_123";
const orderId: OrderId = "order_456";

function getUserOrders(userId: UserId) { /* ... */ }
getUserOrders(orderId); // Still compiles! No safety whatsoever
```

- **Runtime artifact:** None
- **Type safety:** NONE - zero, zilch, nada
- **Why it's dangerous:** Looks like it should work, creates false sense of security
- **What to do instead:** Use good variable names and don't pretend you have type safety
- **Verdict:** This is worse than nothing because it lies to you

### 4.2 Basic Brand with Manual Casting
```typescript
type UserId = string & { readonly __brand: unique symbol };
type OrderId = string & { readonly __brand: unique symbol };

const userId = "user_123" as UserId;
const orderId = "order_456" as OrderId;

function getUserOrders(userId: UserId) { /* ... */ }
getUserOrders(orderId); // ✗ Type error!
getUserOrders(userId);  // ✓ Works
```
- **Runtime artifact:** None (the brand is erased)
- **Type safety:** Compile-time only, easily bypassed
- **Pros:** Simple, no runtime cost
- **Cons:** `as` casts everywhere, easy to abuse (see section 5)

### 4.3 Brand with Utility Functions
```typescript
type Brand<T, BrandName> = T & { readonly __brand: BrandName };
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

// Constructor functions
const UserId = (id: string): UserId => id as UserId;
const OrderId = (id: string): OrderId => id as OrderId;

const userId = UserId("user_123");
const orderId = OrderId("order_456");

function getUserOrders(userId: UserId) { /* ... */ }
getUserOrders(orderId); // ✗ Type error!
```
- **Runtime artifact:** None (constructors are identity functions)
- **Type safety:** Better ergonomics, still compile-time only
- **Pros:** Cleaner API, less casting noise
- **Cons:** Still completely bypassable with `as` (see section 5)

### 4.4 Smart Constructors with Validation
```typescript
type PositiveInteger = number & { readonly __brand: unique symbol };

function PositiveInteger(n: number): PositiveInteger | null {
  return Number.isInteger(n) && n > 0 ? n as PositiveInteger : null;
}

function calculatePrice(quantity: PositiveInteger, unitPrice: number) {
  return quantity * unitPrice; // Guaranteed positive
}

// Usage
const qty = PositiveInteger(userInput);
if (qty) {
  const price = calculatePrice(qty, 10.99);
}
```
- **Runtime artifact:** Validation logic only
- **Type safety:** Compile-time + runtime validation
- **Pros:** Combines both types of safety, encodes that validation occurred
- **Cons:** STILL bypassable with `as`, no runtime type information

## 5. Breaking the Safety (Why This Is All Theater)

### 5.1 The `as` Keyword (The Nuclear Option)
```typescript
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

const orderId = OrderId("order_456");
const fakeUserId = orderId as unknown as UserId; // Compiles!

getUserOrders(fakeUserId); // Safety completely bypassed
```
- **Point:** All branded type approaches are defeated by `as`
- This is by design - TypeScript trusts you
- **The problem:** One careless developer, one `as` cast, your entire system is compromised
- **There is no ESLint rule that will save you from determined or careless devs**

### 5.2 The `any` Type (The Contagion)
```typescript
function getUserOrders(userId: UserId) { /* ... */ }

const somethingDangerous: any = "not_even_an_id";
getUserOrders(somethingDangerous); // Compiles!
```
- `any` infects everything it touches
- One `any` anywhere in the chain ruins all guarantees

### 5.3 External Data / API Boundaries (The Real World)
```typescript
const response = await fetch('/api/user');
const data = await response.json(); // Type is `any`

// Someone will do this:
const userId: UserId = data.id as UserId; // No validation!

getUserOrders(userId); // Your branded types are meaningless
```
- Runtime data is untyped
- Branded types don't protect you here AT ALL
- Need actual runtime validation (Zod, io-ts, etc.)
- **But:** If you have runtime validation, do you even need the branded types?

### 5.4 The Trust Problem
- Branded types require PERFECT DISCIPLINE from entire team
- One person using `as` carelessly breaks everything
- No linter can prevent this completely
- You're better off with:
  - Good code review
  - Good variable naming
  - Good function signatures
  - Actual runtime validation where it matters

## 6. Runtime Safety: Classes with Private Fields

### 6.1 Implementation
```typescript
class UserId {
  private constructor(private readonly value: string) {}
  
  static create(id: string): UserId {
    // Could add validation here
    if (!id.startsWith('user_')) {
      throw new Error('Invalid user ID format');
    }
    return new UserId(id);
  }
  
  toString(): string {
    return this.value;
  }
  
  equals(other: UserId): boolean {
    return this.value === other.value;
  }
}

class OrderId {
  private constructor(private readonly value: string) {}
  
  static create(id: string): OrderId {
    if (!id.startsWith('order_')) {
      throw new Error('Invalid order ID format');
    }
    return new OrderId(id);
  }
  
  toString(): string {
    return this.value;
  }
}

function getUserOrders(userId: UserId): Order[] { /* ... */ }

const userId = UserId.create("user_123");
const orderId = OrderId.create("order_456");

getUserOrders(orderId); // ✗ Type error!
getUserOrders(userId);  // ✓ Works
```

### 6.2 Comparison with Branded Types
- **Runtime artifact:** YES - actual JavaScript classes, memory allocation, prototype chains
- **Type safety:** Compile-time AND runtime (can use `instanceof`)
- **Cannot be bypassed with `as`:** Much harder - you'd need to construct the class
- **Pros:**
  - True nominal types
  - Runtime type checking actually possible
  - Private constructor prevents invalid construction
  - Can add methods and behavior
  - Actually harder to circumvent
- **Cons:**
  - **Runtime overhead** - every ID is now an object
  - **Memory cost** - each instance takes more memory than a string
  - **Bundle size impact** - shipping class definitions
  - More boilerplate to write and maintain
  - Less ergonomic (`.toString()` everywhere)
  - Serialization becomes harder (JSON.stringify)

### 6.3 When to Use Classes vs Brands
- **Classes:** Almost never for simple IDs. Maybe for rich domain objects with behavior.
- **Brands:** Rarely, only in library code with high confusion risk.
- **Neither (most of the time):** Just use `string` and `number` with good names.

## 7. Practical Recommendations (Be Skeptical)

### 7.1 The Decision Tree

**Start here: DO NOT USE BRANDED TYPES**

Only consider them if ALL of these are true:
- [ ] You're building a library (especially internal) that others consume
- [ ] You have 5+ similar primitive types that frequently get confused
- [ ] You have actual production bugs from this confusion (not theoretical)
- [ ] Your team has perfect discipline with `as` casts (good luck)
- [ ] You've tried better naming and structuring first
- [ ] You accept the maintenance burden and cognitive overhead

**If any of these are false, use regular types with good names.**

### 7.2 What to Do Instead

**Better alternatives to branded types:**
```typescript
// Instead of: getUserOrders(userId: UserId)
// Do this:
function getUserOrders(params: { userId: string }): Order[] {
  // Parameter name makes it clear
  const { userId } = params;
}

// Instead of: transfer(from: UserId, to: UserId, amount: Cents)
// Do this:
type TransferParams = {
  fromUserId: string;
  toUserId: string;
  amountInCents: number;
};
function transfer(params: TransferParams) {
  // Crystal clear what each thing is
}
```

**Use objects to group related parameters:**
```typescript
// Bad: Easy to mix up positional parameters
function createOrder(userId: string, productId: string, quantity: number)

// Good: Impossible to mix up
function createOrder(params: {
  userId: string;
  productId: string;
  quantity: number;
})
```

**Note on named parameters:**
- Languages like Kotlin allow named arguments: `createOrder(userId = "123", productId = "456", quantity = 2)`
- This lets you skip parameter ordering issues entirely
- TypeScript doesn't have this feature
- **Best practice:** Use parameter objects once you reach 3-4 parameters anyway
- This gives you named parameters AND makes refactoring easier

**Use runtime validation where it actually matters:**
```typescript
import { z } from 'zod';

const UserIdSchema = z.string().regex(/^user_/);
const OrderIdSchema = z.string().regex(/^order_/);

// Validate at boundaries, use regular types everywhere else
const userId = UserIdSchema.parse(input);
```

## 8. Conclusion

### 8.1 The Harsh Truth
- Branded types solve a real problem (structural typing limitations)
- But they create more problems than they solve in most codebases
- They're defeated by `as`, `any`, and external data
- They require perfect discipline from entire team
- They add cognitive overhead and maintenance burden
- **Most apps don't need them**

### 8.2 What You Should Actually Do
1. Use good variable names
2. Use object parameters to avoid positional confusion
3. Use runtime validation at boundaries (Zod, io-ts)
4. Trust your code review process
5. Only use branded types surgically in library code where confusion is demonstrably common

### 8.3 When Branded Types Make Sense
- Internal libraries with many ID types
- Domain-critical unit confusion (if you've had real bugs)
- High-risk financial or engineering calculations
- **But:** Always as a last resort, not a first choice

### 8.4 Final Thought
TypeScript's structural typing is a feature, not a bug. Fighting it with branded types is usually unnecessary complexity. Write clear code with good names instead. Your future self will thank you.

### 8.5 Further Reading
- Domain Modeling Made Functional (Scott Wlaschin) - but remember, F# has real nominal types
- TypeScript handbook on type compatibility

---

## Optional Sections

### Appendix A: The "But My Team Needs This" Objection

**Common pushback:** "Our junior developers keep mixing up IDs!"

**Response:**
- Is this a training problem disguised as a type system problem?
- Have you tried better code review?
- Have you tried better function signatures?
- Are you using TypeScript as a crutch for poor communication?

**Remember:** If developers are regularly using `as` to bypass types, you have a people problem, not a tooling problem.

### Appendix B: Real-World War Stories

Include 1-2 examples where:
- Branded types actually prevented a bug (library code)
- Over-use of branded types made code harder to maintain
- Simple refactoring to better names solved the problem without brands
