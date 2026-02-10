const YT_KEY = "AIzaSyA7yFhl3QZ0es0Im0IYQ323csD3gKN9CI0";
const TWITCH_CLIENT = "5ca31xjeimzcw6dxllad4vfvsp3bh0";
const TWITCH_TOKEN = "m9ae34ex2lqsm7712ixml0e62wu3wz";

const list = document.getElementById("list");

async function check() {
  for (const s of streamers) {
    let live = false;

    if (s.type === "youtube") {
      const r = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${s.id}&type=video&eventType=live&key=${YT_KEY}`
      );
      const j = await r.json();
      live = j.items.length > 0;
    }

    if (s.type === "twitch") {
      const r = await fetch(
        `https://api.twitch.tv/helix/streams?user_login=${s.id}`,
        { headers:{
          "Client-ID":TWITCH_CLIENT,
          "Authorization":"Bearer "+TWITCH_TOKEN
        }}
      );
      const j = await r.json();
      live = j.data.length > 0;
    }

    const div = document.createElement("div");
    div.className = "card " + (live ? "live":"off");
    div.textContent = `${live?"🔴":"⚫"} ${s.name}`;
    list.appendChild(div);
  }
}

check();
