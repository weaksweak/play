import { VK } from "vk-io";
import { HearManager } from "@vk-io/hear";
import { ChatGPTAPI } from "chatgpt";

const vk = new VK({
  token:
    "vk1.a.Jx57CjJi3v7pyxPXjW1J3srtDn5ZFaflYOf_nLxnRUDErbFlhym8M8h-GnmxzUQKjfzinRG0ecRmEZW6CQiC3-fhh2Nx15tYvRdRhUJTvArC-b1JjOkK5gMtUpRRDR1fmGqylbhZeBBdvCDPbKWfxucv9FI-jElzUEtxjoXSJTAve_aUtRckJD5_sC4E4KixmvRpSmi0XMqCKVwrBa3vow",
});

const api = new ChatGPTAPI({
  apiKey: "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",
});

const command = new HearManager();

vk.updates.on("message", command.middleware);
vk.updates.on("message", async (context, next) => {
  await next();
});

command.hear(/^\/gpt/i, async (context) => {
  context.send("Формирую ответ...");
  const prompt = context.message.text.replace(/^\/gpt/i, "").slice(1);
  try {
    const res = await api.sendMessage(prompt);
    context.send(res.text);
  } catch (e) {
    console.log(e);
    context.send(
      "К сожалению, произошла ошибка. Попробуйте сделать запрос позднее."
    );
  }
});

vk.updates
  .start()
  .then(() => console.log("Бот запущен!"))
  .catch(console.error);
