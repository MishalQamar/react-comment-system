'use client';

import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LucideCalendar } from 'lucide-react';
import { RefObject, useImperativeHandle, useState } from 'react';

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue: string | undefined;
  ref?: RefObject<{ reset: () => void } | null>;
};
export const DatePicker = ({
  id,
  name,
  defaultValue,
  ref,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : new Date()
  );

  const [open, setOpen] = useState(false);

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';

  useImperativeHandle(ref, () => {
    return { reset: () => setDate(new Date()) };
  });

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id={id}>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal ',

            !date && 'text-muted-foreground'
          )}
        >
          <LucideCalendar />
          {formattedDate}
          <input type="hidden" name={name} value={formattedDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
