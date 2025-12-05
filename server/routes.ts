import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const userMessage = await storage.createMessage(messageData);
      
      const allMessages = await storage.getMessages();
      const conversationHistory = allMessages.map(msg => ({
        role: msg.isUser ? "user" as const : "assistant" as const,
        content: msg.content,
      }));

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: conversationHistory,
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
      
      const aiMessage = await storage.createMessage({
        content: aiResponse,
        isUser: false,
      });

      res.json({
        userMessage,
        aiMessage,
      });
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ error: "Failed to create message" });
    }
  });

  app.delete("/api/messages", async (req, res) => {
    try {
      await storage.deleteAllMessages();
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting messages:", error);
      res.status(500).json({ error: "Failed to delete messages" });
    }
  });

  return httpServer;
}
