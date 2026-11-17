# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

The chat is configured to call `https://08-prj-loreal-chatbot.jasminv206.workers.dev/`.

To deploy the Worker:

1. In the Cloudflare dashboard, create a Worker named `08-prj-loreal-chatbot`.
2. Open [RESOURCE_cloudflare-worker.js](./RESOURCE_cloudflare-worker.js), copy its code into the Worker editor, and deploy it.
3. In the Worker settings, open **Variables and Secrets** and add a secret named `OPENAI_API_KEY` with your OpenAI API key. Save the secret and redeploy if Cloudflare prompts you.

Keep the API key in Cloudflare's secret settings only. Never add it to this repository. The frontend sends a `messages` array to the Worker and reads the reply from `data.choices[0].message.content`.

Enjoy building your L’Oréal beauty assistant! 💄
