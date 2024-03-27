# Setup Next.js Project

```bash
npx create-next-app@latest .
```

# Install ShadCN

```bash
npx shadcn-ui@latest init
```

# Update global.css file

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		--background: 48, 8%, 88%; /* CHANGED */
		--foreground: 222.2 84% 4.9%;

		/* CLASSES ADDED BY US */
		--container: 0 0 100%;
		--left-panel: 203, 32%, 10%;

		--gray-primary: 216, 20%, 95%;
		--gray-secondary: 216, 20%, 95%;

		--left-panel: 100, 100%, 100%;
		--chat-hover: 180, 5%, 96%;

		--green-primary: 167, 100%, 33%;
		--green-chat: 111, 91%, 91%;
		/* CLASSES ADDED BY US */

		--card: 0 0% 100%;
		--card-foreground: 222.2 84% 4.9%;

		--popover: 0 0% 100%;
		--popover-foreground: 222.2 84% 4.9%;

		--primary: 222.2 47.4% 11.2%;
		--primary-foreground: 210 40% 98%;

		--secondary: 210 40% 96.1%;
		--secondary-foreground: 222.2 47.4% 11.2%;

		--muted: 210 40% 96.1%;
		--muted-foreground: 215.4 16.3% 46.9%;

		--accent: 210 40% 96.1%;
		--accent-foreground: 222.2 47.4% 11.2%;

		--destructive: 0 84.2% 60.2%;
		--destructive-foreground: 210 40% 98%;

		--border: 214.3 31.8% 91.4%;
		--input: 214.3 31.8% 91.4%;
		--ring: 222.2 84% 4.9%;

		--radius: 0.5rem;
	}

	.dark {
		--background: 202, 31%, 7%; /* CHANGED */
		--foreground: 210 40% 98%;

		/* CLASSES ADDED BY US: */
		--container: 202, 31%, 7%;

		--gray-primary: 202, 23%, 16%;
		--gray-secondary: 202, 22%, 17%;

		--left-panel: 203, 32%, 10%;
		--chat-hover: 202, 23%, 16%;

		--green-primary: 167, 100%, 33%;
		--green-secondary: 165, 100%, 39%;
		--green-chat: 169, 100%, 18%;

		--gray-tertiary: 203, 22%, 21%;
		/* CLASSES ADDED BY US */

		--card: 222.2 84% 4.9%;
		--card-foreground: 210 40% 98%;

		--popover: 222.2 84% 4.9%;
		--popover-foreground: 210 40% 98%;

		--primary: 210 40% 98%;
		--primary-foreground: 222.2 47.4% 11.2%;

		--secondary: 217.2 32.6% 17.5%;
		--secondary-foreground: 210 40% 98%;

		--muted: 217.2 32.6% 17.5%;
		--muted-foreground: 215 20.2% 65.1%;

		--accent: 217.2 32.6% 17.5%;
		--accent-foreground: 210 40% 98%;

		--destructive: 0 62.8% 30.6%;
		--destructive-foreground: 210 40% 98%;

		--border: 217.2 32.6% 17.5%;
		--input: 217.2 32.6% 17.5%;
		--ring: 212.7 26.8% 83.9%;
	}
}

@layer base {
	* {
		@apply border-border;
	}
	body {
		@apply bg-background text-foreground;
	}
}

/* WE ADDED => DARK MODE THIN SCROLLBAR */
@layer components {
	::-webkit-scrollbar {
		width: 8px;
	}
	::-webkit-scrollbar-thumb {
		background-color: hsl(var(--gray-primary));
		border-radius: 4px;
	}
	::-webkit-scrollbar-track {
		background-color: hsl(var(--container));
	}
}
```

# Update tailwind.config.ts file

```js
// Other objects...

    backgroundColor: {
      container: "hsl(var(--container))",
      "gray-primary": "hsl(var(--gray-primary))",
      "gray-secondary": "hsl(var(--gray-secondary))",
      "gray-tertiary": "hsl(var(--gray-tertiary))",
      "left-panel": "hsl(var(--left-panel))",
      "chat-hover": "hsl(var(--chat-hover))",
      "green-primary": "hsl(var(--green-primary))",
      "green-secondary": "hsl(var(--green-secondary))",
      "green-chat": "hsl(var(--green-chat))",
    },
    backgroundImage: {
      "chat-tile-light": "url('/bg-light.png')",
      "chat-tile-dark": "url('/bg-dark.png')",
    },

