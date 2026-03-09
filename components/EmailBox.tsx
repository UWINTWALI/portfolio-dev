import { useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

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

    const senderEmail = senderEmailRef.current?.value?.trim() || '';
    const socialId = socialIdRef.current?.value?.trim() || '';

    setLoading(true);

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderEmail, socialId, message }),
      });

      if (!res.ok) throw new Error('Failed');

      ReactGA.event({ category: 'Button.Click', action: 'Email Sent' });

      if (senderEmailRef.current) senderEmailRef.current.value = '';
      if (socialIdRef.current) socialIdRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';

      recordEmailSent();

      toast.success('Email sent successfully!', {
        description: "Thanks for reaching out! I'll get back to you soon :)",
      });
    } catch {
      toast.error('Failed to send email', {
        description: 'Something went wrong. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="grid grid-cols-1 gap-y-4" onSubmit={sendEmail}>
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form-social-id">Social Media (Optional)</Label>
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
          rows={5}
          placeholder="Hey Jean de Dieu, This is an awesome Portfolio!"
          required
        />
      </div>
      <Button disabled={loading} type="submit">
        {loading ? 'Sending...' : 'Send me an email!'}
      </Button>
    </form>
  );
}
