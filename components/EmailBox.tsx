import { useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

function canSendEmail(): boolean {
  const emailTimestamps = localStorage.getItem('emailTimestamps');
  if (!emailTimestamps) return true;
  const timestamps: number[] = JSON.parse(emailTimestamps);
  const now = Date.now();
  const recent = timestamps.filter(t => now - t < 24 * 60 * 60 * 1000);
  return recent.length < 2;
}

function getRemainingTime(): string {
  const emailTimestamps = localStorage.getItem('emailTimestamps');
  if (!emailTimestamps) return '';
  const timestamps: number[] = JSON.parse(emailTimestamps);
  const now = Date.now();
  const recent = timestamps.filter(t => now - t < 24 * 60 * 60 * 1000);
  if (recent.length === 0) return '';
  const oldest = Math.min(...recent);
  const remaining = 24 * 60 * 60 * 1000 - (now - oldest);
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m`;
}

function recordEmailSent() {
  const emailTimestamps = localStorage.getItem('emailTimestamps');
  const timestamps: number[] = emailTimestamps
    ? JSON.parse(emailTimestamps)
    : [];
  timestamps.push(Date.now());
  localStorage.setItem('emailTimestamps', JSON.stringify(timestamps));
}

export default function EmailBox() {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const senderEmailRef = useRef<HTMLInputElement>(null);
  const socialIdRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  async function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSendEmail()) {
      toast.warning('Rate limit exceeded', {
        description: `You've sent 2 emails in the last 24 hours. Try again in ${getRemainingTime()}.`,
      });
      return;
    }

    const message = messageRef.current?.value?.trim();
    if (!message) return;

    const name = nameRef.current?.value?.trim() || '';
    const senderEmail = senderEmailRef.current?.value?.trim() || '';
    const socialId = socialIdRef.current?.value?.trim() || '';

    setLoading(true);

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, senderEmail, socialId, message }),
      });

      if (!res.ok) throw new Error('Failed');

      ReactGA.event({ category: 'Button.Click', action: 'Email Sent' });

      if (nameRef.current) nameRef.current.value = '';
      if (senderEmailRef.current) senderEmailRef.current.value = '';
      if (socialIdRef.current) socialIdRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';

      recordEmailSent();

      toast.success('Message sent!', {
        description: "Thanks for reaching out! I'll get back to you soon 🙌",
      });
    } catch {
      toast.error('Failed to send message', {
        description: 'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="grid grid-cols-1 gap-y-5" onSubmit={sendEmail}>
      {/* Name + Email side by side on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="contact-form-name">Name</Label>
          <Input
            id="contact-form-name"
            type="text"
            ref={nameRef}
            placeholder="Ex: Jean Doe"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="contact-form-sender-email">Email Address</Label>
          <Input
            id="contact-form-sender-email"
            type="email"
            ref={senderEmailRef}
            placeholder="example@gmail.com"
            required
          />
        </div>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form-social-id">
          Social / LinkedIn{' '}
          <span className="text-muted-foreground font-normal">(Optional)</span>
        </Label>
        <Input
          id="contact-form-social-id"
          type="text"
          ref={socialIdRef}
          placeholder="@yourhandle or linkedin.com/in/yourprofile"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form-message">Message</Label>
        <Textarea
          id="contact-form-message"
          ref={messageRef}
          rows={6}
          placeholder="Hey Jean , I'd love to connect about..."
          required
        />
      </div>

      <Button disabled={loading} type="submit" className="w-full sm:w-auto">
        {loading ? (
          'Sending...'
        ) : (
          <>
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