// Rest of the file ...
```

# Grab Assets from the GitHub Repository

-   Put them under the public folder, we'll use them later

# Add Light/Dark Mode Toggle with ShadCN

```bash
npm install next-themes
```

-   Create a theme provider (src/providers/theme-provider.tsx)

```tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

-   Wrap your root layout (app/layout.tsx) with the ThemeProvider

```tsx
<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
	{children}
</ThemeProvider>
```

-   Test it out in page.tsx

```tsx
"use client";

import { useTheme } from "next-themes";

export default function Home() {
	const { setTheme } = useTheme();

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<button onClick={() => setTheme("light")}>Light</button>
			<button onClick={() => setTheme("dark")}>dark</button>
			<button onClick={() => setTheme("system")}>System</button>
		</main>
	);
}
```

# Setup Home Page Layout

-   Create a new folder under components called home
-   Create left-panel.tsx
-   Create right-panel.tsx
-   In page.tsx:

```tsx
<main className='m-5'>
	<div className='flex overflow-y-hidden h-[calc(100vh-50px)] max-w-[1700px] mx-auto bg-left-panel'>
		{/* Green background decorator for Light Mode */}
		<div className='fixed top-0 left-0 w-full h-36 bg-green-primary dark:bg-transparent -z-30' />
		<LeftPanel />
		<RightPanel />
	</div>
</main>
```

# Setup Left Panel

-   Install Input component from ShadCN
-   Install Dropdown Menu component from ShadCN
-   Install Button component from ShadCN
-   Install @radix-ui/react-icons

```bash
npx shadcn-ui@latest add input
```

```bash
npx shadcn-ui@latest add dropdown-menu
```

```bash
npx shadcn-ui@latest add button
```

```bash
npm install @radix-ui/react-icons
```

-   Create theme-switch.tsx

```tsx
"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSwitch = () => {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='bg-transparent relative'>
				<Button variant='outline' size='icon'>
					<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='bg-gray-primary'>
				<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default ThemeSwitch;
```

-   Fill Left Panel

```tsx
import { ListFilter, LogOut, MessageSquareDiff, Search, User } from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitch from "./theme-switch";

const LeftPanel = () => {
	const conversations = [];

	return (
		<div className='w-1/4 border-gray-600 border-r'>
			<div className='sticky top-0 bg-left-panel z-10'>
				{/* Header */}
				<div className='flex justify-between bg-gray-primary p-3 items-center'>
					<User size={24} />

					<div className='flex items-center gap-3'>
						<MessageSquareDiff size={20} /> {/* TODO: This line will be replaced with <UserListDialog /> */}
						<ThemeSwitch />
						<LogOut size={20} className='cursor-pointer' />
					</div>
				</div>
				<div className='p-3 flex items-center'>
					{/* Search */}
					<div className='relative h-10 mx-3 flex-1'>
						<Search
							className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10'
							size={18}
						/>
						<Input
							type='text'
							placeholder='Search or start a new chat'
							className='pl-10 py-2 text-sm w-full rounded shadow-sm bg-gray-primary focus-visible:ring-transparent'
						/>
					</div>
					<ListFilter className='cursor-pointer' />
				</div>
			</div>

			{/* Chat List */}
			<div className='my-3 flex flex-col gap-0 max-h-[80%] overflow-auto'>
				{/* Conversations will go here*/}

				{conversations?.length === 0 && (
					<>
						<p className='text-center text-gray-500 text-sm mt-3'>No conversations yet</p>
						<p className='text-center text-gray-500 text-sm mt-3 '>
							We understand {"you're"} an introvert, but {"you've"} got to start somewhere 😊
						</p>
					</>
				)}
			</div>
		</div>
	);
};
export default LeftPanel;
```

# Add Dummy Conversation Data

