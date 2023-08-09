import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { ReactNode, forwardRef } from 'react';

interface Props {
  children: ReactNode;
}

export const DialogContent = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, Props>(
  ({ children, ...props }, forwardedRef) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay />
      <DialogContent {...props} ref={forwardedRef}>
        {children}
        <DialogPrimitive.Close aria-label="Close">
          <Cross1Icon />
        </DialogPrimitive.Close>
      </DialogContent>
    </DialogPrimitive.Portal>
  ),
);

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
