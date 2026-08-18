VERCEL + EMAIL SETUP

1. Upload this folder to GitHub and import the repository into Vercel.
2. Create a Resend account and API key.
3. In Vercel: Project -> Settings -> Environment Variables.
4. Add:
   RESEND_API_KEY = your Resend API key
   OWNER_EMAIL = your email address
5. Select Production (and Preview if desired), save, then redeploy.

The Resend API key is server-side only; it is never placed in browser code.

The current sender is onboarding@resend.dev for testing. For a polished production site, verify your own domain in Resend and change the `from` address in api/response.js.

YES sends you the selected date idea, availability and optional note.
NO sends you a NO notification.
