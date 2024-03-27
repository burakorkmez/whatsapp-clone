-   npm i convex
-   npm convex dev

# CREATE SCHEMA

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	tasks: defineTable({
		text: v.string(),
		completed: v.boolean(),
	}),
	products: defineTable({
		name: v.string(),
		price: v.number(),
	}),
});
```

# CREATE TASKS

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTasks = query({
	args: {},
	handler: async (ctx, args) => {
		const tasks = await ctx.db.query("tasks").collect();
		return tasks;
	},
});

export const addTask = mutation({
	args: {
		text: v.string(),
	},
	handler: async (ctx, args) => {
		const taskId = await ctx.db.insert("tasks", { text: args.text, completed: false });
		return taskId;
	},
});

export const completeTask = mutation({
	args: {
		id: v.id("tasks"),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, { completed: true });
	},
});

export const deleteTask = mutation({
	args: {
		id: v.id("tasks"),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});
```

# CREATE PRODUCTS

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getProducts = query({
	args: {},
	handler: async (ctx, args) => {
		const products = await ctx.db.query("products").collect();
		return products;
	},
});

export const addProduct = mutation({
	args: {
		name: v.string(),
		price: v.number(),
	},
	handler: async (ctx, args) => {
		const productId = await ctx.db.insert("products", { name: args.name, price: args.price });
		return productId;
	},
});

export const deleteProduct = mutation({
	args: {
		id: v.id("products"),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});
```

# CREATE convex-client-provider.tsx

```tsx
"use client";
import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
	return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

# WRAP THE LAYOUT WITH THE PROVIDER

```tsx
<ConvexClientProvider>{children}</ConvexClientProvider>
```

# CREATE TASKS PAGE FOR TESTING PURPOSES

```tsx
"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const TasksPage = () => {
	const tasks = useQuery(api.tasks.getTasks);
	const deleteTask = useMutation(api.tasks.deleteTask);

	return (
		<div className='p-10 flex flex-col gap-4'>
			<h1 className='text-5xl'> All tasks are here in real-time</h1>
			{tasks?.map((task) => (
				<div key={task._id} className='flex gap-2'>
					<span>{task.text}</span>
					<button
						onClick={async () => {
							await deleteTask({ id: task._id });
						}}
					>
						Delete Task
					</button>
				</div>
			))}
		</div>
	);
};
export default TasksPage;
```
