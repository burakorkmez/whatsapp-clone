<a href="https://youtu.be/sQ1zvdS8eU8">
  <img alt="AI-powered WhatsApp." src="https://i.ibb.co/YcWpZ5F/Screenshot-24.png">
  <h1 align="center">AI Powered WhatsApp Clone</h1>
</a>

<p align="center">
 Make WhatsApp a little bit more exiciting by integratin GPT and DALL-E-3 
</p>

<p align="center">
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
</p>
<br/>

## Tech Stack

-   [Convex](https://convex.dev/) for the database, real-time events and cloud functions
-   Next.js [App Router](https://nextjs.org/docs/app) for the framework
-   [ShadCN](https://ui.shadcn.com/) for UI components
-   [Convex File Storage](https://docs.convex.dev/file-storage) for storing images and videos
-   [ZegoCloud](https://www.zegocloud.com) for video calls
-   [Clerk](https://clerk.dev/) for user authentication
-   [Tailwind CSS](https://tailwindcss.com/) for styling
-   [TypeScript](https://www.typescriptlang.org/) just to feel cool

## Deploy Your Own

You can deploy this app by setting up the following services and adding their environment variables:

1. Run `npm install` to install dependencies.
2. Run `npm run dev`. It will prompt you to log into [Convex](https://convex.dev) and create a project.
3. It will then ask you to supply the `CLERK_ISSUER_URL`. To do this:
    1. Make a [Clerk](https://clerk.dev) account.
    2. Copy both the `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` [API keys](https://dashboard.clerk.com/last-active?path=api-keys) into `.env.local`.
    3. Do steps 1-3 [here](https://docs.convex.dev/auth/clerk) and copy the Issuer URL.
       It should look something like `https://some-animal-123.clerk.accounts.dev`.
    4. Add `CLERK_ISSUER_URL` to your [Convex Environment Variables](https://dashboard.convex.dev/deployment/settings/environment-variables?var=CLERK_ISSUER_URL)
       Paste the Issuer URL as the value and click "Save".
4. Add `CLERK_HOST_NAME` to your [Convex Environment Variables](https://dashboard.convex.dev/deployment/settings/environment-variables?var=CLERK_ISSUER_URL) as for the value paste the `CLERK_ISSUER_URL's` value
5. From your [CLERK](https://clerk.dev) account, under the WebHooks, add an endpoint which should look like this: `https://your-convex-url.convex.site/clerk` and select `user.created` `user.updated` `session.created` `session.ended` events. Copy the webhook secret and in your Convex Dashboard add this env variable `CLERK_WEBHOOK_SECRET` and paste the value
6. Now your frontend and backend should be running and you should be able to log in but not support OpenAI features.
7. Create an [OpenAI](https://platform.openai.com/) account to get $5 of free credit or pay for your current account and get your `OPENAI_API_KEY` and add it to Convex Dashboard
8. To enable video calling, create a [ZEGOCLOUD](https://www.zegocloud.com) account, create a project and select voice && video calls. Paste `ZEGO_APP_ID` and `ZEGO_SERVER_SECRET` to .env.local and save
9. Now it should be up and running. Check out the [TUTORIAL](https://youtu.be/sQ1zvdS8eU8) for a complete walk-through.

## Thanks for your support

-   Like && Subscribe for more projects like this
