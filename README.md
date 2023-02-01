# Telegram bot

Telegram bot that can process natural human language and place pizza orders. Built with Telegraf.js and Dialogflow ES API integration.

## Authors

-   [@i-zokirov](https://github.com/i-zokirov)

## Demo

You can interact with live demo bot on telegram: [https://t.me/testpitsabot](https://t.me/testpitsabot)

## Tech Stack

**Server:** Nodejs, Express, Typescript, Telegrafjs, Dialogflow API/SDK, Mongoose, Socket.IO

**Database:** MongoDB

## Features

-   Written in TypeScript: The project is written in TypeScript, a statically-typed language that builds on JavaScript and provides improved type safety and code organization.

-   Integration with Dialogflow ES: The bot has integration with Dialogflow ES, a language processing model that can understand natural human language.

-   Uzbek language training: The Dialogflow agent is trained in the Uzbek language, allowing users to interact with the bot in their native language.

-   Dialogflow contents included: The source repository includes the Dialogflow contents in the "dialogflow-content" directory, making it easy for developers to see how the language model is set up and how the bot is trained to respond to user inputs.

-   Multiple intents: The bot supports multiple intents, including a welcome intent, order pizza intent, help intent, and more, allowing users to interact with the bot in a variety of ways.

## Future Roadmap

-   Improve language processing modal to understand complex user queries.
-   Integrate payment processing to the bot using Stripe or other alternatives
-   Create Restaurant app that receives the orders bot has registered in real time with socket.io
-   Allow bot to receive restaurant updates on orders in real time and provide the updates on users
-   Create complex menu that can be managed by Restaurant managers in real time
-   Allow user to include multiple products in orders
-   Feedback collecting on completed orders

### Hi stranger 👋

-   📫 Feel free to reach me for collaboration: send email to izokirov@outlook.com

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI` - MongoDB database URI

`BOT_TOKEN` - telegram bot token

`dl_project_id` - Dialogflow project id

`dl_lang_code` - Dialogflow agent language code

`dl_location` - Dialogflow agent location
