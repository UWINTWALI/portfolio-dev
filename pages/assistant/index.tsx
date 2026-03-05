import type { NextPage } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import Avatar from '../../components/Avatar';
import Markdown from 'markdown-to-jsx';
import { RefreshCw, Send, User } from 'lucide-react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

import assistantIcon from '../../images/assistant.png';
import { v4 as uuidv4 } from 'uuid';

export const LOCAL_HISTORY_KEY = 'assistant-history';
export const LOCAL_SESSION_KEY = 'session-id-assistant';

type History = {
  from: 'user' | 'assistant';
  message: string;
  timestamp?: number;
};

// Array of sample questions for random selection
const SAMPLE_QUESTIONS = [
  'Can you share a recommendation from someone who has worked with Jean de Dieu?',
  "What is Jean de Dieu's education background?",
  'What are some examples of problems Jean de Dieu has solved in past roles?',
  'Can you list some projects and frameworks Jean de Dieu has worked on?',
  "What's Jean de Dieu's biggest professional achievement?",
  'How does Jean de Dieu approach problem-solving in his projects?',
  'What programming languages and technologies is Jean de Dieu most passionate about?',
  "Can you tell me about Jean de Dieu's leadership style and team collaboration?",
  'What unique skills or expertise does Jean de Dieu bring to a team?',
  'How does Jean de Dieu stay updated with the latest technology trends?',
  "What's the most challenging project Jean de Dieu has worked on?",
  "Can you describe Jean de Dieu's work philosophy and values?",
  'What industries or domains has Jean de Dieu gained experience in?',
  'How does Jean de Dieu balance technical excellence with business requirements?',
];

