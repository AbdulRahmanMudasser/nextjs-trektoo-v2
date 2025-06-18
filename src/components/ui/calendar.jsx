'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'buttons',
  buttonVariant = 'outline',
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-4 bg-white rounded-lg', className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'long' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-full', defaultClassNames.root),
        months: cn(
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
          defaultClassNames.months
        ),
        month: cn('space-y-4 w-full', defaultClassNames.month),
        nav: cn(
          'flex items-center justify-between w-full mb-4',
          defaultClassNames.nav
        ),
        button_previous: cn(
          'inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          'inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex items-center justify-center h-9 w-full',
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          'text-lg font-semibold text-gray-800 mx-4',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex mb-2', defaultClassNames.weekdays),
        weekday: cn(
          'text-gray-500 rounded-md w-10 font-medium text-sm flex items-center justify-center h-10',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full', defaultClassNames.week),
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          defaultClassNames.day
        ),
        range_start: cn('rounded-l-lg', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-lg', defaultClassNames.range_end),
        today: cn(
          'bg-blue-100 text-blue-700 font-semibold',
          defaultClassNames.today
        ),
        outside: cn('text-gray-400 opacity-50', defaultClassNames.outside),
        disabled: cn(
          'text-gray-300 opacity-50 cursor-not-allowed',
          defaultClassNames.disabled
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeft className={cn('h-4 w-4', className)} {...props} />
            );
          }
          if (orientation === 'right') {
            return (
              <ChevronRight className={cn('h-4 w-4', className)} {...props} />
            );
          }
          return null;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex h-10 w-10 items-center justify-center text-center text-sm">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      data-day={day.date.toLocaleDateString()}
      data-selected={modifiers.selected}
      data-today={modifiers.today}
      data-outside={modifiers.outside}
      data-disabled={modifiers.disabled}
      className={cn(
        'inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-medium transition',
        'text-gray-700 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600',
        'data-[selected=true]:bg-blue-900 data-[selected=true]:text-white data-[selected=true]:hover:bg-blue-800',
        'data-[today=true]:bg-blue-100 data-[today=true]:text-blue-700 data-[today=true]:font-semibold',
        'data-[outside=true]:text-gray-400 data-[outside=true]:opacity-50',
        'data-[disabled=true]:text-gray-300 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:hover:bg-transparent',
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
