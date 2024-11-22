import { cn } from '@/lib/utils';
import { SocialIcon } from 'react-social-icons';
import { Button } from '../ui/button';

const SocialMediaIcon = ({ url, className } : {url: string | undefined, className?: string}) => (
  <Button variant="outline" size="icon">
    <SocialIcon url={url}  className={cn(
      "max-h-8 max-w-8",
      className
    )}/>
  </Button>

);

export default SocialMediaIcon;
