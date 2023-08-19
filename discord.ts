
const DISCORD_BASE = "https://discord.com/api/v10";
const CHANNEL_ID = "1142339548140028016";
const AUTHORIZATION_HEADER = `Bot ${process.env.DISCORD_TOKEN}`;

type SendMessageParams = {
  content: string;
  channelID?: string;
}

export async function sendMessage({ content, channelID = CHANNEL_ID, }: SendMessageParams) {
  const url = `${DISCORD_BASE}/channels/${channelID}/messages`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": AUTHORIZATION_HEADER,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
  } catch (error) {
    console.log("Error sending message", error);
  }

}