import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Bot, Send, User, Sparkles, AlertCircle, InfoIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define model options with their pricing information
const MODEL_OPTIONS = [
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    pricePerInputToken: 0.0015 / 1000, // $0.0015 per 1K tokens
    pricePerOutputToken: 0.002 / 1000, // $0.002 per 1K tokens
    description: "Fast and cost-effective for most tasks",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    pricePerInputToken: 0.01 / 1000, // $0.01 per 1K tokens
    pricePerOutputToken: 0.03 / 1000, // $0.03 per 1K tokens
    description: "More capable for complex reasoning and specialized tasks",
  },
];

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean; usage?: any }>
  >([
    {
      text: "Hello! I'm your AI assistant specializing in real estate, IoT, social media, and AI cost optimization. How can I help you today?",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalTokensUsed, setTotalTokensUsed] = useState(0);
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0].id);
  const [lastUsageCost, setLastUsageCost] = useState<number | null>(null);

  // Calculate estimated cost based on input length and selected model
  const calculateEstimatedCost = (inputText: string, modelId: string) => {
    // Rough estimation: 1 token ≈ 4 characters for English text
    const estimatedInputTokens = Math.ceil(inputText.length / 4);
    // Assume output is roughly 2x the input for estimation purposes
    const estimatedOutputTokens = estimatedInputTokens * 2;

    const model =
      MODEL_OPTIONS.find((m) => m.id === modelId) || MODEL_OPTIONS[0];

    return {
      inputCost: estimatedInputTokens * model.pricePerInputToken,
      outputCost: estimatedOutputTokens * model.pricePerOutputToken,
      totalCost:
        estimatedInputTokens * model.pricePerInputToken +
        estimatedOutputTokens * model.pricePerOutputToken,
    };
  };

  // Calculate actual cost from usage data
  const calculateActualCost = (usage: any, modelId: string) => {
    if (!usage) return 0;

    const model =
      MODEL_OPTIONS.find((m) => m.id === modelId) || MODEL_OPTIONS[0];

    const inputCost = usage.prompt_tokens * model.pricePerInputToken;
    const outputCost = usage.completion_tokens * model.pricePerOutputToken;

    return inputCost + outputCost;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input.trim(), isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setLastUsageCost(null);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages
        .slice(-6) // Keep last 6 messages for context (to control cost)
        .map((msg) => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.text,
        }));

      console.log("Calling Edge Function with:", {
        message: input.trim(),
        model: selectedModel,
        conversationHistoryLength: conversationHistory.length,
      });

      const { data, error: functionError } = await supabase.functions.invoke(
        "supabase-functions-ai-chat",
        {
          body: {
            message: input.trim(),
            conversationHistory,
            model: selectedModel,
          },
        },
      );

      console.log("Supabase function invoke result:", {
        data,
        functionError,
        hasData: !!data,
        hasError: !!functionError,
      });

      console.log("Edge Function response:", { data, functionError });

      if (functionError) {
        throw new Error(functionError.message || "Failed to get AI response");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const assistantMessage = {
        text: data.message || "Sorry, I could not generate a response.",
        isUser: false,
        usage: data.usage,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Track token usage for cost monitoring
      if (data.usage?.total_tokens) {
        setTotalTokensUsed((prev) => prev + data.usage.total_tokens);

        // Calculate and set the cost of this interaction
        const cost = calculateActualCost(data.usage, selectedModel);
        setLastUsageCost(cost);
      }
    } catch (err: any) {
      console.error("AI Chat error - Full details:", {
        error: err,
        message: err?.message,
        stack: err?.stack,
        name: err?.name,
      });

      let errorMessage = "Failed to get AI response";
      let userMessage = "Sorry, I encountered an error. Please try again.";

      if (err.message) {
        errorMessage = err.message;

        // Provide specific user-friendly messages for common errors
        if (
          err.message.includes("quota exceeded") ||
          err.message.includes("insufficient_quota")
        ) {
          userMessage =
            "The OpenAI API quota has been exceeded. This means your OpenAI account needs additional funds. Please visit platform.openai.com/account/billing to add funds to your account.";
        } else if (err.message.includes("Rate limit")) {
          userMessage =
            "Too many requests. Please wait a moment before trying again.";
        } else if (err.message.includes("Authentication")) {
          userMessage = "Authentication error. Please contact support.";
        } else if (err.message.includes("service unavailable")) {
          userMessage =
            "AI service is temporarily unavailable. Please try again in a few minutes.";
        } else {
          userMessage = `Sorry, I encountered an error: ${err.message}. Please try again.`;
        }
      } else if (typeof err === "string") {
        errorMessage = err;
        userMessage = `Sorry, I encountered an error: ${err}. Please try again.`;
      }

      setError(errorMessage);
      setMessages((prev) => [
        ...prev,
        {
          text: userMessage,
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          AI Chat Assistant
        </h2>
        <p className="text-white">
          Ask questions about your data and get AI-powered insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Chat Input and Output Section */}
        <div className="md:col-span-2 space-y-6">
          {/* Chat Output */}
          <Card className="bg-[#1e1e2d] border-[#2a2a3a] h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-white">Conversation</CardTitle>
              <CardDescription className="text-gray-300">
                Chat with your AI assistant about your business data
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto space-y-4 pb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`rounded-full p-2 ${message.isUser ? "bg-[#7b68ee]" : "bg-[#2a2a3a]"}`}
                    >
                      {message.isUser ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg p-3 ${message.isUser ? "bg-[#7b68ee]" : "bg-[#2a2a3a]"}`}
                    >
                      <p className="text-white">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-[80%]">
                    <div className="rounded-full p-2 bg-[#2a2a3a]">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-lg p-3 bg-[#2a2a3a]">
                      <div className="flex space-x-2">
                        <div
                          className="h-2 w-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-white animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Input */}
          <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
            <CardContent className="pt-4">
              <div className="flex flex-col gap-3">
                {/* Model Selection */}
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center text-white text-sm">
                          <span>Model</span>
                          <InfoIcon className="h-3 w-3 ml-1 text-gray-400" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-[#2a2a3a] text-white">
                        <p>Select the AI model to use for your query</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-[180px] bg-[#2a2a3a] border-[#3a3a4a] text-white">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2a2a3a] border-[#3a3a4a] text-white">
                      {MODEL_OPTIONS.map((model) => (
                        <SelectItem
                          key={model.id}
                          value={model.id}
                          className="text-white hover:bg-[#3a3a4a]"
                        >
                          <div className="flex justify-between items-center w-full">
                            <span>{model.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Cost estimate display */}
                  <div className="ml-2 text-xs text-gray-400">
                    {input.trim() ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            Est. cost: $
                            {calculateEstimatedCost(
                              input,
                              selectedModel,
                            ).totalCost.toFixed(6)}
                          </TooltipTrigger>
                          <TooltipContent className="bg-[#2a2a3a] text-white">
                            <p>
                              {
                                MODEL_OPTIONS.find(
                                  (m) => m.id === selectedModel,
                                )?.description
                              }
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span>Enter text for cost estimate</span>
                    )}
                  </div>
                </div>

                {/* Input and Send Button */}
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Ask about real estate, IoT, social media, or AI costs..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && !isLoading && handleSendMessage()
                    }
                    className="bg-[#2a2a3a] border-[#3a3a4a] text-white"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {error && (
                <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
              {totalTokensUsed > 0 && (
                <div className="mt-2 text-xs text-gray-400">
                  Total tokens used: {totalTokensUsed}
                  {lastUsageCost !== null && (
                    <span className="ml-2">
                      Last message cost: ${lastUsageCost.toFixed(6)}
                    </span>
                  )}
                </div>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                  onClick={() =>
                    setInput("What are the current real estate market trends?")
                  }
                >
                  Real Estate Trends
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                  onClick={() =>
                    setInput("How can I optimize my IoT sensor network?")
                  }
                >
                  IoT Optimization
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                  onClick={() =>
                    setInput(
                      "What's the best social media strategy for my business?",
                    )
                  }
                >
                  Social Media Strategy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#2a2a3a] bg-[#2a2a3a] text-white hover:bg-[#353545]"
                  onClick={() =>
                    setInput("How can I reduce my AI prompt costs?")
                  }
                >
                  Reduce AI Costs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Isometric Game Visualization */}
        <Card className="bg-[#1e1e2d] border-[#2a2a3a] h-[600px] relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white">AI Agents at Work</CardTitle>
            <CardDescription className="text-gray-300">
              Visual representation of AI agents processing your data
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <div className="absolute inset-0 bg-[#1a1a24]">
              {/* Grid lines */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to right, #2a2a3a 1px, transparent 1px), linear-gradient(to bottom, #2a2a3a 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              ></div>

              {/* Isometric platform */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#2a2a3a]"
                style={{
                  transform:
                    "translate(-50%, -50%) rotateX(60deg) rotateZ(45deg)",
                }}
              ></div>

              {/* AI Agent 1 */}
              <div
                className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-[#7b68ee] opacity-20 blur-md"></div>
                  <div className="relative bg-[#7b68ee] text-white p-2 rounded-full">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* AI Agent 2 */}
              <div
                className="absolute left-3/4 top-1/3 -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{ animationDuration: "2s" }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-[#ff7676] opacity-20 blur-md"></div>
                  <div className="relative bg-[#ff7676] text-white p-2 rounded-full">
                    <Bot className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* AI Agent 3 */}
              <div
                className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 animate-bounce"
                style={{ animationDuration: "4s" }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-[#76e4ff] opacity-20 blur-md"></div>
                  <div className="relative bg-[#76e4ff] text-white p-2 rounded-full">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Data streams */}
              <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-[#7b68ee] w-1 h-1 rounded-full animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDuration: `${1 + Math.random() * 3}s`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