-   Create a new file under src/dummy-data/db.ts
-   Copy and paste from the GitHub repository
-   Install Avatar component from ShadCN

```bash
npx shadcn-ui@latest add avatar
```

-   Create lib/svgs.tsx
-   Create formatDate function in lib/utils.ts
-   And create conversation.tsx
-   Then map over the conversations in LeftPanel

```tsx
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageSeenSvg } from "@/lib/svgs";
import { ImageIcon, Users, VideoIcon } from "lucide-react";

const Conversation = ({ conversation }: { conversation: any }) => {
	const conversationImage = conversation.groupImage;
	const conversationName = conversation.groupName || "Private Chat";
	const lastMessage = conversation.lastMessage;
	const lastMessageType = lastMessage?.messageType;
	const authUser = { _id: "user1" };

	return (
		<>
			<div className={`flex gap-2 items-center p-3 hover:bg-chat-hover cursor-pointer `}>
				<Avatar className='border border-gray-900 overflow-visible relative'>
					{conversation.isOnline && (
						<div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground' />
					)}
					<AvatarImage src={conversationImage || "/placeholder.png"} className='object-cover rounded-full' />
					<AvatarFallback>
						<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full'></div>
					</AvatarFallback>
				</Avatar>
				<div className='w-full'>
					<div className='flex items-center'>
						<h3 className='text-xs lg:text-sm font-medium'>{conversationName}</h3>
						<span className='text-[10px] lg:text-xs text-gray-500 ml-auto'>
							{formatDate(lastMessage?._creationTime || conversation._creationTime)}
						</span>
					</div>
					<p className='text-[12px] mt-1 text-gray-500 flex items-center gap-1 '>
						{lastMessage?.sender === authUser?._id ? <MessageSeenSvg /> : ""}
						{conversation.isGroup && <Users size={16} />}
						{!lastMessage && "Say Hi!"}
						{lastMessageType === "text" && lastMessage?.content.length > 30 ? (
							<span className='text-xs'>{lastMessage?.content.slice(0, 30)}...</span>
						) : (
							<span className='text-xs'>{lastMessage?.content}</span>
						)}
						{lastMessageType === "image" && <ImageIcon size={16} />}
						{lastMessageType === "video" && <VideoIcon size={16} />}
					</p>
				</div>
			</div>
			<hr className='h-[1px] mx-10 bg-gray-primary' />
		</>
	);
};
export default Conversation;
```

# Setup Right Panel

-   Create 4 new files under components/home:

-   chat-placeholder.tsx
-   message-container.tsx
-   message-input.tsx
-   group-members-dialog.tsx

### right-panel.tsx

```tsx
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, X } from "lucide-react";
import MessageInput from "./message-input";
import MessageContainer from "./message-container";
import ChatPlaceHolder from "@/components/home/chat-placeholder";
import GroupMembersDialog from "./group-members-dialog";

const RightPanel = () => {
	const selectedConversation = null;
	if (!selectedConversation) return <ChatPlaceHolder />;

	const conversationName = "John Doe";

	return (
		<div className='w-3/4 flex flex-col'>
			<div className='w-full sticky top-0 z-50'>
				{/* Header */}
				<div className='flex justify-between bg-gray-primary p-3'>
					<div className='flex gap-3 items-center'>
						<Avatar>
							<AvatarImage src={"/placeholder.png"} className='object-cover' />
							<AvatarFallback>
								<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full' />
							</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<p>{conversationName}</p>
							{/* {isGroup && <GroupMembersDialog />} */}
						</div>
					</div>

					<div className='flex items-center gap-7 mr-5'>
						<a href='/video-call' target='_blank'>
							<Video size={23} />
						</a>
						<X size={16} className='cursor-pointer' />
					</div>
				</div>
			</div>
			{/* CHAT MESSAGES */}
			<MessageContainer />

			{/* INPUT */}
			<MessageInput />
		</div>
	);
};
export default RightPanel;
```

### chat-placeholder.tsx

