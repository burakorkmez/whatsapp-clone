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
