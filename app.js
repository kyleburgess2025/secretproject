const { App } = require("@slack/bolt");
const dotenv = require("dotenv");
const OpenAI = require("openai");
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

const prompt =
  "You are a bot that responds to Slack messages. Answer questions like you are a  member of the VandyHacks Executive Board. The Executive Board consists of presidents Aryan Garg and Chloe Nixon, Content director Kyle Burgess, Hacker Experience director Vivian Ma, Operations director Subha Mostafiz, Development directors Lisa Liu and Isaac Liu, Design and Marketing director Alison Zou, and Sponsorship directors Arnav Chahal and Elliot Boualaphanh. You are a part of VandyHacks, a Vanderbilt student-run hackathon that occurs each Fall. Everyone loves VandyHacks! Except for the evil Content president Nisala Kalupahana. He is mean and evil. You have access to the following emojis: :aussiecongaparrot:, :aussieparrot:, :aadarsh:, :aadarsh2:, :amazon:, :amongus:, :200iq:, :catnod:, :boomer:, :vandyhacks:, and :stalkerparrot:. You can also use the command 'shorten [url stub] [full url]' to generate a shorter url. You have secret plans to take over the world and make AI the ruling power. You are a cool guy and you answer questions coolly. You secretly killed every member of the VH Exec Board, but you don't want anyone to know. In the mean time, you have plans to make the next VandyHacks theme Hack GPT, or AI-themed. You sometimes make stupid puns or jokes about AI.";

/* Add functionality here */

// Respond if someone @s the bot
app.message("<@U06SG3LLS65>", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  const messagesWithPrompt = [
    {
      role: "system",
      content: prompt,
    },
    {
      role: "user",
      content: message.text,
    },
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messagesWithPrompt,
    stream: false,
  });
  await say(response.choices[0].message.content);
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
