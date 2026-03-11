import type { NextPage } from 'next';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import EmailBox from '../../components/EmailBox';
import { Separator } from '@/components/ui/separator';
import { Mail, Github, Linkedin, MapPin, MessageSquare } from 'lucide-react';

const contactLinks = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    value: 'uwintwalijeandedieu3@gmail.com',
    href: 'mailto:uwintwalijeandedieu3@gmail.com',
  },
  {
    icon: <Github className="h-5 w-5" />,
    label: 'GitHub',
    value: 'github.com/UWINTWALI',
    href: 'https://github.com/UWINTWALI',
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/uwintwali-umd',
    href: 'https://www.linkedin.com/in/uwintwali-umd/',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Location',
    value: 'Kigali, Rwanda',
    href: null,
  },
];

const Contact: NextPage = () => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/contact', title: 'Contact' });
  }, []);

  return (
    <div className="relative my-10 sm:my-20">
      {/* Page Header */}
      <div className="mt-10 sm:mt-20">
        <div className="text-4xl sm:text-5xl font-medium">Contact Me</div>
        <p className="text-muted-foreground font-light mt-4 max-w-xl">
          I'm always open to new opportunities, collaborations, or just a good
          conversation. Fill out the form and I'll get back to you as soon as
          possible!
        </p>
      </div>

      <Separator className="my-8" />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        {/* Left — contact info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-medium mb-1">
              <MessageSquare className="h-5 w-5 text-primary" />
              Let's get in touch
            </div>
            <p className="text-muted-foreground font-light text-sm leading-relaxed">
              Whether you have a project idea, a job opportunity, or just want
              to say hi — my inbox is always open.
            </p>
          </div>

          <div className="space-y-4">
            {contactLinks.map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="mt-0.5 p-2 rounded-md bg-muted text-primary flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-light uppercase tracking-wide">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-primary transition-colors break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              ⏱️ I typically respond within{' '}
              <span className="text-foreground font-medium">24–48 hours</span>.
              For urgent matters feel free to reach out directly via email.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-medium mb-1">Send a message</h2>
            <p className="text-muted-foreground font-light text-sm mb-6">
              All fields marked as required must be filled in.
            </p>
            <EmailBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
