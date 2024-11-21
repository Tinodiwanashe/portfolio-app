import { cn } from '@/lib/utils';
import { SocialIcon } from 'react-social-icons';

const SocialMediaIcon = ({ url, className } : {url: string | undefined, className?: string}) => (
  <SocialIcon url={url}  className={cn(
    "max-h-8 max-w-8",
    className
  )}/>
);

export default SocialMediaIcon;
