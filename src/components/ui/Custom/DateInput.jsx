'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { addDays } from 'date-fns';
import PropTypes from 'prop-types';

function formatDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function isValidDate(date) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

function isBeforeToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date && date < today;
}

function DateInput({ selectedDate, onChange, placeholder, minDate, disabled }) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState(selectedDate || new Date());
  const [value, setValue] = React.useState(formatDate(selectedDate));

  // Update value when selectedDate changes
  React.useEffect(() => {
    setValue(formatDate(selectedDate));
  }, [selectedDate]);

  const handleDateChange = (date) => {
    if (date && !isBeforeToday(date) && (!minDate || date >= minDate)) {
      onChange(date);
      setValue(formatDate(date));
      setOpen(false);
    }
  };

  const isDateDisabled = (date) => {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBeforeToday(date) || (minDate && date < minDate);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full h-12 sm:h-14 px-4 text-base justify-start text-left font-normal border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition rounded-xl',
            !selectedDate && 'text-gray-500'
          )}
          disabled={disabled}
        >
          <CalendarIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mr-2" />
          <span className="truncate">
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 shadow-lg border-gray-200"
        align="start"
        sideOffset={4}
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          disabled={isDateDisabled}
          initialFocus
          month={month}
          onMonthChange={setMonth}
          className="rounded-lg"
          classNames={{
            months:
              'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center',
            caption_label: 'text-sm font-medium text-gray-900',
            nav: 'space-x-1 flex items-center',
            nav_button:
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-gray-600 hover:text-gray-900',
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell:
              'text-gray-500 rounded-md w-8 font-normal text-xs sm:text-sm',
            row: 'flex w-full mt-2',
            cell: 'relative p-0 text-center text-xs sm:text-sm focus-within:relative focus-within:z-20',
            day: 'h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 hover:text-gray-900 rounded-md transition',
            day_selected:
              'bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white',
            day_today: 'bg-blue-100 text-blue-700 font-semibold',
            day_outside: 'text-gray-400 opacity-50',
            day_disabled: 'text-gray-300 opacity-50',
            day_range_middle:
              'aria-selected:bg-blue-100 aria-selected:text-blue-700',
            day_hidden: 'invisible',
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

DateInput.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  disabled: PropTypes.bool,
};

export default DateInput;