const Gpt: NextPage = () => {
  useEffect(() => {
    // google analytics
    ReactGA.send({
      hitType: 'pageview',
      page: '/assistant',
      title: 'Portfolio Assistant',
    });
  }, []);

  const [isServerUp, setIsServerUp] = useState(false);
  const [queryProcessing, setQueryProcessing] = useState(false);
  const [query, setQuery] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [history, setHistory] = useState<History[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const historyRef = useRef<HTMLDivElement>(null);

  // Rate limiting configuration
  const RATE_LIMIT_MS = 3000; // 3 seconds cooldown between requests

  // Function to randomly select 3 questions
  const getRandomQuestions = () => {
    const shuffled = [...SAMPLE_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  // Function to clear chat history
  const clearChatHistory = () => {
    setHistory([]);
    setSelectedQuestions(getRandomQuestions());
  };

  // Rate limiting check
  const canMakeRequest = () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    return timeSinceLastRequest >= RATE_LIMIT_MS;
  };

  // Update cooldown timer
  useEffect(() => {
    if (lastRequestTime === 0) return;

    const updateCooldown = () => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      const remaining = Math.max(0, RATE_LIMIT_MS - timeSinceLastRequest);
      setCooldownRemaining(remaining);

      if (remaining > 0) {
        setTimeout(updateCooldown, 100);
      }
    };

    updateCooldown();
  }, [lastRequestTime, RATE_LIMIT_MS]);

  useEffect(() => {
    // Listen for custom clear history event
    const handleClearHistory = () => {
      clearChatHistory();
    };

    window.addEventListener('clearAssistantHistory', handleClearHistory);

    return () => {
      window.removeEventListener('clearAssistantHistory', handleClearHistory);
    };
  }, []);

  useEffect(() => {
    fetch('/api/assistantHealth', {
      method: 'GET',
    })
      .then(response => response.status)
      .then(code => {
        setIsServerUp(code === 200);
        if (code === 200) {
          const oldHistory: History[] = JSON.parse(
            localStorage.getItem(LOCAL_HISTORY_KEY) || '[]'
          );
          setHistory(oldHistory);

          let oldSessionId =
            localStorage.getItem(LOCAL_SESSION_KEY) || uuidv4();
          localStorage.setItem(LOCAL_SESSION_KEY, oldSessionId);
          setSessionId(oldSessionId);
        }
      })
      .catch(error => {
        console.error(error);
        setIsServerUp(false);
      });

    // Set random questions on component mount
    setSelectedQuestions(getRandomQuestions());
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const fetchResponse = async (newQuery: string) => {
    return await fetch('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: newQuery,
        history,
      }),
    })
      .then(response => {
        if (response.status !== 200) return '';
        return response.json();
      })
      .then(response => {
        return response.response;
      })
      .catch(error => {
        console.error(error);
        return '';
      });
  };

  const pushQueryToHistory = (from: 'user' | 'assistant', newQuery: string) => {
    setHistory(oldHistory => [
      ...oldHistory,
      {
        from,
        message: newQuery,
        timestamp: Date.now(),
      },
    ]);
  };

  const submitQuery = async (newQuery: string) => {
    if (queryProcessing || !isServerUp) return;

    if (!canMakeRequest()) {
      const remainingSeconds = Math.ceil(cooldownRemaining / 1000);
      toast.warning(
        `Please wait ${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''} before sending another message`
      );
      return;
    }

    setLastRequestTime(Date.now());
    pushQueryToHistory('user', newQuery);
    setQueryProcessing(true);
    ReactGA.event({
      category: 'Button.Click',
      action: 'Assistant Query submit',
      label: newQuery,
    });
    const response: string = await fetchResponse(newQuery);
    setQueryProcessing(false);
    pushQueryToHistory(
      'assistant',
      !response
        ? 'Sorry, I am not feeling well today, please come back later.'
        : response
    );
    // Refresh questions after each response
    setSelectedQuestions(getRandomQuestions());
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && query !== '') {
      submitQuery(query);
      setQuery('');
    }
  };

  const handleAskBtnSubmit = () => {
    submitQuery(query);
    setQuery('');
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div className="border-b border-border p-2 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar
            title="assistant"
            url={assistantIcon.src}
            width="w-8"
            height="h-8"
          />
          <div>
            <h1 className="font-semibold text-foreground">
              Portfolio Assistant
            </h1>
            <p
              className={`text-sm font-medium ${
                isServerUp ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {isServerUp ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div ref={historyRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length > 0 ? (
            <>
              {history.map((message, index) =>
                message.from === 'user' ? (
                  <UserMessage key={index} message={message.message} />
                ) : (
                  <AssistantMessage key={index} message={message.message} />
                )
              )}
              {queryProcessing && (
                <AssistantMessage message="Thinking..." isTyping={true} />
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4 max-w-md">
                {isServerUp ? (
                  <>
                    <div className="Arialic_Hollow text-3xl text-foreground">
                      Hey I'm your Portfolio Assistant!
                    </div>
                    <p className="text-muted-foreground">
                      I'm here to help you get to know Jean de Dieu better. Ask
                      me anything about his work, projects, or experience!
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">
                    Sorry, server is down. Please come back later 😔
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        {selectedQuestions.length > 0 && (
          <div className="flex justify-between gap-2 mb-1">
            <div className="flex flex-nowrap gap-2 overflow-x-auto">
              {selectedQuestions.map((question, index) => (
                <SampleQuery
                  key={index}
                  question={question}
                  callBackFun={submitQuery}
                />
              ))}
            </div>
            <Button
              onClick={() => setSelectedQuestions(getRandomQuestions())}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              title="Refresh questions"
            >
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* Input Area */}
        <div className="py-2 flex-shrink-0">
          <div className="flex gap-2">
            <Input
              data-cursor-focusable="true"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              placeholder={'Ask me anything about Jean de Dieu...'}
              disabled={queryProcessing || !isServerUp || cooldownRemaining > 0}
            />
            <Button
              onClick={handleAskBtnSubmit}
              disabled={
                query === '' ||
                queryProcessing ||
                !isServerUp ||
                cooldownRemaining > 0
              }
              size="icon"
              title={'Send message'}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gpt;

function UserMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-3 max-w-[80%]">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2">
          <p className="text-sm">{message}</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar
                title="user"
                icon={<User className="h-5 w-5 text-foreground" />}
                width="w-8"
                height="h-8"
                ariaLabel="guest"
              />
            </TooltipTrigger>
            <TooltipContent>guest</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

function AssistantMessage({
  message,
  isTyping = false,
}: {
  message: string;
  isTyping?: boolean;
}) {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[80%]">
        <Avatar
          title="assistant"
          url={assistantIcon.src}
          width="w-8"
          height="h-8"
        />
        <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2">
          {isTyping ? (
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="text-sm custom-markdown text-foreground">
              <Markdown
                options={{
                  overrides: {
                    a: {
                      props: {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      },
                    },
                  },
                }}
              >
                {message}
              </Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SampleQuery({
  question,
  callBackFun,
  disabled = false,
}: {
  question: string;
  callBackFun: any;
  disabled?: boolean;
}) {
  return (
    <Badge
      variant="outline"
      className={`duration-300 transition-colors text-xs py-1 px-2 whitespace-nowrap ${
        disabled
          ? 'opacity-30 cursor-not-allowed'
          : 'cursor-pointer opacity-60 hover:opacity-100'
      }`}
      onClick={() => callBackFun(question)}
    >
      {question}
    </Badge>
  );
}
