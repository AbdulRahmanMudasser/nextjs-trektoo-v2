import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPrice = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const calendarData = [
    [
      { date: 28, price: '$109', isCurrentMonth: false },
      { date: 29, price: '$109', isCurrentMonth: false },
      { date: 30, price: '$109', isCurrentMonth: false },
      { date: 1, price: '$109', isCurrentMonth: true },
      { date: 2, price: '$109', isCurrentMonth: true },
      { date: 3, price: '$109', isCurrentMonth: true },
      { date: 4, price: '$109', isCurrentMonth: true },
    ],
    [
      { date: 5, price: '$109', isCurrentMonth: true },
      { date: 6, price: '$109', isCurrentMonth: true },
      { date: 7, price: '$109', isCurrentMonth: true },
      { date: 8, price: '$109', isCurrentMonth: true },
      { date: 9, price: '$109', isCurrentMonth: true, isSelected: true },
      { date: 10, price: '$109', isCurrentMonth: true },
      { date: 11, price: '$109', isCurrentMonth: true },
    ],
    [
      { date: 12, price: '$109', isCurrentMonth: true },
      { date: 13, price: '$109', isCurrentMonth: true },
      { date: 14, price: '$109', isCurrentMonth: true },
      { date: 15, price: '$109', isCurrentMonth: true },
      { date: 16, price: '$109', isCurrentMonth: true },
      { date: 17, price: '$109', isCurrentMonth: true },
      { date: 18, price: '$109', isCurrentMonth: true },
    ],
    [
      { date: 19, price: '$109', isCurrentMonth: true },
      { date: 20, price: '$109', isCurrentMonth: true },
      { date: 21, price: '$109', isCurrentMonth: true },
      { date: 22, price: '$109', isCurrentMonth: true },
      { date: 23, price: '$109', isCurrentMonth: true },
      { date: 24, price: '$109', isCurrentMonth: true },
      { date: 25, price: '$109', isCurrentMonth: true },
    ],
    [
      { date: 26, price: '$109', isCurrentMonth: true },
      { date: 27, price: '$109', isCurrentMonth: true },
      { date: 28, price: '$109', isCurrentMonth: true },
      { date: 29, price: '$109', isCurrentMonth: true },
      { date: 30, price: '$109', isCurrentMonth: true },
      { date: 31, price: '$109', isCurrentMonth: true },
      { date: 1, price: '$109', isCurrentMonth: false },
    ],
  ];

  return (
    <div className="max-w-2xl ml-5 p-4 font-sans -mt-12">
      <h2
        className="text-xl font-bold text-gray-800 mb-4"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Calendar & Price
      </h2>
      <div className="relative">
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <div className="grid grid-cols-7">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="py-2 text-left bg-gray-100 text-gray-700 font-medium text-sm border-b border-r border-gray-200 last:border-r-0"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {day}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center bg-[#1E2A44] text-white py-1 px-3">
            <button
              className="p-1 hover:bg-gray-700 rounded-full"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div
              className="font-medium text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              May 2025
            </div>
            <button
              className="p-1 hover:bg-gray-700 rounded-full"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          {calendarData.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`min-h-[60px] p-1 border-r border-b border-gray-200 last:border-r-0 hover:bg-[#1E2A44] hover:text-white group cursor-pointer relative ${
                    day.isSelected
                      ? 'bg-[#ffffff] text-black'
                      : 'bg-gray-50 text-gray-800'
                  } ${!day.isCurrentMonth ? 'text-black' : ''}`}
                >
                  <div className="text-left">
                    <div
                      className={`text-sm ${day.isSelected ? 'text-black' : 'group-hover:text-white'}`}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {day.date}
                    </div>
                    {day.price && (
                      <div
                        className={`text-xs mt-1 ${day.isSelected ? 'text-[#A3BFFA]' : 'text-[#A3BFFA]'} group-hover:text-[#A3BFFA]`}
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {day.price}
                      </div>
                    )}
                  </div>
                  <div className="absolute hidden group-hover:block top-[60px] left-0 bg-white shadow-md rounded-md p-3 w-[200px] z-10">
                    <h3
                      className="text-base font-bold text-gray-800 mb-1"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      General
                    </h3>
                    <p
                      className="text-gray-700 mb-1 text-sm"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      General price:
                    </p>
                    <div
                      className="text-xs text-gray-600"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <p>
                        Children (0-12):{' '}
                        <span className="text-[#A3BFFA]">$109</span> / ticket
                      </p>
                      <p>
                        Youth (13-17):{' '}
                        <span className="text-[#A3BFFA]">$129</span> / ticket
                      </p>
                      <p>
                        Adult (18+):{' '}
                        <span className="text-[#A3BFFA]">$169</span> / ticket
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CalendarPrice.propTypes = {};

export default CalendarPrice;