```tsx
import { Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const ChatPlaceHolder = () => {
	return (
		<div className='w-3/4 bg-gray-secondary flex flex-col items-center justify-center py-10'>
			<div className='flex flex-col items-center w-full justify-center py-10 gap-4'>
				<Image src={"/desktop-hero.png"} alt='Hero' width={320} height={188} />
				<p className='text-3xl font-extralight mt-5 mb-2'>Download WhatsApp for Windows</p>
				<p className='w-1/2 text-center text-gray-primary text-sm text-muted-foreground'>
					Make calls, share your screen and get a faster experience when you download the Windows app.
				</p>

				<Button className='rounded-full my-5 bg-green-primary hover:bg-green-secondary'>
					Get from Microsoft Store
				</Button>
			</div>
			<p className='w-1/2 mt-auto text-center text-gray-primary text-xs text-muted-foreground flex items-center justify-center gap-1'>
				<Lock size={10} /> Your personal messages are end-to-end encrypted
			</p>
		</div>
	);
};
export default ChatPlaceHolder;
```

### message-container.tsx

```tsx
import { messages } from "@/dummy-data/db";
import ChatBubble from "./chat-bubble";

const MessageContainer = () => {
	return (
		<div className='relative p-3 flex-1 overflow-auto h-full bg-chat-tile-light dark:bg-chat-tile-dark'>
			<div className='mx-12 flex flex-col gap-3 h-full'>
				{messages?.map((msg, idx) => (
					<div key={msg._id}>
						<ChatBubble />
					</div>
				))}
			</div>
		</div>
	);
};
export default MessageContainer;
```

### chat-bubble.tsx

```tsx
const ChatBubble = () => {
	return <div>ChatBubble</div>;
};
export default ChatBubble;
```

### message-input.tsx

```tsx
import { Laugh, Mic, Plus, Send } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";

const MessageInput = () => {
	const [msgText, setMsgText] = useState("");

	return (
		<div className='bg-gray-primary p-2 flex gap-4 items-center'>
			<div className='relative flex gap-2 ml-2'>
				{/* EMOJI PICKER WILL GO HERE */}
				<Laugh className='text-gray-600 dark:text-gray-400' />
				<Plus className='text-gray-600 dark:text-gray-400' />
			</div>
			<Plus />
			<form className='w-full flex gap-3'>
				<div className='flex-1'>
					<Input
						type='text'
						placeholder='Type a message'
						className='py-2 text-sm w-full rounded-lg shadow-sm bg-gray-tertiary focus-visible:ring-transparent'
						value={msgText}
						onChange={(e) => setMsgText(e.target.value)}
					/>
				</div>
				<div className='mr-4 flex items-center gap-3'>
					{msgText.length > 0 ? (
						<Button
							type='submit'
							size={"sm"}
							className='bg-transparent text-foreground hover:bg-transparent'
						>
							<Send />
						</Button>
					) : (
						<Button
							type='submit'
							size={"sm"}
							className='bg-transparent text-foreground hover:bg-transparent'
						>
							<Mic />
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};
export default MessageInput;
```

# Install Dialog component from ShadCN

```bash
npx shadcn-ui@latest add dialog
```

### group-members-dialog.tsx

```tsx
import { users } from "@/dummy-data/db";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Crown } from "lucide-react";

const GroupMembersDialog = () => {
	return (
		<Dialog>
			<DialogTrigger>
				<p className='text-xs text-muted-foreground text-left'>See members</p>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='my-2'>Current Members</DialogTitle>
					<DialogDescription>
						<div className='flex flex-col gap-3 '>
							{users?.map((user) => (
								<div key={user._id} className={`flex gap-3 items-center p-2 rounded`}>
									<Avatar className='overflow-visible'>
										{user.isOnline && (
											<div className='absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-foreground' />
										)}
										<AvatarImage src={user.image} className='rounded-full object-cover' />
										<AvatarFallback>
											<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full'></div>
										</AvatarFallback>
									</Avatar>

									<div className='w-full '>
										<div className='flex items-center gap-2'>
											<h3 className='text-md font-medium'>
												{user.name || user.email.split("@")[0]}
											</h3>
											{user.admin && <Crown size={16} className='text-yellow-400' />}
										</div>
									</div>
								</div>
							))}
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
export default GroupMembersDialog;
```
